import React, { useState } from "react";
import ToggleButton from "React-Automation-Studio/components/BaseComponents/ToggleButton";
import Grid from "@material-ui/core/Grid";

const StatefullButton = (props) => {
  // State of the buttons should change when clicked
  const [powerState, setPowerState] = useState(0);

  //event handlers

  //   const changePowerStateHandler = (event.target.value) => {
  //     // use change of state function pattern since relies on previous state
  //     setPowerState(value => {
  //     });
  //   };
  return (
    <Grid
      container
      spacing={2}
      alignItems={"stretch"}
      direction={"column"}
      justify={"flex-start"}
    >
      <ToggleButton
        pv="pva://$(device)"
        macros={{ "$(device)": "SDP0:WriteRPLOn" }}
        custom_selection_strings={["RPL OFF", "RPL ON"]}
        offColor="red[400]"
        onColor="green"
      />
    </Grid>
  );
};

export default StatefullButton;
