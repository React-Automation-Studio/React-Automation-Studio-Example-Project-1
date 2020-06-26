
CustomTextInput example connection to an SoftChannel EPICS AI pv:

```js
    <CustomTextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       usePvLabel={true}
       usePvPrecision={true}
       usePvUnits={true}
       usePvMinMax={true}
       alarmSensitive={true}
    />
```
Example with CustomTextInput and Slider
```js
import Slider from 'React-Automation-Studio/components/BaseComponents/Slider';
    <div>
    <CustomTextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       alarmSensitive={true}
       usePvPrecision={true}
       
       usePvUnits={true}
       usePvLabel={true}
    />
     <Slider  pv='pva://testIOC:amplitude'  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
        showValue={true} usePvMinMax={true} usePvLabel={true} step={1} usePvUnits={true}/>
     </div>
```



CustomTextInput example connection to a SoftChannel EPICS AI pv with example overrides of EPICS fields:

```js
    <CustomTextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       label={'Custom Label'}
       
       prec={5}
       units={"🍕"}
       max={5500}
       min={4500}
       alarmSensitive={true}
    />
```

CustomTextInput example connection to an SoftChannel EPICS MBBO pv using the string value:

```js
    <CustomTextInput  
       pv='pva://$(device):mbboTest$(id)'
       macros={{'$(device)':'testIOC','$(id)':'1'}}
       usePvLabel={true}
       useStringValue={true}
       usePvUnits={true}

    />


```
CustomTextInput example connection to an SoftChannel EPICS MBBO pv using the numerical value:

```js
    <CustomTextInput  
       pv='pva://$(device):mbboTest$(id)'
       macros={{'$(device)':'testIOC','$(id)':'1'}}
       usePvLabel={true}
       usePvUnits={true}

    />


```

CustomTextInput example :

```js
    <CustomTextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       alarmSensitive={true}
       usePvPrecision={true}
       prec={3}
       usePvUnits={true}
    />
```

CustomTextInput number format example :

```js
    <CustomTextInput  
       pv='pva://$(device):test$(id)'
       macros={{'$(device)':'testIOC','$(id)':'2'}}
       alarmSensitive={true}
       usePvPrecision={true}
       prec={3}
       usePvUnits={true}
       numberFormat={{notation: 'engineering',precision: 5}}
    />
```

