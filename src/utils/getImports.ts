import fs from "fs";
import { iData } from "./GetFiles";

const handleImport = (line: string, arr: string[]) => {
  // 'import getFiles from "./utils/GetFiles";
  const data = line.split("from")[1].trim().replace(/"|;/gi, "");
  if (!data.startsWith(".")) arr.push(data);
};
const handleRequire = (line: string, arr: string[]) => {
  // 'import getFiles from "./utils/GetFiles";
  //   const data = line.split("from")[1].trim().replace(/"|;/gi, "");
  //   if (!data.startsWith(".")) arr.push(data);
  arr.push(line);
};

export const getImports = (files: iData[]) => {
  let imports: string[] = [];
  //   console.log(files);
  for (const file of files) {
    if (file.type === "dir" && file.children) {
      imports = [...(imports as any[]), getImports(file.children as iData[])];
    } else {
      //   console.log(file);
      const data = fs.readFileSync(file.path, "utf8").split("\r\n");
      data.map((line) => {
        if (line.startsWith("import")) handleImport(line, imports);
        // if (line.includes("require")) handleRequire(line, imports);
      });
    }
  }

  return imports
    .flat(10)
    .filter((value, index, arr) => arr.indexOf(value) === index);
};
