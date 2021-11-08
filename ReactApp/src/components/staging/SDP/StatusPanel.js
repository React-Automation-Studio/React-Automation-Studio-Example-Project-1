import React, { useState } from "react";
import ToggleButton from "React-Automation-Studio/components/BaseComponents/ToggleButton";
import Grid from "@material-ui/core/Grid";
import GraphY from "React-Automation-Studio/components/BaseComponents/GraphY";

const StatusPanel = (props) => {
  return (
    <div>
      <Grid
        container
        spacing={2}
        alignItems={"stretch"}
        direction={"column"}
        justify={"flex-start"}
      >
              <Grid item xs={12}>
                    <div style={{ height: graphVH, width: "96vw" }}>
                      <GraphY
                        pvs={[
                          "pva://SDP0:BufferForeLine",
                          "pva://SDP0:BufferForeLineSetPoint",
                          "pva://SDP0:BufferChamber",
                          "pva://SDP0:BufferChamberSetPoint",
                          "pva://SDP0:BufferTurbo",
                          "pva://SDP0:BufferTurboSetPoint",
                        ]}
                        legend={[
                          "Foreline",
                          "Foreline Setpoint",
                          "Chamber",
                          "Chamber Setpoint",
                          "Turbo Exhaust",
                          "Turbo Setpoint",
                        ]}
                        //lineColor={[this.props.theme.palette.secondary.main,lime['400']]}
                      />
                    </div>
      </Grid>
    </div>
  );
};
export default StatusPanel;
