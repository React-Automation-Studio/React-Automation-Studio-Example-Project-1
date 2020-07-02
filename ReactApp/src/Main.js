import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom'
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
    height:'50%'

  },
  button: {
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

let pvServerBASEURL;
if(typeof process.env.REACT_APP_PyEpicsServerBASEURL==='undefined'){
  pvServerBASEURL= "http://127.0.0.1";
}
else{
  pvServerBASEURL=process.env.REACT_APP_PyEpicsServerBASEURL;
}

let port;
if(typeof process.env.REACT_APP_StyleguideServerPORT==='undefined'){
  port= 6060;
}
else{
  port=process.env.REACT_APP_StyleguideServerPORT;
}

let AutomationStudioStyleGuideBuildURL=pvServerBASEURL+":"+port;


class Main extends Component {
  constructor(props) {
    super(props);
    this.logout=this.logout.bind(this);
    this.state={redirectToLoginPage:false}
  }

  logout(){
    localStorage.removeItem('jwt');

  }
  componentDidMount()
  {
    console.log('main mounted')
  }
  render() {


    const { classes } = this.props;

    return (
      <TraditionalLayout
      title="React Automation Studio V2.0.0"
      denseAppBar
      alignTitle="center"
    >


      <RedirectToLogIn/>
        <Grid container direction="row" item justify="center" spacing={1} alignItems="center" style={{paddingTop:64}}>
          <Grid item lg={2} sm={4}  xs={8}>
            <Grid container direction="row" justify="center" spacing={3} alignItems="stretch">
              <Grid item xs={12}  >
                  <Button className= {classes.button} component={Link} to="/DemosDashboard" color="primary" variant='contained'> Demos Dashboard </Button>
              </Grid>

              <Grid item xs={12}  >
                  <Button className= {classes.button} component={Link} to="/Staging" color="primary" variant='contained'>  Staging </Button>
              </Grid>
              <Grid item xs={12}  >
              <Button className= {classes.button} target="_blank" href={AutomationStudioStyleGuideBuildURL}  variant='contained'>  Help </Button>
              </Grid>
            </Grid>

          </Grid>
        </Grid>








          </TraditionalLayout>
          )
          }
          }

          export default withRouter(withStyles(styles,{withTheme:true})(Main));
