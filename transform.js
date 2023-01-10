// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "babel";

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration)
    .forEach((path) => {
      if (path.node.source.value === "@gluestack/ui")
        path.node.source.value = "../";
      console.log(path.node.source.value, file);
    })
    .toSource();
}
