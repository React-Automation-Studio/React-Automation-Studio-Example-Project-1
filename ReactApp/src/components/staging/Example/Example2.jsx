import React from "react";
import TraditionalLayout from "React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayout";
import CustomTextInput from "../../customComponents/CustomTextInput";

const Example2 = (props) => {
  return (
    <TraditionalLayout
      title="Example 2 with customComponent imports"
      denseAppBar
      alignTitle="center"
    >
      <div style={{ paddingTop: 64, paddingBottom: 8 }}>
        This example imports the site specific custom TextInput in the
        ReactApp/src/components/customComponents/ folder
      </div>
      <CustomTextInput
        pv="$(device):test$(id)"
        macros={{ "$(device)": "testIOC", "$(id)": "2" }}
        usePvLabel={true}
        usePvPrecision={true}
        usePvUnits={true}
        usePvMinMax={true}
        alarmSensitive={true}
      />
    </TraditionalLayout>
  );
};

export default Example2;
