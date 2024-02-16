// .storybook/main.js

import { mergeConfig } from 'vite';

export default {
  // Replace your-framework with the framework you are using (e.g., react-vite, vue3-vite)
  framework: '@storybook/react-vite',
  stories: [
    
    '../React-Automation-Studio/docs/Introduction.mdx',
    '../React-Automation-Studio/docs/installation/installation.mdx',
    '../React-Automation-Studio/docs/installation/launching.mdx',
   '../React-Automation-Studio/docs/installation/userloginOverview.mdx',
    '../React-Automation-Studio/docs/installation/*.mdx',
    '../React-Automation-Studio/docs/MongoDB/MongoDB.mdx',
    '../React-Automation-Studio/docs/MongoDB/MongoDB_Primer.mdx',
    '../React-Automation-Studio/docs/MongoDB/MongoDB_Primer_Replication.mdx',
    '../React-Automation-Studio/docs/MongoDB/MongoDB_Config.mdx',
    '../React-Automation-Studio/docs/MongoDB/MongoDB_Config_Default.mdx',
    '../React-Automation-Studio/docs/MongoDB/MongoDB_Config_Config.mdx',
    '../React-Automation-Studio/docs/MongoDB/MongoDB_Compass.mdx',
    '../React-Automation-Studio/docs/styleguide.mdx',
    '../React-Automation-Studio/docs/layout/howItWorks.mdx',
    '../React-Automation-Studio/docs/layout/sampleLayouts.mdx',
    '../React-Automation-Studio/docs/layout/layoutExamples/BasicGrid.mdx',
    '../React-Automation-Studio/docs/layout/layoutExamples/Mobile.mdx',
    '../React-Automation-Studio/docs/WorkingWithLayouts.mdx',
    '../React-Automation-Studio/docs/themes/themes.mdx',
    // '../React-Automation-Studio/docs/**/*.mdx', 
  '../React-Automation-Studio/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  '../React-Automation-Studio/components/CompoundComponents/ArrayContainer.mdx',
  '../React-Automation-Studio/docs/widget/widget.mdx',
  '../React-Automation-Studio/components/SystemComponents/Widgets/Widget.stories.js',
  '../React-Automation-Studio/components/SystemComponents/PV.mdx',
  '../React-Automation-Studio/components/SystemComponents/EpicsPV.mdx',
  '../React-Automation-Studio/components/SystemComponents/LocalPV.mdx',
  '../React-Automation-Studio/components/SystemComponents/Login.mdx',
  '../React-Automation-Studio/components/SystemComponents/database/MongoDB/MongoDb.mdx',
  '../React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbDeleteOne.mdx',
  '../React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbInsertOne.mdx',
  '../React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbUpdateOne.mdx',
  '../React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbWatch.mdx',
  '../React-Automation-Studio/docs/beamlineComponents/BeamlineComponents.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmHandlerTop.mdx',
  '../React-Automation-Studio/docs/alarmHandler/setup.mdx',
  '../React-Automation-Studio/docs/alarmHandler/environment.mdx',
  '../React-Automation-Studio/docs/alarmHandler/emailNotification.mdx',
  '../React-Automation-Studio/docs/alarmHandler/signalNotification.mdx',
  '../React-Automation-Studio/docs/alarmHandler/seedData.mdx',
  '../React-Automation-Studio/docs/alarmHandler/configJson.mdx',
  '../React-Automation-Studio/docs/alarmHandler/pvListJson.mdx',
  '../React-Automation-Studio/docs/alarmHandler/Users.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmRoleConfig.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmAdmin.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmUser.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmObserver.mdx',
  '../React-Automation-Studio/docs/alarmHandler/userGuide.mdx',
  '../React-Automation-Studio/docs/alarmHandler/implementConventions.mdx',
  '../React-Automation-Studio/docs/alarmHandler/serverConventions.mdx',
  '../React-Automation-Studio/docs/alarmHandler/serverLogging.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmNotification.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmSetupMDX.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmAreas.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmTable.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmLog.mdx',
  '../React-Automation-Studio/docs/alarmHandler/userNotificationMDX.mdx',
  '../React-Automation-Studio/docs/alarmHandler/alarmUserTable.mdx',
  '../React-Automation-Studio/docs/alarmHandler/filterPvList.mdx',
  '../React-Automation-Studio/components/LoadSaveComponent/LoadSave.mdx',
  '../React-Automation-Studio/components/ArchiverDataViewer/ArchiverDataViewer.mdx',
  '../React-Automation-Studio/**/**/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  
],
  addons: [
    "@storybook/addon-docs"
  ],
  async viteFinal(config, { configType }) {
    if (configType === 'DEVELOPMENT') {
      // Your development configuration goes here
    }
    if (configType === 'PRODUCTION') {
      // Your production configuration goes here.
    }
    return mergeConfig(config, {
      // Your environment configuration here
    });
  },
};