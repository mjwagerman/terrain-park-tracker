
const { onRequest } = require("firebase-functions/v2/https");
const puppeteer = require("puppeteer");
const cors = require("cors")({ origin: true });
const OpenAI = require("openai");





let openai;

// Define the Firebase HTTP function
exports.scrapeTitle = onRequest(
    {
        secrets: ["OPENAI_API_KEYY"],
        memory: '1GiB' // Increase if you encounter memory issues
    },
    (req, res) => {
        cors(req, res, async () => {
            // Check if URL parameter is provided
            const { url } = req.query;
            if (!url) {
                res.status(400).send("Missing URL parameter");
                return;
            }

            openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEYY, // Use the secret
            });

            try {
                // Launch Puppeteer
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                });

                // Open a new page
                const page = await browser.newPage();
                await page.goto(url, { waitUntil: "load", timeout: 0 });

                // Extract the images and title
                const html = await page.evaluate(() => {
                    let resultHtml = "";
                    const titleElement = document.querySelector("title");
                    if (titleElement) resultHtml += titleElement.outerHTML;
            
                    const imgElements = document.querySelectorAll("img");
                    let resultImgs = "";
                    let count = 0;
                    imgElements.forEach(img => {
                        if (count < 8) {
                            const altText = img.alt || "No alt text"; // Fallback if there's no alt text
                            resultImgs += `<div>${img.outerHTML} <p>Alt: ${altText}</p></div>`;
                            count++;
                        }
                    });
                    return resultHtml + resultImgs;
                });

                //console.log("Images: ", html);
;                const favicon = await page.evaluate(() => {
                    const link = document.querySelector('link[rel="icon"]') ||
                                    document.querySelector('link[rel="shortcut icon"]') ||
                                    document.querySelector('link[rel="apple-touch-icon"]');
                    return link ? link.href : null;
                });

               // const domain = new URL(page.url()).hostname.split('.')[0]; //done in inputresort.jsx, can go back to this if users are not inputtign full domain

                // Close the browser
                await browser.close();
                let data;
                try {
                    const response = await openai.chat.completions.create({
                        model: "gpt-4",
                        messages: [
                            {
                                role: "user",
                                content: `Extract the ski resort's name from the website title and an image source link with alt text related to skiing or snowboarding. Also, include a basic non wordy one-sentence description for advanced freestyle skiers. Format: Title:, ImageSrc:, Description: ${html}`,
                            },
                        ],
                    });

                    const extractedData = response.choices[0].message.content;
                    const title = (extractedData.match(/Title:\s*(.*)/i) || [])[1]?.trim() || "";
                    const imageSrc = (extractedData.match(/ImageSrc:\s*(https?:\/\/[^\s]+)/i) || [])[1]?.trim() || "";
                    const description = (extractedData.match(/Description:\s*(.*)/i) || [])[1]?.trim() || "";

                    data = { title, imageSrc, favicon, description };
                } catch (error) {
                    logger.error("Error fetching result from OpenAI:", error);
                    return { title: "", imageSrc: "", favicon: "", description: ""};
                }
                // Return the response
                res.status(200).json(data);
            } catch (error) {
                // Log and return any errors
                console.error("Error in scrapeTitle function:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
);
