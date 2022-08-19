import React  from 'react';
import RedirectToLogIn from 'React-Automation-Studio/components/SystemComponents/RedirectToLogin.js';

import TraditionalLayout from 'React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout.js';

import CircularProgress from '@mui/material/CircularProgress';




const MainPublic = (props) => {

  return (
    <TraditionalLayout
      title="React Automation Studio V4.0.0"
      denseAppBar
      alignTitle="center"
    >

      <RedirectToLogIn />
      <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
        <CircularProgress />
      </div>

    </TraditionalLayout>
  )

}

export default MainPublic;
