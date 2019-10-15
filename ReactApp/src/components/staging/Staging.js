import React, { Component } from 'react';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import RedirectToLogIn from 'React-Automation-Studio/components/SystemComponents/RedirectToLogin.js';
import SideBar from 'React-Automation-Studio/components/SystemComponents/SideBar';
import Grid from '@material-ui/core/Grid';
// Styles




const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,



  },
  center: {
    margin: 'auto',

    width: '15%',
    height:'50%'

  },
  Button: {
    width:'100%',
    height:'100%',
    marginTop:'auto',
    marginBottom:'auto',
    marginLeft:'auto',
    marginRight:'auto',
    //  width:'100%',
    //    marginTop:'auto',
    //    marginLeft:'auto',
    //    marginRight:'auto',
    //    marginBottom:'auto',

  },

});







class Staging extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
    console.log('Staging mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <React.Fragment>

                    <Grid container direction="row" item justify="center" spacing={1} alignItems="center">
                      <Grid item lg={4} sm={4} xs={2}>
                        <SideBar/>
                      </Grid>

                      <Grid  item lg={2} sm={4}  xs={8}>

                        <div style={{textAlign: 'center'}} className={classes.body1}>Staging Area</div>

                      </Grid>
                      <Grid item lg={4} sm={4} xs={2}>

                      </Grid>
                    </Grid>
                    <Grid container direction="row" item justify="center" spacing={1} alignItems="center">
                      <Grid item lg={4} sm={4} xs={2}>

                      </Grid>
                      <Grid item lg={2} sm={4}  xs={8}>
                        <Grid container direction="row" justify="center" spacing={3} alignItems="stretch">
                          <Grid item xs={12}  >
                            <Button  fullWidth  fullWidth className= {classes.button} component={Link} to="/Example" color="primary" variant='contained'>  Example</Button>
                            </Grid>

                          </Grid>
                        </Grid>

                        <Grid item lg={4} sm={4} xs={2}>


                          </Grid>
                        </Grid>


          <RedirectToLogIn/>




      </React.Fragment>
  )
}
}

export default withRouter(withStyles(styles)(Staging));
