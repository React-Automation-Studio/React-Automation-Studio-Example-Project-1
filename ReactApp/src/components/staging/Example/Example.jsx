import React from "react";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import TraditionalLayout from "React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout";
import Grid from "@mui/material/Grid";

const Example = (props) => {

  return (
    <TraditionalLayout
      title="React Automation Studio Example Staging Area"
      denseAppBar
      alignTitle="center"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={1}
        alignItems="center"
        style={{ paddingTop: 64 }}>
        <Grid
          size={{
            lg: 4,
            sm: 4,
            xs: 2
          }}></Grid>
        <Grid
          size={{
            lg: 2,
            sm: 4,
            xs: 8
          }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={3}
            alignItems="stretch"
          >
            <Grid size={12}>
              <Button
                fullWidth
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: "auto"
                }}
                component={Link}
                to="/Example1"
                color="primary"
                variant="contained"
              >
                {" "}
                Example1{" "}
              </Button>
            </Grid>
            <Grid size={12}>
              <Button
                fullWidth
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: "auto"
                }}
                component={Link}
                to="/Example2"
                color="primary"
                variant="contained"
              >
                {" "}
                Example2{" "}
              </Button>
            </Grid>

            <Grid size={12}>
              <Button
                fullWidth
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: "auto"
                }}
                component={Link}
                to="/Example3"
                color="primary"
                variant="contained"
              >
                {" "}
                Example3{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          size={{
            lg: 4,
            sm: 4,
            xs: 2
          }}></Grid>
      </Grid>
    </TraditionalLayout>
  );
};

export default Example;
