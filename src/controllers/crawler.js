const schedule = require("node-schedule");
const xlsx = require("xlsx");
const path = require("path");

exports.test = () => {
  const work = xlsx.readFile(path.join(__dirname, "youtuber.xlsx"));
  const workData = work.Sheets.url;
  const result = xlsx.utils.sheet_to_json(workData);
  for (const [i, e] of result.entries()) {
    console.log(e);
  }
}