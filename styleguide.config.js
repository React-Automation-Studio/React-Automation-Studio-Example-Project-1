const path = require('path')
module.exports = {
  theme: {

    fontFamily: {
      base: 'Roboto'
    }
  },
  moduleAliases: {
      'rsg-example': path.resolve(__dirname, 'src')
    },
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/automation-studio/src/styleguide/Wrapper'),
    //LogoRenderer: path.join(__dirname, './src/automation-studio/src/styleguide/components/Logo'),
//    StyleGuide: path.join(__dirname, './src/automation-studio/src/styleguide/components/StyleGuide'),
	//	StyleGuideRenderer: path.join(__dirname, './src/automation-studio/src/styleguide/components/StyleGuideRenderer'),
	//	SectionsRenderer: path.join(__dirname, './src/automation-studio/src/styleguide/components/SectionsRenderer'),



  },
  sections: [
   {
      name: 'Introduction',
      content: 'src/automation-studio/src/docs/introduction.md'
   },

    {
       name: 'Documentation',
       content: 'src/automation-studio/src/docs/documentation.md'
    },
    {
      name: 'Installation Guide',
      content: 'src/automation-studio/src/docs/installationGuide.md',
      sections: [
        {
          name: 'Installation',
          content: 'src/automation-studio/src/docs/installation/installation.md',
        },
        {
          name: 'Launching the Docker compose files',
          content: 'src/automation-studio/src/docs/installation/launching.md',
        },
        {
          name: 'Configuring Enviroment Variables',
          content: 'src/automation-studio/src/docs/installation/userloginOverview.md',
          sections: [
            {
              name: ' Enabling login and authentication',
              content: 'src/automation-studio/src/docs/installation/userlogin.md',
            },
            {
              name: ' Enabling user access rights',
              content: 'src/automation-studio/src/docs/installation/userAccessRights.md',
            },
            {
              name: ' Enabling HTTPS',
              content: 'src/automation-studio/src/docs/installation/https.md',
            },
          ]
        },


      ]
      },
  {
    name: 'Style Guide',
    content: 'src/automation-studio/src/docs/styleguide.md',
    sections: [
      {
        name: 'How It Works',
        content: 'src/automation-studio/src/docs/layout/howItWorks.md',
      },
      {
        name: 'Sample Layouts',
        content: 'src/automation-studio/src/docs/layout/sampleLayouts.md',
        components: 'src/automation-studio/src/docs/layout/layoutExamples/*.js',
        exampleMode: 'hide', // 'hide' | 'collapse' | 'expand'
        usageMode: 'hide' // 'hide' | 'collapse' | 'expand'
      },
      {
        name: 'Base Components',
       // content: 'docs/ui.md',
        components: 'src/automation-studio/src/components/BaseComponents/*.js',
        exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
        usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
      },
    ]
  },
   // {
   //   name: 'Documentation',
   //   sections: [
   //     {
   //       name: 'Installation',
   //       content: 'docs/installation.md',
   //       description: 'The description for the installation section'
   //     },
   //     {
   //       name: 'Configuration',
   //       content: 'docs/configuration.md'
   //     },
   //     {
   //       name: 'Live Demo',
   //       external: true,
   //       href: 'http://example.com'
   //     }
   //   ]
   // },


 ]
}
