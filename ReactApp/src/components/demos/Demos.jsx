import React from "react";

import withStyles from "@mui/styles/withStyles";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import TraditionalLayout from "React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout";
import Grid from "@mui/material/Grid";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  center: {
    margin: "auto",

    width: "15%",
    height: "50%",
  },
  button: {
    width: "100%",
    height: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

let pvServerBASEURL;
if (typeof process.env.pvServerURL === "undefined") {
  pvServerBASEURL = "http://127.0.0.1";
} else {
  pvServerBASEURL = process.env.pvServerURL;
}

let port;
if (typeof import.meta.env.VITE__StyleguideServerPORT === "undefined") {
  port = 6060;
} else {
  port = import.meta.env.VITE__StyleguideServerPORT;
}

let AutomationStudioStyleGuideBuildURL = pvServerBASEURL + ":" + port;

const Demos = (props) => {
  const { classes } = props;

  return (
    <TraditionalLayout
      title="React Automation Studio Demos"
      denseAppBar
      alignTitle="center"
    >
      <Grid
        container
        direction="row"
        item
        justifyContent="center"
        spacing={1}
        alignItems="center"
        style={{ paddingTop: 64 }}
      >
        <Grid item lg={4} sm={4} xs={2}></Grid>
        <Grid item lg={2} sm={4} xs={8}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={3}
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.button}
                component={Link}
                to="/MobileDemo1"
                color="primary"
                variant="contained"
              >
                {" "}
                Mobile Demo 1{" "}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.button}
                component={Link}
                to="/MobileDemo2"
                color="primary"
                variant="contained"
              >
                {" "}
                Mobile Demo 2{" "}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.button}
                component={Link}
                to="/EpicsDemos"
                color="primary"
                variant="contained"
              >
                {" "}
                Epics Demos{" "}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.button}
                component={Link}
                to="/Test3D"
                color="primary"
                variant="contained"
              >
                {" "}
                3D Demos{" "}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.button}
                component={Link}
                to="/ControlTestHarp1"
                color="primary"
                variant="contained"
              >
                {" "}
                Beam Line Control Demo{" "}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.button}
                component={Link}
                to="/ControlTableExample"
                color="primary"
                variant="contained"
              >
                {" "}
                Control Table Example
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.button}
                target="_blank"
                href={AutomationStudioStyleGuideBuildURL}
                variant="contained"
              >
                {" "}
                Help and Style Guide{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} sm={4} xs={2}></Grid>
      </Grid>
    </TraditionalLayout>
  );
};

export default withStyles(styles)(Demos);
