// .storybook/preview.tsx
import { Preview } from "@storybook/react";
import Wrapper from "React-Automation-Studio/styleguide/Wrapper";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/blocks";
import ImportPath from "./ImportPath";
const preview: Preview = {
  decorators: [
    (Story) => (
      <Wrapper>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </Wrapper>
    ),
  ],
  parameters: {
   
     
    
   
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ImportPath  />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;


