import { resolve } from "path";
import { readFileSync } from "fs";

const { dependencies, devDependencies } = JSON.parse(
  readFileSync(resolve(__dirname, "..", "..", "package.json"), "utf8")
);

console.log({ dependencies, devDependencies });
export default function getDependencies() {
  return { dependencies, devDependencies };
}
