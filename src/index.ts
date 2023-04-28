import getFiles from "./utils/GetFiles";
import getDependencies from "./utils/GetDependencies";
import { getImports } from "./utils/getImports";
import { EXCLUDE_LIBS } from "./utils/constants";
const files = getFiles(__dirname);
// console.log(files[0]);

const imports = getImports(files);
const { dependencies, devDependencies, scripts } = getDependencies();
let unused: string[] = [
  Object.keys(dependencies || {}),
  Object.keys(devDependencies),
]
  .flat(1)
  .filter((lib) => !lib.startsWith("@types"))
  .filter((lib) => !EXCLUDE_LIBS.includes(lib));

for (const script in scripts) {
  const str = scripts[script].split(" ");
  str.map((i: string) => {
    const index = unused.indexOf(i);
    if (index !== -1) {
      unused = unused.filter((lib) => lib !== i);
    }
  });
}
console.log({ files, unused, imports });
