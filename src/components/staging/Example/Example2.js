import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import EpicsBinaryOutDebug from 'React-Automation-Studio/components/GroupedComponents/EpicsBinaryOutDebug';
import EpicsAnalogOutDebug from 'React-Automation-Studio/components/GroupedComponents/EpicsAnalogOutDebug';
import EpicsMbboDebug from 'React-Automation-Studio/components/GroupedComponents/EpicsMbboDebug';
import TextUpdate from 'React-Automation-Studio/components/BaseComponents/TextUpdate';
import TextInput from 'React-Automation-Studio/components/BaseComponents/TextInput';
import TextOutput from 'React-Automation-Studio/components/BaseComponents/TextOutput';
import Meter from 'React-Automation-Studio/components/BaseComponents/Gauge';
import SimpleSlider from 'React-Automation-Studio/components/BaseComponents/SimpleSlider';
import GraphMultiplePVs from 'React-Automation-Studio/components/BaseComponents/GraphMultiplePVs';
import SelectionList from 'React-Automation-Studio/components/BaseComponents/SelectionList';
import StyledIconIndicator from 'React-Automation-Studio/components/BaseComponents/StyledIconIndicator';

import Grid from '@material-ui/core/Grid';
import DataConnection from 'React-Automation-Studio/components/SystemComponents/DataConnection';

import SwitchComponent from 'React-Automation-Studio/components/BaseComponents/SwitchComponent';
import SelectionInput from 'React-Automation-Studio/components/BaseComponents/SelectionInput';
import ToggleButton from 'React-Automation-Studio/components/BaseComponents/ToggleButton';
import ActionButton from 'React-Automation-Studio/components/BaseComponents/ActionButton';

import ThumbWheel from 'React-Automation-Studio/components/BaseComponents/ThumbWheel';
import ControlRightEx1 from 'React-Automation-Studio/components/ControlScreens/GridComponents/ControlRightEx1'

import ControlBottomEx1 from 'React-Automation-Studio/components/ControlScreens/GridComponents/ControlBottomEx1'
import Card from '@material-ui/core/Card';
import SideBar from 'React-Automation-Studio/components/SystemComponents/SideBar';
import AppBar from '@material-ui/core/AppBar';








const styles = theme => ({
  root: {
    padding: 0,
    spacing: 0,
    direction: 'row',
    alignItems: 'stretch',
    justify: "flex-start",
    overflowX: "hidden",
    overflowY: "hidden",
  },

});
class Example2 extends React.Component {


  render() {
    //  console.log("state: ",this.state);

    return (
      <React.Fragment>
        <SideBar/>
        <div> Hello World</div>
      </React.Fragment>
    );
  }
}

Example2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme:true})(Example2);
//export default Example2;
