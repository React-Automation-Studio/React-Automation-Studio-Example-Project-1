
import React from 'react';
import RasAppCore from 'React-Automation-Studio/components/SystemComponents/RasAppCore';
import themes  from 'React-Automation-Studio/components/UI/Themes/themes';
import AppRoutes from "./AppRoutes";

const App = (props) => {
  return (
     <RasAppCore  themes={themes} defaultTheme={'Ocean'}   >
       <AppRoutes /> 
     
     </RasAppCore>
    // <div>hello</div>
  );
}



export default App;
