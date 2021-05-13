const path = require("path");
const glob = require("glob");
const cdn = require("./cdn.config");
const isProduction = process.env.NODE_ENV === "production";
function getEntry(globPath) {
  let entries = {},
    basename,
    tmp,
    pathname;

  glob.sync(globPath).forEach((entry) => {
    basename = path.basename(entry, path.extname(entry));
    console.log(`entry`, entry);
    tmp = entry.split("/").splice(-3);
    console.log(`tmp`, tmp);
    pathname = basename;
    entries[pathname] = {
      entry: `src/${tmp[0]}/${tmp[1]}/${tmp[1]}.js`,
      template: `src/${tmp[0]}/${tmp[1]}/${tmp[2]}`,
      title: tmp[1],
      filename: tmp[2],
      cdn: isProduction ? cdn.build : cdn.dev,
    };
  });

  return entries;
}

const pages = getEntry("./src/pages/**?/*.html");
console.log(`pages`, pages);
const configureWebpack = {
  // other config
};

if (isProduction) {
  Object.assign(configureWebpack, {
    externals: {
      vue: "Vue",
      axios: "axios",
    },
  });
}
module.exports = {
  pages,
  configureWebpack,
};
