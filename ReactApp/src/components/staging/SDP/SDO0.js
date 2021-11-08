import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import TextInput from "React-Automation-Studio/components/BaseComponents/TextInput";
import TextOutput from "React-Automation-Studio/components/BaseComponents/TextOutput";
import Slider from "React-Automation-Studio/components/BaseComponents/Slider";
import GraphY from "React-Automation-Studio/components/BaseComponents/GraphY";
import SelectionList from "React-Automation-Studio/components/BaseComponents/SelectionList";
import ThumbWheel from "React-Automation-Studio/components/BaseComponents/ThumbWheel";
import ToggleButton from "React-Automation-Studio/components/BaseComponents/ToggleButton";
import Gauge from "React-Automation-Studio/components/BaseComponents/Gauge";
import AppBar from "@material-ui/core/AppBar";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import Settings from "@material-ui/icons/SettingsOutlined";
import Divider from "@material-ui/core/Divider";
import withWidth from "@material-ui/core/withWidth";
import StyledIconIndicator from "React-Automation-Studio/components/BaseComponents/StyledIconIndicator";
import TraditionalLayout from "React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout.js";
import { useLocalPV } from "React-Automation-Studio/components/SystemComponents/LocalPV";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import LightPanel from "React-Automation-Studio/components/BaseComponents/LightPanel";
import BitIndicators from "React-Automation-Studio/components/BaseComponents/BitIndicators";

import StatefullButton from "./StatefullButton";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0, flexGrow: 1 }}>
      {props.children}
    </Typography>
  );
}

const styles = (theme) => ({
  body1: theme.typography.body1,
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    overflowX: "hidden",
    overflowY: "hidden",
  },
  paper: {
    padding: theme.spacing(1) * 0,
    margin: theme.spacing(1) * 0,
    height: "100%",
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(1) * 2,
  },

  hr: {
    padding: theme.spacing(1) * 0,
    margin: theme.spacing(1) * 0,
    color: "#A10030",
  },
});

const SDP0 = (props) => {
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(0);
  const editorType = useLocalPV({ pv: "loc://editorType" });

  const { width } = props;

  const { classes } = props;

  let graphVH;

  if (width === "xs") {
    graphVH = "25vh";
  } else if (width === "sm") {
    graphVH = "30vh";
  } else {
    graphVH = "30vh";
  }

  const handleChange = (event, value) => {
    setShowAdvancedSettings(value);
  };

  return (
    <TraditionalLayout
      title="Vacuum System Control Panel"
      denseAppBar
      alignTitle="center"
    >
      <div style={{ paddingBottom: 48 }}>
        {showAdvancedSettings === 0 && (
          <TabContainer key={"tabContainer0"}>
            <Grid container className={classes.root}>
              {/* Start of All Content */}
              <Grid
                xs={4}
                container
                direction={"column"}
                spacing={2}
                alignItems={"stretch"}
                justify={"flex-start"}
              >
                <Grid item>
                  <div style={{ height: graphVH, width: "32vw" }}>
                    <GraphY
                      pvs={[
                        "pva://SDP0:BufferForeLine",
                        "pva://SDP0:BufferForeLineSetPoint",
                      ]}
                      legend={["Foreline", "Foreline Setpoint"]}

                      //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div style={{ textAlign: "center" }}>
                    <h2>ForeLine</h2>
                  </div>
                </Grid>
                <Grid item>
                  <TextOutput
                    pv="pva://$(device):ForeLine"
                    macros={{ "$(device)": "SDP0" }}
                    label={"ForeLine Pressure"}
                    usePvUnits={true}
                    prec={10}
                    numberFormat={{ notation: "exponential", precision: 3 }}
                    alarmSensitive={true}
                  />
                </Grid>
              </Grid>
              <Grid
                xs={4}
                container
                direction={"column"}
                spacing={2}
                alignItems={"stretch"}
                justify={"flex-start"}
              >
                <Grid item>
                  <div style={{ height: graphVH, width: "32vw" }}>
                    <GraphY
                      pvs={[
                        "pva://SDP0:BufferChamber",
                        "pva://SDP0:BufferChamberSetPoint",
                      ]}
                      legend={["Chamber", "Chamber Setpoint"]}

                      //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div style={{ textAlign: "center" }}>
                    <h2>Chamber</h2>
                  </div>
                </Grid>
                <Grid item>
                  <TextOutput
                    pv="pva://$(device):Chamber"
                    macros={{ "$(device)": "SDP0" }}
                    label={"Chamber Pressure"}
                    usePvUnits={true}
                    prec={10}
                    numberFormat={{ notation: "exponential", precision: 3 }}
                    alarmSensitive={true}
                  />
                </Grid>
              </Grid>
              <Grid
                xs={4}
                container
                direction={"column"}
                spacing={2}
                alignItems={"stretch"}
                justify={"flex-start"}
              >
                <Grid item>
                  <div style={{ height: graphVH, width: "32vw" }}>
                    <GraphY
                      pvs={[
                        "pva://SDP0:BufferTurbo",
                        "pva://SDP0:BufferTurboSetPoint",
                      ]}
                      legend={["Turbo", "Turbo Setpoint"]}

                      //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div style={{ textAlign: "center" }}>
                    <h2>Turbo Exhaust</h2>
                  </div>
                </Grid>
                <Grid item>
                  <TextOutput
                    pv="pva://$(device):TurboExhaust"
                    macros={{ "$(device)": "SDP0" }}
                    label={"Turbo Pressure"}
                    usePvUnits={true}
                    prec={10}
                    numberFormat={{ notation: "exponential", precision: 3 }}
                    alarmSensitive={true}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  <hr />
                </div>
              </Grid>
              {/* Status Lights */}
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  item
                  justify="right"
                  spacing={2}
                  alignItems="stretch"
                >
                  <Grid item xs={2}>
                    <LightPanel
                      pv="pva://$(device):ReadCoolerNorm"
                      macros={{ "$(device)": "SDP0" }}
                      label={"Cooler Normal"}
                      labelPlacement={"top"}
                      usePvUnits={true}
                      alarmSensitive={true}
                      colors={{ 0: "tomato", 1: "green" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <LightPanel
                      pv="pva://$(device):ReadCoolerWarn"
                      macros={{ "$(device)": "SDP0" }}
                      label={"Cooler Warning"}
                      labelPlacement={"top"}
                      usePvUnits={true}
                      alarmSensitive={true}
                      colors={{ 1: "tomato", 0: "green" }}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <LightPanel
                      pv="pva://$(device):ReadTurboNorm"
                      macros={{ "$(device)": "SDP0" }}
                      label={"Turbo Status"}
                      labelPlacement={"top"}
                      usePvUnits={true}
                      alarmSensitive={true}
                      colors={{ 0: "tomato", 1: "green" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <LightPanel
                      pv="pva://$(device):ReadTurboPwr"
                      macros={{ "$(device)": "SDP0" }}
                      label={"Turbo Power"}
                      labelPlacement={"top"}
                      usePvUnits={true}
                      alarmSensitive={true}
                      colors={{ 0: "tomato", 1: "green" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <LightPanel
                      pv="pva://$(device):ReadTurboAccel"
                      macros={{ "$(device)": "SDP0" }}
                      label={"Turbo Accelerating"}
                      labelPlacement={"top"}
                      usePvUnits={true}
                      alarmSensitive={true}
                      colors={{ 0: "tomato", 1: "green" }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <LightPanel
                      pv="pva://$(device):ReadTurboDecel"
                      macros={{ "$(device)": "SDP0" }}
                      label={"Turbo Breaking"}
                      labelPlacement={"top"}
                      usePvUnits={true}
                      alarmSensitive={true}
                      colors={{ 0: "tomato", 1: "green" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {/* Pump Control */}
                <Grid item xs={12} justifyContent={"center"}>
                  <hr />
                  <div style={{ textAlign: "center" }}>
                    <h2>Pump Control</h2>
                  </div>
                </Grid>
                {/* Pump Status Lights */}
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    item
                    justify="right"
                    spacing={2}
                    alignItems="stretch"
                  >
                    {/* Column for Pump Status Readouts */}
                    <Grid item xs={4}>
                      <LightPanel
                        pv="pva://$(device):RPLG"
                        macros={{ "$(device)": "SDP0" }}
                        labelPlacement={"top"}
                        usePvUnits={true}
                        alarmSensitive={true}
                        colors={{ 0: "tomato", 1: "green" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LightPanel
                        pv="pva://$(device):RPUG"
                        macros={{ "$(device)": "SDP0" }}
                        usePvLabel={true}
                        usePvUnits={true}
                        alarmSensitive={true}
                        colors={{ 0: "tomato", 1: "green" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LightPanel
                        pv="pva://$(device):TurboG"
                        macros={{ "$(device)": "SDP0" }}
                        usePvLabel={true}
                        usePvUnits={true}
                        alarmSensitive={true}
                        colors={{ 0: "tomato", 1: "green" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Pump Toggles */}
                <Grid
                  container
                  direction="row"
                  item
                  justify="right"
                  spacing={2}
                  alignItems="stretch"
                >
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device)"
                      macros={{ "$(device)": "SDP0:WriteRPLOn" }}
                      custom_selection_strings={["RPL ON", "RPL ON"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device)"
                      macros={{ "$(device)": "SDP0:WriteRPLOff" }}
                      custom_selection_strings={["RPL OFF", "RPL OFF"]}
                    />
                  </Grid>

                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device)"
                      macros={{ "$(device)": "SDP0:WriteRPUOn" }}
                      custom_selection_strings={["RPU ON", "RPU ON"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device)"
                      macros={{ "$(device)": "SDP0:WriteRPUOff" }}
                      custom_selection_strings={["RPU OFF", "RPU OFF"]}
                    />
                  </Grid>

                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device)"
                      macros={{ "$(device)": "SDP0:WriteTurboOn" }}
                      custom_selection_strings={["Turbo ON", "Turbo ON"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device)"
                      macros={{ "$(device)": "SDP0:WriteTurboOff" }}
                      custom_selection_strings={["Turbo OFF", "Turbo OFF"]}
                    />
                  </Grid>

                  {/* End Pump Toggles */}
                </Grid>
              </Grid>
              {/* End Pump Control */}
              {/* ######################################### */}
              {/* Valve Control */}
              <Grid item xs={12} justifyContent={"center"}>
                <hr />
                <div style={{ textAlign: "center" }}>
                  <h2>Valve Control</h2>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* Valve Status */}
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    item
                    justify="center"
                    spacing={2}
                    alignItems="stretch"
                  >
                    {/* Column for Value Status Readouts */}
                    <Grid item xs={4}>
                      <LightPanel
                        pv="pva://$(device):V2G"
                        macros={{ "$(device)": "SDP0" }}
                        usePvLabel={true}
                        usePvUnits={true}
                        alarmSensitive={true}
                        colors={{ 0: "tomato", 1: "green" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LightPanel
                        pv="pva://$(device):V3G"
                        macros={{ "$(device)": "SDP0" }}
                        usePvLabel={true}
                        usePvUnits={true}
                        alarmSensitive={true}
                        colors={{ 0: "tomato", 1: "green" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LightPanel
                        pv="pva://$(device):V4G"
                        macros={{ "$(device)": "SDP0" }}
                        usePvLabel={true}
                        usePvUnits={true}
                        alarmSensitive={true}
                        colors={{ 0: "tomato", 1: "green" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* Toggle Buttons for Valves*/}
                <Grid
                  container
                  direction="row"
                  item
                  justify="center"
                  spacing={2}
                  alignItems="stretch"
                >
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device):Write$(valve)$(action)"
                      macros={{
                        "$(device)": "SDP0",
                        "$(valve)": "V2",
                        "$(action)": "On",
                      }}
                      custom_selection_strings={[
                        "OPEN $(valve)",
                        "OPEN $(valve)",
                      ]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device):Write$(valve)$(action)"
                      macros={{
                        "$(device)": "SDP0",
                        "$(valve)": "V2",
                        "$(action)": "Off",
                      }}
                      custom_selection_strings={[
                        "CLOSE $(valve)",
                        "CLOSE $(valve)",
                      ]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device):Write$(valve)$(action)"
                      macros={{
                        "$(device)": "SDP0",
                        "$(valve)": "V3",
                        "$(action)": "On",
                      }}
                      custom_selection_strings={[
                        "OPEN $(valve)",
                        "OPEN $(valve)",
                      ]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device):Write$(valve)$(action)"
                      macros={{
                        "$(device)": "SDP0",
                        "$(valve)": "V3",
                        "$(action)": "Off",
                      }}
                      custom_selection_strings={[
                        "CLOSE $(valve)",
                        "CLOSE $(valve)",
                      ]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device):Write$(valve)$(action)"
                      macros={{
                        "$(device)": "SDP0",
                        "$(valve)": "V4",
                        "$(action)": "On",
                      }}
                      custom_selection_strings={[
                        "OPEN $(valve)",
                        "OPEN $(valve)",
                      ]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} lg={2}>
                    <ToggleButton
                      pv="pva://$(device):Write$(valve)$(action)"
                      macros={{
                        "$(device)": "SDP0",
                        "$(valve)": "V4",
                        "$(action)": "Off",
                      }}
                      custom_selection_strings={[
                        "CLOSE $(valve)",
                        "CLOSE $(valve)",
                      ]}
                    />
                  </Grid>

                  {/* End Toggles for Valve Control */}
                </Grid>
              </Grid>
            </Grid>
            {/* End of All Content */}
          </TabContainer>
        )}
        {showAdvancedSettings === 1 && (
          <TabContainer key={"tabContainer1"}>
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  alignItems={"stretch"}
                  direction={"column"}
                  justify={"flex-start"}
                >
                  <Grid item>
                    <div style={{ marginBottom: 8 }}>Settings</div>
                    <Grid
                      container
                      spacing={2}
                      alignItems={"stretch"}
                      direction={"row"}
                      justify={"flex-start"}
                    >
                      <Grid item xs={12} lg={4}>
                        <TextInput
                          pv="pva://$(device):frequency"
                          macros={{ "$(device)": "testIOC" }}
                          usePvUnits={true}
                          prec={1}
                          usePvLabel={true}
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <TextInput
                          pv="pva://$(device):amplitude"
                          macros={{ "$(device)": "testIOC" }}
                          usePvUnits={true}
                          usePvLabel={true}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Divider light={"true"} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabContainer>
        )}
      </div>

      <AppBar
        className={classes.body1}
        style={{ position: "fixed", bottom: 0, top: "auto" }}
        color="inherit"
      >
        <Tabs
          value={showAdvancedSettings}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
        >
          {/* <Tab icon={<SupervisorAccount />} /> */}
          <Tab icon={<AccountCircle />} />
          <Tab icon={<Settings />} />
        </Tabs>
      </AppBar>
    </TraditionalLayout>
  );
};

export default withWidth()(withStyles(styles, { withTheme: true })(SDP0));
