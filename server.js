const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());

app.post("/scrape", async (req, res) => {
  const { tweetUrl } = req.body;
  try {
    const threadData = await scrapeTweet(tweetUrl);
    res.json(threadData);
  } catch (error) {
    console.error("Error scraping Twitter thread:", error);
    res.status(500).json({ error: "Failed to scrape Twitter thread." });
  }
});

// Function to scrape the Twitter thread using Puppeteer
async function scrapeTweet(tweetUrl) {
  const twitterUrl = tweetUrl;

  const usernameMatch = twitterUrl.match(
    /https:\/\/twitter.com\/(.*?)\/status/
  );

  const username = "@" + usernameMatch[1];
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(tweetUrl, { waitUntil: "networkidle0" });

  const selector = "[data-testid='tweet']";

  const maxRetries = 3;
  const retryTimeout = 3000;

  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      await page.waitForSelector(selector, {
        visible: true,
        timeout: retryTimeout,
      });
      break;
    } catch (error) {
      if (retry === maxRetries - 1) {
        throw new Error(`Selector not found after ${maxRetries} retries.`);
      }
      console.log(`Retry ${retry + 1}: Selector not found. Retrying...`);
      await page.waitForTimeout(retryTimeout);
    }
  }

  const tweetElements = await page.$$(selector);
  const extractedData = [];

  for (const element of tweetElements) {
    const textContent = await element.evaluate((el) => el.textContent);
    const imageElements = await element.$$("img");
    const imageUrls = [];
    const jpgImageUrls = [];
    const svgImageUrls = [];

    for (const imgElement of imageElements) {
      const imageUrl = await imgElement.evaluate((el) =>
        el.getAttribute("src")
      );
      if (
        !imageUrl.toLowerCase().endsWith(".jpg") &&
        !imageUrl.toLowerCase().endsWith(".svg")
      ) {
        imageUrls.push(imageUrl);
      }

      if (imageUrl.toLowerCase().endsWith(".jpg")) {
        jpgImageUrls.push(imageUrl);
      } else if (imageUrl.toLowerCase().endsWith(".svg")) {
        svgImageUrls.push(imageUrl);
      }
    }

    const tweetParts = textContent.split("·");
    if (tweetParts.length >= 2) {
      const mainContent = tweetParts[0].trim();
      const index = mainContent.indexOf(username);
      const eighthCharacterFromEnd = mainContent.charAt(mainContent.length - 8);
      let cutPoint = -7;
      if (!isNaN(eighthCharacterFromEnd)) {
        cutPoint = -8;
      }
      const tweet = mainContent
        .substring(index + username.length)
        .slice(0, cutPoint);
      const time = mainContent.substr(cutPoint);
      const date = tweetParts[1].trim();
      const stats = tweetParts
        .slice(2)
        .join(".")
        .trim()
        .split(/(?<=[a-zA-Z])(?=\d)/);
      extractedData.push({
        username,
        profilePic: jpgImageUrls[0],
        tweet,
        emojis: svgImageUrls,
        images: imageUrls,
        time,
        date,
        stats,
      });
    }
  }

  await browser.close();

  return { tweetUrl, data: extractedData };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
