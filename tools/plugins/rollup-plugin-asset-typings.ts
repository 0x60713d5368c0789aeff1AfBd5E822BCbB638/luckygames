import { normalizePath } from "vite";
import fs from "fs";
import path from "path";
import _ from "lodash";
import template from "./template";

export default function AssetTypingPlugin(opt: {
  assetPath: string;
  outputPath: string;
}) {
  const assetPath = path.resolve(__dirname, "../../" + opt.assetPath);
  const outputPath = path.resolve(__dirname, "../../" + opt.outputPath);

  return {
    name: "assetTyping", // 必须的，将会在 warning 和 error 中显示
    buildStart() {
      fs.watch(
        assetPath,
        {},
        _.debounce((eventType, filename) => {
          if (/^(.)+\.(png|jpg|jpeg|gif|svg)$/.test(filename)) {
            const list = walk(assetPath, opt.assetPath + "/");
            fs.writeFileSync(outputPath, assetTypingTpl(list));
          }
        }, 300)
      );
    },
  };
}

// async version with basic error handling
function walk(assetPath: string, splitPath: string) {
  let list: string[] = [];
  const files = fs.readdirSync(assetPath);
  files.forEach(function (name) {
    var filePath = path.join(assetPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      list.push(normalizePath(filePath).split(splitPath)[1]);
    } else if (stat.isDirectory()) {
      list = [...list, ...walk(filePath, splitPath)];
    }
  });
  return list;
}

const assetTypingTpl = template`
type IAssetURLs = ${(list: string[]) =>
  list.map((item) => JSON.stringify(item)).join(" | ")};

declare var createURL: (url: IAssetURLs) => string;
`;
