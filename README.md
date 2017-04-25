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

somewhere safe:
```
<div class="js-timepicker-anchor"></div>
```

when user clicks on input, the time picker will rendered and shown

1. id is an optional string to be used for the modal id on dom
2. value is an optional reactive var that, when provided, will be updated by the picker
3. if value contains a valid time it will be used as default
4. the js-timepicker-anchor class is to tell the time picker where to anchor the modal
4.1 because modals in materializecss are picky where they are rendered
4.2 sometimes you need to render from a different place than where you trigger it
4.3 anchoring to an input, for example, does not work
