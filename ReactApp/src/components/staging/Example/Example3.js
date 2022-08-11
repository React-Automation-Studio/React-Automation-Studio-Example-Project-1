import React from 'react';


import withStyles from '@mui/styles/withStyles';

import RedirectToLogIn from 'React-Automation-Studio/components/SystemComponents/RedirectToLogin.js';

import TraditionalLayout from 'React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout.js';

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

const Example3 = (props) => {


  return (
    <TraditionalLayout
      title="Example 3"
      denseAppBar
      alignTitle="center"
    >


      <RedirectToLogIn />
    
        <div style={{ paddingTop: 64 }} > Hello World</div>
      </TraditionalLayout>
    );
  }



export default withStyles(styles,{withTheme:true})(Example3);
