import React from 'react'
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
        <p> 404 not found </p>

        <Link to="/">Home</Link>
    </div>
  )
}
