import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TraditionalLayout from "React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout";
import Grid from "@mui/material/Grid";

let enableDemos =
  typeof import.meta.env.VITE__DISABLE_DEMOS !== "undefined"
    ? !(import.meta.env.VITE__DISABLE_DEMOS.toUpperCase() === "TRUE")
    : true;

const AppMain = (props) => {

  const styleguideURL =
    window.location.protocol + "//" + window.location.hostname + ":6060/";
  const buttonVariant = "contained";
  return (
    <TraditionalLayout
      title="React Automation Studio V6.1.0"
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
        <Grid item lg={2} sm={4} xs={8}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={3}
            alignItems="stretch"
          >
            {enableDemos && (
              <Grid item xs={12}>
                <Button
                  sx={{
                    width: "100%",
                    height: "100%",
                    margin: "auto"
                  }}
                  component={Link}
                  to="/DemosDashboard"
                  color="primary"
                  variant="contained"
                >
                  {" "}
                  Demos Dashboard{" "}
                </Button>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: "auto"
                }}
                component={Link}
                to="/Staging"
                color="primary"
                variant="contained"
              >
                {" "}
                Staging{" "}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: "auto"
                }}
                target="_blank"
                href={styleguideURL}
                variant={buttonVariant}
              >
                {" "}
                Help and Style Guide{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TraditionalLayout>
  );
};

export default AppMain;
