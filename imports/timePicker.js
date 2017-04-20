/*jshint esversion: 6 */

//imports
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { uuid } from 'meteor/rwatts:uuid';
import './timePicker.html';
import './modal.js';

//on created
Template.timePicker.onCreated(() => {

  //instance data value?
  const instance = Template.instance();

  instance.id = (instance.data && instance.data.id)?instance.data.id:'pickatime_modal_'+uuid.new();
  // console.log('modal id', instance.id);

  //if value is provided
  let value = (instance.data && instance.data.value)?instance.data.value:undefined;
  if(value) {
    instance.value = value;
  }

  //else - value is not provided
    //do not init value, let picker do it downstream
});

//on rendered
Template.timePicker.onRendered(() => {
  const instance = Template.instance();
});

//helpers
Template.timePicker.helpers({
});

//events
Template.timePicker.events({

  //when click on trigger inside this wrapper
  'click .js-timepicker-trigger' (event, template) {
    const instance = Template.instance();

    //render the modal in the first materialize container
    // console.log('rendering pickatime modal in autoform pickatime input type', instance);
    const container = $('.container').get(0);
    Blaze.renderWithData(
      Template.materializeTimePickerModal,
      {
        id: instance.id,
        value: instance.value //note that value could be undefined if not provided as data
      },
      container
    );
    // console.log('rendered pickatime modal', $('#'+instance.id).get(0));
  }
});

//on destroyed
Template.timePicker.onDestroyed(() => {
  const instance = Template.instance();
});
