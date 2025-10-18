# AI Threat Intel Summarizer (TypeScript + OpenAI Web App)
This project is an **AI-powered cybersecurity report analyzer** built with **TypeScript**, **Next.js**, and **OpenAI’s API**.  
It accepts freeform cybersecurity data (such as CVE descriptions or threat reports) and automatically extracts key insights such as:

- **Attack Vector** (e.g., Remote Code Execution, Phishing)
- **Severity Level** (Low, Medium, High, Critical)
- **Impact Summary**
- **Recommended Mitigation Steps**

The app provides a clean web interface for analysis and demonstrates core **TypeScript programming concepts**, including variables, functions, classes, arrays, tuples, and exception handling.

---

## Instructions for Build and Use

Steps to build and/or run the software:

1. Open a terminal and navigate to the project folder.  
2. Install dependencies
3. Start the development server
4. Open your browser and navigate to: http://localhost:3000

Instructions for using the software:

1. Paste a CVE or report text into the input box.
Example: Paste a CVE or report text into the input box.
2. Click Analyze Threat.
3. The app will call the OpenAI API, parse the text, and return:

Attack Vector

Severity

Impact Summary

Mitigation

4. If no API key is provided, a built-in mock parser provides fallback output for demo purposes.

## Development Environment 

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Node.js
* npm 9+
* Next.js 15.5.4
* TypeScript +5
* Tailwind CSS 4
* ESLint 9
* OpenAI API (gpt-4o-mini)

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [OpenAI API Reference](https://platform.openai.com/docs)
* [w3Schools](https://www.w3schools.com/typescript/)
* [ChatGPT] (https://chatgpt.com/)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* Integrate CVE lookup APIs (e.g., NIST NVD) for enriched metadata
* Export reports as PDF or JSON for easy sharing
* Add visualization dashboard for severity distribution over time

<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
 -->