import { resolve } from "path";
import { readFileSync } from "fs";

const { dependencies, devDependencies, scripts } = JSON.parse(
  readFileSync(resolve(__dirname, "..", "..", "package.json"), "utf8")
);

export default function getDependencies() {
  return { dependencies, devDependencies, scripts };
}
