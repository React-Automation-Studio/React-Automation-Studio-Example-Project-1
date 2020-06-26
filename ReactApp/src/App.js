
import React from 'react';
import RasAppCore from 'React-Automation-Studio/components/SystemComponents/RasAppCore';
import themes  from 'React-Automation-Studio/components/UI/Themes/themes';
import Routes from './Routes';

const App = (props) => {
  return (
    <RasAppCore  themes={themes} defaultTheme={'Ocean'}   >
      <Routes />
    </RasAppCore>
  );
}



export default App;
