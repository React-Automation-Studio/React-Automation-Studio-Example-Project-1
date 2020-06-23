import React from 'react';


import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import RedirectToLogIn from 'React-Automation-Studio/components/SystemComponents/RedirectToLogin.js';

import TraditionalLayout from 'React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout.js';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  center: {
    margin: 'auto',

    width: '15%',
    height: '50%'

  },
  button: {
    width: '100%',
    height: '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',

  },


});

const Staging = (props) => {

  const { classes } = props;

  return (
    <TraditionalLayout
      title="React Automation Studio Staging Area"
      denseAppBar
      alignTitle="center"
    >


      <RedirectToLogIn />
      <Grid container direction="row" item justify="center" spacing={1} alignItems="center" style={{ paddingTop: 64 }}>
        <Grid item lg={4} sm={4} xs={2}>

        </Grid>
        <Grid item lg={2} sm={4} xs={8}>
          <Grid container direction="row" justify="center" spacing={3} alignItems="stretch">
            <Grid item xs={12}  >
              <Button fullWidth fullWidth className={classes.button} component={Link} to="/Example" color="primary" variant='contained'>  Example</Button>
            </Grid>

          </Grid>
        </Grid>

        <Grid item lg={4} sm={4} xs={2}>


        </Grid>
      </Grid>







    </TraditionalLayout>
  )
}


export default withRouter(withStyles(styles)(Staging));
