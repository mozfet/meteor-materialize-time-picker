# meteor-materialize-time-picker
The missing materialize styled time picker for meteor

## Install

meteor add mozfet:meteor-materialize-time-picker


### Useage

in template java file:
```
import { }
```

in template html file:
```
{{#timePicker id=id value=value}}
  <input class="js-timepicker-trigger"/>
{{/timePicker}}
```

when user clicks on input, the time picker will rendered and shown

1. id is an optional string to be used for the modal id on dom
2. value is an optional reactive var that, when provided, will be updated by the picker
3. if value contains a valid time it will be used as default
