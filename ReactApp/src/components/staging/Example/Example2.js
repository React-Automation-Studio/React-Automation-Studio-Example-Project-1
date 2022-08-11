import React from 'react';


import withStyles from '@mui/styles/withStyles';

import RedirectToLogIn from 'React-Automation-Studio/components/SystemComponents/RedirectToLogin.js';

import TraditionalLayout from 'React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout.js';
import CustomTextInput from 'components/customComponents/CustomTextInput';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  center: {
    margin: 'auto',

    width: '15%',
    height: '50%'

  },
  button: {
    width: '100%',
    height: '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',

  },


});

const Example2 = (props) => {


  return (
    <TraditionalLayout
      title="Example 2 with customComponent imports"
      denseAppBar
      alignTitle="center"
    >


      <RedirectToLogIn />
    
        <div style={{ paddingTop: 64,paddingBottom:8}} >This example imports the site specific custom TextInput in the ReactApp/src/components/customComponents/ folder</div>
        <CustomTextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       usePvLabel={true}
       usePvPrecision={true}
       usePvUnits={true}
       usePvMinMax={true}
       alarmSensitive={true}
    />
      </TraditionalLayout>
    );
  }



export default withStyles(styles,{withTheme:true})(Example2);
