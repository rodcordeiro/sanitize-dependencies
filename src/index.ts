import { readdirSync } from "fs";

interface iData {
  name: string;
  type: "dir" | "file";
  path: string;
  children?: Array<iData>;
}

function getFiles(path: string) {
  const data = readdirSync(path, {
    withFileTypes: true,
  });
  const files = data.map((item) => {
    const itempath = path + "\\" + item.name;
    let data: iData = {
      name: item.name,
      type: item.isDirectory() ? "dir" : "file",
      path: itempath,
    };
    if (data.type !== "dir") return data;
    const children = getFiles(itempath);
    data["children"] = children;
    return data;
  });
  return files;
}

const files = getFiles(__dirname);
console.log({ files });
