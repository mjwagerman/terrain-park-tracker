

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const puppeteer = require("puppeteer");
// const OpenAI = require("openai");
// const cors = require("cors")({ origin: true });
// const functions = require("firebase-functions"); // Required for accessing config
// require('dotenv').config();

// // Initialize OpenAI with Firebase config for API key
// let openai;

// // Define the cleanHTML function
// async function cleanHTML(siteUrl) {

    
//     const browser = await puppeteer.launch({ 
//         headless: "new",
//         args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });
//     const page = await browser.newPage();
//     await page.goto(siteUrl, { waitUntil: "load", timeout: 0 });

//     await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));

//     const html = await page.evaluate(() => {
//         let resultHtml = "";
//         const titleElement = document.querySelector("title");
//         if (titleElement) resultHtml += titleElement.outerHTML;

//         const imgElements = document.querySelectorAll("img");
//         let resultImgs = "";
//         let count = 0;
//         imgElements.forEach(img => {
//             if (count < 5) {
//                 resultImgs += img.outerHTML;
//                 count++;
//             }
//         });
//         return resultHtml + resultImgs;
//     });

//     const favicon = await page.evaluate(() => {
//         const link = document.querySelector('link[rel="icon"]') ||
//                      document.querySelector('link[rel="shortcut icon"]') ||
//                      document.querySelector('link[rel="apple-touch-icon"]');
//         return link ? link.href : null;
//     });

//     await browser.close();

//     // Send HTML to OpenAI for processing
//     try {
//         const response = await openai.chat.completions.create({
//             model: "gpt-4",
//             messages: [
//                 {
//                     role: "user",
//                     content: `Extract the name/title of the ski resort from the website title, and one image source link that is not blank related to skiing if possible. In the format of Title: and ImageSrc: ${html}`,
//                 },
//             ],
//         });

//         const extractedData = response.choices[0].message.content;
//         const title = (extractedData.match(/Title:\s*(.*)/i) || [])[1]?.trim() || "";
//         const imageSrc = (extractedData.match(/ImageSrc:\s*(https?:\/\/[^\s]+)/i) || [])[1]?.trim() || "";

//         return { title, imageSrc, favicon };
//     } catch (error) {
//         logger.error("Error fetching result from OpenAI:", error);
//         return { title: "", imageSrc: "", favicon: "" };
//     }
// }

// // Define the Firebase HTTP function
// exports.scrapeData = onRequest(
//     { 
//         secrets: ["OPENAI_API_KEYY"],
//         memory: '1GB',
//     },
    
//     (req, res) => {
//     cors(req, res, async () => {
//         const { url } = req.query;
//         if (!url) {
//             logger.warn("Missing URL parameter in request");
//             res.status(400).send("Missing URL parameter");
//             return;
//         }


//         openai = new OpenAI({
//             apiKey: process.env.OPENAI_API_KEYY, // Use the secret
//         });

//         try {
//             const data = await cleanHTML(url);
//             res.status(200).json(data);
//         } catch (error) {
//             logger.error("Error in scrapeData function:", error);
//             res.status(500).send("Internal Server Error");
//         }
//     });
// });


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
                        if (count < 5) {
                            resultImgs += img.outerHTML;
                            count++;
                        }
                    });
                    return resultHtml + resultImgs;
                });

                const favicon = await page.evaluate(() => {
                    const link = document.querySelector('link[rel="icon"]') ||
                                    document.querySelector('link[rel="shortcut icon"]') ||
                                    document.querySelector('link[rel="apple-touch-icon"]');
                    return link ? link.href : null;
                });

                // Close the browser
                await browser.close();
                let data;
                try {
                    const response = await openai.chat.completions.create({
                        model: "gpt-4",
                        messages: [
                            {
                                role: "user",
                                content: `Extract the name/title of the ski resort from the website title, and one image source link that is not blank related to skiing if possible. In the format of Title: and ImageSrc: ${html}`,
                            },
                        ],
                    });

                    const extractedData = response.choices[0].message.content;
                    const title = (extractedData.match(/Title:\s*(.*)/i) || [])[1]?.trim() || "";
                    const imageSrc = (extractedData.match(/ImageSrc:\s*(https?:\/\/[^\s]+)/i) || [])[1]?.trim() || "";

                    data = { title, imageSrc, favicon };
                } catch (error) {
                    logger.error("Error fetching result from OpenAI:", error);
                    return { title: "", imageSrc: "", favicon: "" };
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
