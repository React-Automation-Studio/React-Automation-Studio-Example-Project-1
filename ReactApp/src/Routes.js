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
//system
import LogIn from './React-Automation-Studio/LogIn';
import Probe from './React-Automation-Studio/components/SettingsPages/Probe';
import Help from './React-Automation-Studio/components/docs/Help';
import Main from './Main';
import MainPublic from './MainPublic';
import AutomationStudioContext from 'React-Automation-Studio/components/SystemComponents/AutomationStudioContext';


const Routes = (props) => {
  const context = useContext(AutomationStudioContext);
  /* eslint-disable-next-line no-unused-vars */
  const userData = context.userData;
  /* eslint-disable-next-line no-unused-vars */
  const roles = context.userData.roles;
  const username = context.userData.username;
  let loggedIn = username !== "" || process.env.REACT_APP_EnableLogin !== 'true';
  let enableDemos = typeof process.env.REACT_APP_ENABLE_DEMO!=='undefined'?process.env.REACT_APP_ENABLE_DEMOS.toUpperCase() === 'TRUE':false;

  return (
    <BrowserRouter >

      <Switch>

        {/*system start*/}
        <Route exact path="/" >
          {loggedIn === false
            ? <MainPublic />
            : <Main />
          }
        </Route>

        {process.env.REACT_APP_EnableLogin === 'true' &&
          <Route exact path="/LogIn" component={LogIn} />
        }

        <Route path="/Probe" component={Probe} />
        <Route path="/Help" component={Help} />
        {/*system end*/}

        {/*demos start*/}
        {enableDemos &&
          <React.Fragment>
            <Route path="/DemosDashboard" component={MainDashboard} />
            <Route path="/Demos" component={Demos} />
            <Route path="/MobileDemo1" component={MobileDemo1} />
            <Route path="/MobileDemo2" component={MobileDemo2} />
            <Route path="/EpicsDemos" component={EpicsDemos} />
            <Route path="/Test3D" component={Test3D} />
            <Route path="/AlarmHandlerDemo" component={AlarmHandlerDemo} />
            <Route path="/VaultDemo" component={Vault} />
            <Route path="/LoadSaveExample" component={LoadSaveExample} />
            {/* new Beamline and table control System routes start*/}
            <Route path="/BeamlineControlSystem" component={BeamlineControlSystem} />
            <Route path="/AdvancedSettingsSinglePS" component={AdvancedSettingsSinglePS} />
            <Route path="/TableControlSystem" component={TableControlSystem} />
            <Route path="/SettingsSinglePS" component={SettingsSinglePS} />
            <Route path="/SettingsSteererXY" component={SettingsSteererXY} />
          </React.Fragment>
        }
        {/* new Beamline and table control System routes end*/}

        {/*demos end*/}

        {/*staging start*/}
        <Route path="/Staging" component={Staging} />
        <Route path="/Example" component={Example} />
        <Route path="/Example1" component={Example1} />
        <Route path="/Example2" component={Example2} />
        <Route path="/Example3" component={Example3} />
        {/*staging end*/}










      </Switch>

    </BrowserRouter>
  )
}
export default Routes;
