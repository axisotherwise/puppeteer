const schedule = require("node-schedule");
const xlsx = require("xlsx");
const path = require("path");
const puppeteer = require("puppeteer");
const playwright = require("playwright");
const axios = require("axios");
const agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36";

const Youtuber = require("../models/youtuber");

module.exports = async () => {
  const work = xlsx.readFile(path.join(__dirname, "youtuber.xlsx"));
  const workData = work.Sheets.url;
  const result = xlsx.utils.sheet_to_json(workData);
  let array = [];

  const browser = await puppeteer.launch({    
    headless: false,
    args: ["--window-size:1920,1080"],
  });
  for (const [i, e] of result.entries()) {
    try {
      const page = await browser.newPage();
      await page.setUserAgent(agent);
      await page.setViewport({
        width: 1080,
        height: 1080,
      });
      await page.goto(e.url, {
        waitUntil: "networkidle0",
      });
      await page.waitForSelector("#channel-header-container img");
      await page.waitFor(2000);
      const result = await page.evaluate(() => {
        const channelName = document.querySelector("#text-container yt-formatted-string") && document.querySelector("#text-container yt-formatted-string").textContent;
        const image = document.querySelector("#channel-header-container img") && document.querySelector("#channel-header-container img").getAttribute("src");
        const subscriber = document.querySelector("#meta yt-formatted-string[id=subscriber-count]") && document.querySelector("#meta yt-formatted-string[id=subscriber-count]").textContent;
        const activity = document.querySelector("#items ytd-grid-video-renderer:first-child #metadata-line span:nth-child(2)") && document.querySelector("#items ytd-grid-video-renderer:first-child #metadata-line span:nth-child(2)").textContent;
        return {
          channelName,
          image,
          subscriber,
          activity,
        }
      });
      const exist = await Youtuber.findOne({
        where: {
          channelName: result.channelName,
        }, 
      });
      if (!exist) {
        await Youtuber.findOrCreate({
          where: {
            channelName: result.channelName,
            image: result.image,
            subscriber: result.subscriber,
            activity: result.activity,
          },
        });
      }
      await page.close();
    } catch (err) {
      console.error(err);
    }
  }
  await browser.close();
}