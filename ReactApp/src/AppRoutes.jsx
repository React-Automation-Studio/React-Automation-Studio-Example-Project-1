import React, { useContext } from "react";

import { Route, BrowserRouter, Routes } from "react-router-dom";

// demos
import MainDashboard from "React-Automation-Studio/components/UI/MainDashboard";
// import Demos from "./components/demos/Demos";
import EpicsDemos from "React-Automation-Studio/components/Examples/EpicsDemos";
import MobileDemo1 from "React-Automation-Studio/components/Examples/Mobile/MobileDemo1";
import MobileDemo2 from "React-Automation-Studio/components/Examples/Mobile/MobileDemo2";
import BeamlineControlSystem from "React-Automation-Studio/components/ControlScreens/BeamlineControlSystem";
import TableControlSystem from "React-Automation-Studio/components/ControlScreens/TableControlSystem";
import Test3D from "React-Automation-Studio/components/Experimental/Test3D";
import AlarmHandlerDemo from "React-Automation-Studio/components/Examples/AlarmHandlerDemo";
import LoadSaveExample from "React-Automation-Studio/components/ExperimentalExamples/LoadSaveExample";
import ArchiverDataViewerDemo from "React-Automation-Studio/components/ArchiverDataViewer/ArchiverDataViewerDemo";
import SettingsSteererXY from "React-Automation-Studio/components/SettingsPages/SettingsSteererXY";
import SettingsSinglePS from "React-Automation-Studio/components/SettingsPages/SettingsSinglePS";
import AdvancedSettingsSinglePS from "React-Automation-Studio/components/ExperimentalControlScreens/SettingsPages/AdvancedSettingsSinglePS";
import Vault from "React-Automation-Studio/components/AlarmHandler/Vault";
import AreaDetectorSimExample from "React-Automation-Studio/components/Examples/AreaDetectorSimExample";
//staging
import Staging from "./components/staging/Staging";
import Example from "./components/staging/Example/Example";
import Example1 from "./components/staging/Example/Example1";
import Example2 from "./components/staging/Example/Example2";
import Example3 from "./components/staging/Example/Example3";
//system
import Login from "React-Automation-Studio/components/SystemComponents/Login";
import Probe from "React-Automation-Studio/components/SettingsPages/Probe";
import Help from "React-Automation-Studio/components/docs/Help";
import AppMain from "./AppMain";
import AutomationStudioContext from "React-Automation-Studio/components/SystemComponents/AutomationStudioContext";
import Administrator from "React-Automation-Studio/components/Administrator/Administrator";
import UserProfile from "React-Automation-Studio/components/SystemComponents/userProfiles/UserProfile";
import ProtectedRoute from "React-Automation-Studio/components/SystemComponents/ProtectedRoute";

const AppRoutes = (props) => {
  const context = useContext(AutomationStudioContext);
  /* eslint-disable-next-line no-unused-vars */
  const userData = context.userData;
  /* eslint-disable-next-line no-unused-vars */
  const roles = context.userData.roles;
  /* eslint-disable-next-line no-unused-vars */
  const username = context.userData.username;
  let enableDemos =
    typeof import.meta.env.VITE__DISABLE_DEMOS !== "undefined"
      ? !(import.meta.env.VITE__DISABLE_DEMOS.toUpperCase() === "TRUE")
      : true;

  return (
    //For all changes see the migration stragey from V4.0.3 to V5.2.0 in the documentation
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <AppMain />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/MainDashboard"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/Administrator"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Administrator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {import.meta.env.VITE_EnableLogin === "true" && (
          <Route
            exact
            path="/Login"
            element={<Login version="V6.0.0" timeout={5000} />}
          />
        )}

        <Route
          path="/Probe"
          element={
            <ProtectedRoute>
              <Probe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        {/*system end*/}

        {/*demos start*/}
        {enableDemos && (
          <Route
            exact
            path="/DemosDashboard"
            element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            }
          />
        )}

        {enableDemos && (
          <Route
            path="/MobileDemo1"
            element={
              <ProtectedRoute>
                <MobileDemo1 />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/MobileDemo2"
            element={
              <ProtectedRoute>
                <MobileDemo2 />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/EpicsDemos"
            element={
              <ProtectedRoute>
                <EpicsDemos />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/Test3D"
            element={
              <ProtectedRoute>
                <Test3D />
              </ProtectedRoute>
            }
          />
        )}

        {enableDemos && (
          <Route
            path="/AlarmHandlerDemo"
            element={
              <ProtectedRoute>
                <AlarmHandlerDemo />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/VaultDemo"
            element={
              <ProtectedRoute>
                <Vault />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/LoadSaveExample"
            element={
              <ProtectedRoute>
                <LoadSaveExample />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/ArchiverDataViewerDemo"
            element={
              <ProtectedRoute>
                <ArchiverDataViewerDemo />
              </ProtectedRoute>
            }
          />
        )}
        {/* new Beamline and table control System routes start*/}
        {enableDemos && (
          <Route
            path="/BeamlineControlSystem"
            element={
              <ProtectedRoute>
                <BeamlineControlSystem />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/AdvancedSettingsSinglePS"
            element={
              <ProtectedRoute>
                <AdvancedSettingsSinglePS />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/TableControlSystem"
            element={
              <ProtectedRoute>
                <TableControlSystem />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/SettingsSinglePS"
            element={
              <ProtectedRoute>
                <SettingsSinglePS />
              </ProtectedRoute>
            }
          />
        )}
        {enableDemos && (
          <Route
            path="/SettingsSteererXY"
            element={
              <ProtectedRoute>
                <SettingsSteererXY />
              </ProtectedRoute>
            }
          />
        )}

        {/* new Beamline and table control System routes end*/}

        {/*demos end*/}

        {/*staging start*/}
        <Route
          path="/Staging"
          element={
            <ProtectedRoute>
              <Staging />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example"
          element={
            <ProtectedRoute>
              <Example />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example1"
          element={
            <ProtectedRoute>
              <Example1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example2"
          element={
            <ProtectedRoute>
              <Example2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Example3"
          element={
            <ProtectedRoute>
              <Example3 />
            </ProtectedRoute>
          }
        />
        {/*staging end*/}
        <Route
          path="/AreaDetectorSimExample"
          element={
            <ProtectedRoute>
              <AreaDetectorSimExample />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
