import chalk from "chalk";
import fs from "fs";
import path from "path";
import { URL } from "url";
import render from "./render.js";
const forbiddenDirs = ["node_modules"];
class Runner {
  constructor() {
    this.testFiles = [];
  }
  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.bold.gray(`------------ ${file.shortName}`));
      global.render = render;
      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };
      global.it = async (desc, fn) => {
        for (let callBack of beforeEaches) callBack();
        try {
          await fn();
          console.log(chalk.bold.greenBright(`OK -- ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, "\n\t\t");
          console.log(chalk.bold.redBright(`X -- ${desc}`));
          console.log(chalk.bold.bgGray("\t", message));
        }
      };
      // console.log(file.name);
      try {
        // Convert to a file URL for import
        const fileUrl = new URL(`file://${file.name.replace(/\\/g, "/")}`);
        await import(fileUrl.href);
      } catch (err) {
        console.log(
          chalk.bold.redBright(`X -- Error Loading File `, file.name)
        );
        console.log(chalk.bold.bgGray("\t", err.message));
      }
    }
  }
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);
    // console.log(files);
    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);
      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        console.log(file);
        const childFiles = await fs.promises.readdir(filepath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}
export default Runner;
