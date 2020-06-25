import React,{useContext} from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Main from './Main';
import MainPublic from './MainPublic';
import Demos from './components/demos/Demos';

import Help from './React-Automation-Studio/components/docs/Help';
import Staging from './components/staging/Staging';
import Example from './components/staging/Example/Example';
import Example1 from './components/staging/Example/Example1';
import Example2 from './components/staging/Example/Example2';
import Example3 from './components/staging/Example/Example3';

import Probe from './React-Automation-Studio/components/SettingsPages/Probe';

import LogIn from './React-Automation-Studio/LogIn';


import EpicsDemos from './React-Automation-Studio/components/Examples/EpicsDemos';

import MobileDemo2 from './React-Automation-Studio/components/Examples/Mobile/MobileDemo2';
import MobileDemo1 from './React-Automation-Studio/components/Examples/Mobile/MobileDemo1';

import ControlTestHarp1 from './React-Automation-Studio/components/ControlScreens/ControlTestHarp1';

import ControlTableExample from './React-Automation-Studio/components/ControlScreens/ControlTableExample';
import ComponentsWithMultiplePVs from './React-Automation-Studio/components/Examples/ComponentsWithMultiplePVs';
import Test3D from './React-Automation-Studio/components/Experimental/Test3D';

import SettingsSteererXY from './React-Automation-Studio/components/SettingsPages/SettingsSteererXY';
import SettingsSinglePS from './React-Automation-Studio/components/SettingsPages/SettingsSinglePS';
import AutomationStudioContext from 'React-Automation-Studio/components/SystemComponents/AutomationStudioContext';


const Routes = (props) => {
  const context = useContext(AutomationStudioContext);
  const userData=context.userData;
  const roles = context.userData.roles;
  const username = context.userData.username;
  let loggedIn = username !== "" || process.env.REACT_APP_EnableLogin !== 'true';
  return (
  <BrowserRouter >

    <Switch>

    <Route exact path="/" >
          {loggedIn === false
            ? <MainPublic />
            :<Main/>
          }
    </Route>

      {process.env.REACT_APP_EnableLogin==='true'&&
        <Route exact path="/LogIn" component={ LogIn } />
      }

      <Route path="/Probe" component={Probe} />

      <Route path="/Demos" component={Demos} />
      <Route path="/Help" component={Help} />
      <Route path="/Staging" component={Staging} />

      <Route path="/Example" component={Example} />
      <Route path="/Example1" component={Example1} />
      <Route path="/Example2" component={Example2} />
      <Route path="/Example3" component={Example3} />

      <Route path="/SettingsSinglePS" component={SettingsSinglePS} />
      <Route path="/SettingsSteererXY" component={SettingsSteererXY} />
      <Route path="/Probe" component={Probe} />

      <Route path="/MobileDemo2" component={MobileDemo2} />
      <Route path="/MobileDemo1" component={MobileDemo1} />

      <Route path="/ControlTestHarp1" component={ControlTestHarp1} />

      <Route path="/ControlTableExample" component={ControlTableExample} />
      <Route path="/EpicsDemos" component={EpicsDemos} />


      <Route path="/Test3D" component={Test3D} />
      <Route path="/ComponentsWithMultiplePVs" component={ComponentsWithMultiplePVs} />





    </Switch>

  </BrowserRouter>
  )
}
export default Routes;
