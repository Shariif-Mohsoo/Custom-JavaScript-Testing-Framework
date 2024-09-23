#!/usr/bin/env node
import Runner from "./Runner.js";
const runner = new Runner();
async function run() {
  await runner.collectFiles(process.cwd());
  // console.log(runner.testFiles);
  await runner.runTests();
}
run();
console.log("You are in Mohsoo's Testing Framework");
