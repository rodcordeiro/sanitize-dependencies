import { readdirSync } from "fs";
import { resolve } from "path";

export interface iData {
  name: string;
  type: "dir" | "file";
  path: string;
  children?: Array<iData | undefined>;
}

/**
 * Function getFiles
 * Retrieves file tree of the given path recursively, includin children files and folders.
 *
 * @param path The path to start gathering the information.
 * @param exclude A file or an array of filenames to exclude from the verification
 *
 * @returns a Object containing the name, type ('dir' | 'file'), path and childrens.
 */
export default function getFiles(
  path: string,
  exclude?: string | Array<string>
) {
  const items = readdirSync(path, {
    withFileTypes: true,
  });

  const files = items
    .filter((item) => {
      const ignoredFiles = [
        ".git",
        "node_modules",
        ".gitignore",
        "yarn.lock",
        "package.json",
      ];
      if (exclude && typeof exclude == "string") {
        ignoredFiles.push(exclude);
      } else if (exclude && Array.isArray(exclude)) {
        exclude.forEach((item) => ignoredFiles.push(item));
      }

      if (ignoredFiles.indexOf(item.name) === -1) {
        return item;
      }
    })
    .map((item) => {
      console.log(path, "\\", item.name);
      const itempath = resolve(path + "\\" + item.name);
      let data: iData = {
        name: item.name,
        type: item.isDirectory() ? "dir" : "file",
        path: itempath,
      };
      if (data.type !== "dir") return data;
      const children = getFiles(itempath, exclude);
      data.children = children;
      return data;
    });
  return files;
}
