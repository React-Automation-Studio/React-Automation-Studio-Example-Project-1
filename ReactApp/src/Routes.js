import React, { useContext } from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom'


// demos
import MainDashboard from './React-Automation-Studio/components/UI/MainDashboard';
import Demos from './components/demos/Demos';
import EpicsDemos from './React-Automation-Studio/components/Examples/EpicsDemos';
import MobileDemo1 from './React-Automation-Studio/components/Examples/Mobile/MobileDemo1';
import MobileDemo2 from './React-Automation-Studio/components/Examples/Mobile/MobileDemo2';
import BeamlineControlSystem from './React-Automation-Studio/components/ControlScreens/BeamlineControlSystem';
import TableControlSystem from './React-Automation-Studio/components/ControlScreens/TableControlSystem';
import Test3D from './React-Automation-Studio/components/Experimental/Test3D';
import AlarmHandlerDemo from './React-Automation-Studio/components/Examples/AlarmHandlerDemo';
import LoadSaveExample from './React-Automation-Studio/components/ExperimentalExamples/LoadSaveExample';
import ArchiverDataViewerDemo from './React-Automation-Studio/components/ArchiverDataViewer/ArchiverDataViewerDemo';
import SettingsSteererXY from './React-Automation-Studio/components/SettingsPages/SettingsSteererXY';
import SettingsSinglePS from './React-Automation-Studio/components/SettingsPages/SettingsSinglePS';
import AdvancedSettingsSinglePS from './React-Automation-Studio/components/ExperimentalControlScreens/SettingsPages/AdvancedSettingsSinglePS';
import Vault from './React-Automation-Studio/components/AlarmHandler/Vault';
//staging
import Staging from './components/staging/Staging';
import Example from './components/staging/Example/Example';
import Example1 from './components/staging/Example/Example1';
import Example2 from './components/staging/Example/Example2';
import Example3 from './components/staging/Example/Example3';
import SDP from './components/staging/SDP/SDP';
import SDP0 from './components/staging/SDP/SDO0';
//system
import Login from './React-Automation-Studio/components/SystemComponents/Login';
import Probe from './React-Automation-Studio/components/SettingsPages/Probe';
import Help from './React-Automation-Studio/components/docs/Help';
import Main from './Main';
import AutomationStudioContext from 'React-Automation-Studio/components/SystemComponents/AutomationStudioContext';
import Administrator from 'React-Automation-Studio/components/Administrator/Administrator.js';
import UserProfile from 'React-Automation-Studio/components/SystemComponents/userProfiles/UserProfile';
import ProtectedRoute from 'React-Automation-Studio/components/SystemComponents/ProtectedRoute';

const Routes = (props) => {
  const context = useContext(AutomationStudioContext);
  /* eslint-disable-next-line no-unused-vars */
  const userData = context.userData;
  /* eslint-disable-next-line no-unused-vars */
  const roles = context.userData.roles;
  const username = context.userData.username;
  let enableDemos = typeof process.env.REACT_APP_DISABLE_DEMOS !== 'undefined' ? !(process.env.REACT_APP_DISABLE_DEMOS.toUpperCase() === 'TRUE') : true;

  return (
    <BrowserRouter >

      <Switch>

      <ProtectedRoute exact path="/" component={Main} />
        <ProtectedRoute exact path="/MainDashboard" component={MainDashboard} />
        <ProtectedRoute exact path="/Administrator" component={Administrator} roles={['admin']} />
        <ProtectedRoute path="/UserProfile" component={UserProfile} />
        {process.env.REACT_APP_EnableLogin === 'true' &&
          <Route
            exact 
            path="/Login"
            component={() =>
              <Login 
               
               footerString= "Login is now customizable"
               version="V3.0.0"
               timeout={5000}
               />
            }
          />
        }
        <ProtectedRoute path="/Probe" component={Probe} />
        <ProtectedRoute path="/Help" component={Help} />
        {/*system end*/}

        {/*demos start*/}
        {enableDemos && <ProtectedRoute path="/DemosDashboard" component={MainDashboard} />}
        {enableDemos && <ProtectedRoute path="/Demos" component={Demos} />}
        {enableDemos && <ProtectedRoute path="/MobileDemo1" component={MobileDemo1} />}
        {enableDemos && <ProtectedRoute path="/MobileDemo2" component={MobileDemo2} />}
        {enableDemos && <ProtectedRoute path="/EpicsDemos" component={EpicsDemos} />}
        {enableDemos && <ProtectedRoute path="/Test3D" component={Test3D} />}
        {enableDemos && <ProtectedRoute path="/AlarmHandlerDemo" component={AlarmHandlerDemo} />}
        {enableDemos && <ProtectedRoute path="/VaultDemo" component={Vault} />}
        {enableDemos && <ProtectedRoute path="/LoadSaveExample" component={LoadSaveExample} />}
        {enableDemos && <ProtectedRoute path="/ArchiverDataViewerDemo" component={ArchiverDataViewerDemo}/>}
        {/* new Beamline and table control System routes start*/}
        {enableDemos && <ProtectedRoute path="/BeamlineControlSystem" component={BeamlineControlSystem} />}
        {enableDemos && <ProtectedRoute path="/AdvancedSettingsSinglePS" component={AdvancedSettingsSinglePS} />}
        {enableDemos && <ProtectedRoute path="/TableControlSystem" component={TableControlSystem} />}
        {enableDemos && <ProtectedRoute path="/SettingsSinglePS" component={SettingsSinglePS} />}
        {enableDemos && <ProtectedRoute path="/SettingsSteererXY" component={SettingsSteererXY} />}


        {/* new Beamline and table control System routes end*/}

        {/*demos end*/}

        {/*staging start*/}
        <ProtectedRoute path="/Staging" component={Staging} />
        <ProtectedRoute path="/Example" component={Example} />
        <ProtectedRoute path="/Example1" component={Example1} />
        <ProtectedRoute path="/Example2" component={Example2} />
        <ProtectedRoute path="/Example3" component={Example3} />
        <ProtectedRoute path="/SDP" component={SDP} />
        <ProtectedRoute path="/SDP0" component={SDP0} />
        {/*staging end*/}










      </Switch>

    </BrowserRouter>
  )
}
export default Routes;
