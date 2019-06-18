import React from 'react';
import ReactDOM from 'react-dom';

import { Route, BrowserRouter, Switch } from 'react-router-dom'
import App from './App';
//import * as serviceWorker from './serviceWorker';

import Main from './Main';
import Demos from './automation-studio/src/components/Examples/Demos';
import Help from './automation-studio/src/components/docs/Help';
import Staging from './components/staging/Staging';
import Example from './components/staging/Example/Example';
import Example1 from './components/staging/Example/Example1';
import Example2 from './components/staging/Example/Example2';
import Example3 from './components/staging/Example/Example3';

import Probe from './automation-studio/src/components/SettingsPages/Probe';
import SettingsSteererXY from './automation-studio/src/components/SettingsPages/SettingsSteererXY';
import SettingsSinglePS from './automation-studio/src/components/SettingsPages/SettingsSinglePS';
import LogIn from './automation-studio/src/LogIn';
import { Redirect } from 'react-router-dom'
export default props=>(
  <BrowserRouter >

    <Switch>

      <Route exact path="/" component={ Main } />


      {process.env.REACT_APP_EnableLogin==='true'&&
        <Route exact path="/LogIn" component={ LogIn } />
      }

      {props.limitRoutes===false&&<Route path="/Probe" component={Probe} />}
      {props.limitRoutes===false&&<Route path="/SettingsSinglePS" component={SettingsSinglePS} />}
      {props.limitRoutes===false&&<Route path="/SettingsSteererXY" component={SettingsSteererXY} />}
      {props.limitRoutes===false&&<Route path="/Demos" component={Demos} />}
      {props.limitRoutes===false&&<Route path="/Help" component={Help} />}
      {props.limitRoutes===false&&<Route path="/Staging" component={Staging} />}

      {props.limitRoutes===false&&<Route path="/Example" component={Example} />}
      {props.limitRoutes===false&&<Route path="/Example1" component={Example1} />}
      {props.limitRoutes===false&&<Route path="/Example2" component={Example2} />}
      {props.limitRoutes===false&&<Route path="/Example3" component={Example3} />}





    </Switch>

  </BrowserRouter>
)
