import jsdom from "jsdom";
import path from "path";
const { JSDOM } = jsdom;
const render = async (filename) => {
  const filePath = path.join(process.cwd(), filename);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: "dangerously",
    resources: "usable",
  });
  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve(dom);
    });
  });
};
export default render;
// const path = require("path");
// const jsdom = require("jsdom");
// const { rejects } = require("assert");
// const { JSDOM } = jsdom;
// const render = async (fileName) => {
//   //creating the file path
//   const filePath = path.join(process.cwd(), fileName);
//   // console.log(filePath);
//   const dom = await JSDOM.fromFile(filePath, {
//     runScripts: "dangerously",
//     resources: "usable",
//   });
//   //   Inside the event listener, the resolve(dom) function is called.
//   //   This means that as soon as the DOMContentLoaded event is triggered,
//   //   the Promise is resolved, and the dom object is passed as the resolved value.

//   return new Promise((resolve, reject) => {
//     dom.window.document.addEventListener("DOMContentLoaded", () => {
//       resolve(dom);
//     });
//   });
//   //we use runScripts("dangerously") because if we don't
//   //do so there will be the risk of malicious behavior.
// };
// module.exports = render;
