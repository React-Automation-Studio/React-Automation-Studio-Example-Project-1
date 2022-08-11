import React from "react";
import PropTypes from "prop-types";
/**
 * Example component
 */
const Component1 = (props) => {
  return <div>My Example</div>;
};

Component1.propTypes = {
  /** Define your custom Props*/
  customProp: PropTypes.string,
};
Component1.defaultProps = {
  customProp: "Hello world",
};

export default Component1;
