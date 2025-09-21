import React, { useContext } from "react";
import { DocsContext,Source } from '@storybook/addon-docs/blocks';

export const ImportPath = (props): JSX.Element => {
  const context = useContext(DocsContext);
  console.log(context);
  console.log(context?.primaryStory.parameters.fileName);
  const arr = context?.primaryStory?.kind?.split("/");

  const componentName = arr[arr.length - 1];

  const path = `import  ${componentName}  from '${context?.primaryStory.parameters.fileName.toString().replace(".stories.jsx","").replace(".stories.tsx","").replace(".stories.ts","").replace(".stories.js","").replace("./","")}';`;

  return <Source language="js" code={props.fullPath?props.fullPath:path} />;
};

export default ImportPath;
