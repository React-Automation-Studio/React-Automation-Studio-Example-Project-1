const path = require('path')

const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  pagePerSection:true,
  theme: {

    fontFamily: {
      base: 'Roboto'
    }
  },


  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/React-Automation-Studio/styleguide/Wrapper'),
    //LogoRenderer: path.join(__dirname, './src/React-Automation-Studio/styleguide/components/Logo'),
//    StyleGuide: path.join(__dirname, './src/React-Automation-Studio/styleguide/components/StyleGuide'),
	//	StyleGuideRenderer: path.join(__dirname, './src/React-Automation-Studio/styleguide/components/StyleGuideRenderer'),
	//	SectionsRenderer: path.join(__dirname, './src/React-Automation-Studio/styleguide/components/SectionsRenderer'),



  },
  moduleAliases: {
   'React-Automation-Studio': path.resolve(__dirname, 'src/React-Automation-Studio')
  },

  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js')
    let dir = path.dirname(componentPath);
    dir =dir.replace('src/','');


    return `import ${name} from '${dir}/${name}';`
  },
  sections: [
    {
      name: 'Introduction',
      content: 'src/React-Automation-Studio/docs/introduction.md'
    },

    {
      name: 'Documentation',
      content: 'src/React-Automation-Studio/docs/documentation.md'
    },
    {
      name: 'Installation Guide',
      content: 'src/React-Automation-Studio/docs/installationGuide.md',
      sections: [
        {
          name: 'Installation',
          content: 'src/React-Automation-Studio/docs/installation/installation.md',
        },
        {
          name: 'Launching the Docker compose files',
          content: 'src/React-Automation-Studio/docs/installation/launching.md',
        },
        {
          name: 'Configuring Enviroment Variables',
          content: 'src/React-Automation-Studio/docs/installation/userloginOverview.md',
          sections: [
            {
              name: ' Enabling login and authentication',
              content: 'src/React-Automation-Studio/docs/installation/userlogin.md',
            },
            {
              name: ' Enabling user access rights',
              content: 'src/React-Automation-Studio/docs/installation/userAccessRights.md',
            },
            {
              name: ' Enabling HTTPS',
              content: 'src/React-Automation-Studio/docs/installation/https.md',
            },
          ]
        },
        {
          name: 'Configuring MongoDB Server Settings',
          content: 'src/React-Automation-Studio/docs/MongoDB/MongoDB.md',
          sections: [
            {
              name: 'MongoDB Primer',
              content: 'src/React-Automation-Studio/docs/MongoDB/MongoDB_Primer.md',
              sections: [
                {
                  name: 'Replication',
                  content: 'src/React-Automation-Studio/docs/MongoDB/MongoDB_Primer_Replication.md',
                }
              ]
            },
            {
              name: 'MongoDB Configuration',
              content: 'src/React-Automation-Studio/docs/MongoDB/MongoDB_Config.md',
              sections: [
                {
                  name: 'Default configuration',
                  content: 'src/React-Automation-Studio/docs/MongoDB/MongoDB_Config_Default.md',
                },
                {
                  name: 'Changing MongoDB configuration settings',
                  content: 'src/React-Automation-Studio/docs/MongoDB/MongoDB_Config_Config.md',
                }
              ]
            },
            {
              name: 'MongoDB Compass - A GUI for MongoDB',
              content: 'src/React-Automation-Studio/docs/MongoDB/MongoDB_Compass.md',
            }
          ],
        },


      ],
      sectionDepth: 1
    },
    {
      name: 'Style Guide',
      content: 'src/React-Automation-Studio/docs/styleguide.md',
      sections: [
        {
          name: 'How It Works',
          content: 'src/React-Automation-Studio/docs/layout/howItWorks.md',
        },
        {
          name: 'Sample Layouts',
          content: 'src/React-Automation-Studio/docs/layout/sampleLayouts.md',
          components: 'src/React-Automation-Studio/docs/layout/layoutExamples/*.js',
          exampleMode: 'hide', // 'hide' | 'collapse' | 'expand'
          usageMode: 'hide' // 'hide' | 'collapse' | 'expand'
        },

        {
          name: 'Layout Wrapper Components',
          content: 'src/React-Automation-Studio/docs/WorkingWithLayouts.md',



          sections:[
            {
              name: 'Layout Components',
              components: 'src/React-Automation-Studio/components/UI/Layout/ComposedLayouts/*.js',
              exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
              usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
            },
            {
              name: 'TraditionalLayout Example 1',
              content: 'src/React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayoutEx1.md',
            },
            {
              name: 'TraditionalLayout Example 2',
              content: 'src/React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayoutEx2.md',
            },
            {
              name: 'TraditionalLayout Example 3',
              content: 'src/React-Automation-Studio/components/UI/Layout/ComposedLayouts/TraditionalLayoutEx3.md',
            },

          ]
        },
        {
          name: 'Theming',
          content: 'src/docs/themes/themes.md',

        },
        {
          name: 'Base Components',
          content: 'src/React-Automation-Studio/docs/WorkingWithComponents.md',
          components: 'src/React-Automation-Studio/components/BaseComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Compound Components',
          content: 'src/React-Automation-Studio/docs/CompoundComponents.md',
          components: 'src/React-Automation-Studio/components/CompoundComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Widget and PV Components',
          content: 'src/React-Automation-Studio/docs/widget/widget.md',
          components: ['src/React-Automation-Studio/components/SystemComponents/Widgets/Widget.js', 'src/React-Automation-Studio/components/SystemComponents/PV.js', 'src/React-Automation-Studio/components/ExperimentalExamples/Mobile/DynamicPvFieldExample.js'],
          exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand', // 'hide' | 'collapse' | 'expand'




        },
        {
          name: 'Database Hooks',
          content: 'src/React-Automation-Studio/components/SystemComponents/database/MongoDB/MongoDb.md',
          //components: 'src/React-Automation-Studio/components/SystemComponents/database/MongoDB/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
          sections: [
            {
              name: 'useMongoDbWatch',
              content: 'src/React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbWatch.md',
            },
            {
              name: 'useMongoDbInsertOne',
              content: 'src/React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbInsertOne.md',
            },
            {
              name: 'useMongoDbDeleteOne',
              content: 'src/React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbDeleteOne.md',
            },
            {
              name: 'useMongoDbUpdateOne',
              content: 'src/React-Automation-Studio/components/SystemComponents/database/MongoDB/useMongoDbUpdateOne.md',
            },
          ],
        },
        {
          name: 'Beamline Components',
          content: 'src/React-Automation-Studio/docs/beamlineComponents/BeamlineComponents.md',
          components: 'src/React-Automation-Studio/components/SvgBeamlineComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
       

        {
          name: 'Experimental Base Components',
          content: 'src/React-Automation-Studio/docs/WorkingWithComponents.md',
          components: 'src/React-Automation-Studio/components/ExperimentalBaseComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Experimental Beamline Components',
          content: 'src/React-Automation-Studio/docs/beamlineComponents/BeamlineComponents.md',
          components: 'src/React-Automation-Studio/components/ExperimentalSvgBeamlineComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Experimental Alarm Handler',
          content: 'src/React-Automation-Studio/docs/alarmHandler/alarmHandler.md',
          sections: [
            {
              name: 'Setting Up Alarm Server',
              content: 'src/React-Automation-Studio/docs/alarmHandler/setup.md',
              sections: [
                {
                  name: 'Environment settings',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/environment.md',
                },
                {
                  name: 'Setting up email notifications',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/emailNotification.md',
                },
                {
                  name: 'Setting up Signal notifications',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/signalNotification.md',
                },
                {
                  name: 'MongoDB seed data',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/seedData.md',
                  sections: [
                    {
                      name: 'config.json',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/configJson.md',
                    },
                    {
                      name: 'pvList.json',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/pvListJson.md',
                    },
                    {
                      name: 'Users',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/Users.md',
                    },
                  ]
                },
                {
                  name: 'Alarm users role configuration',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/alarmRoleConfig.md',
                  sections: [
                    {
                      name: 'alarmAdmin',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmAdmin.md',
                    },
                    {
                      name: 'alarmUser',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmUser.md',
                    },
                    {
                      name: 'alarmObserver',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmObserver.md',
                    }
                  ]
                }
              ]
            },
            {
              name: 'Alarm Handler User Guide',
              content: 'src/React-Automation-Studio/docs/alarmHandler/userGuide.md',
              sections: [
                {
                  name: 'Functional implementation and conventions',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/implementConventions.md',
                  sections: [
                    {
                      name: 'Alarm server conventions',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/serverConventions.md',
                    },
                    {
                      name: 'Logging of alarm activities',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/serverLogging.md',
                    },
                    {
                      name: 'Notification of alarm events',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmNotification.md',
                    }
                  ]
                },
                {
                  name: 'Alarm setup view',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/alarmSetup.md',
                  sections: [
                    {
                      name: 'ALARM AREAS',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmAreas.md',
                    },
                    {
                      name: 'ALARM TABLE',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmTable.md',
                    },
                    {
                      name: 'ALARM LOG',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmLog.md',
                    },
                  ]
                },
                {
                  name: 'User notification view',
                  content: 'src/React-Automation-Studio/docs/alarmHandler/userNotification.md',
                  sections: [
                    {
                      name: 'Alarm handler user table',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/alarmUserTable.md',
                    },
                    {
                      name: 'Filtered pvs list',
                      content: 'src/React-Automation-Studio/docs/alarmHandler/filterPvList.md',
                    },
                  ]
                },
              ]
            }
          ],
          components: 'src/React-Automation-Studio/components/AlarmHandler/AlarmHandler.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Experimental Load Save',
          content: 'src/React-Automation-Studio/docs/loadSave/loadSave.md',
          components: 'src/React-Automation-Studio/components/LoadSaveComponent/LoadSave.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'

        },
        {
          name: 'Experimental Archiver Data Viewer',
          content: 'src/React-Automation-Studio/components/ArchiverDataViewer/Archiver.md',
          components: 'src/React-Automation-Studio/components/ArchiverDataViewer/ArchiverDataViewer.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'

        },
        {
          name: 'Experimental Base Components',
          content: 'src/React-Automation-Studio/docs/WorkingWithComponents.md',
          components: 'src/React-Automation-Studio/components/ExperimentalBaseComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
          name: 'Custom Components',
          content:'src/components/customComponents/docs/customComponents.md',
          components: 'src/components/customComponents/*.js',
          exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
          usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },



      ],

      sectionDepth: 2,
    },


 ]
}
