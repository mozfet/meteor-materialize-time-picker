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

    //get the anchor
    let qAnchor = $('.js-timepicker-anchor');
    let anchor = qAnchor.get(0);

    if(!anchor) {
      console.warn('timepicker requires a tag with class js-timepicker-anchor for rendering timepicker modal');
      console.warn('using ancestral container as anchor for rendering timepicker modal');
      qAnchor = $('#'.instance.id).parents('.container');
      anchor = qAnchor.get(0);
    }

    //if modal is allready rendered
    const modal = qAnchor.find('#'+instance.id).get(0);
    if(modal) {

      //remove modal so that it can be rerendered
      modal.remove();
    }

    //render the modal in the first materialize container
    // console.log('rendering pickatime modal in autoform pickatime input type', instance);
    Blaze.renderWithData(
      Template.materializeTimePickerModal,
      {
        id: instance.id,
        value: instance.value //note that value could be undefined if not provided as data
      },
      anchor
    );
    // console.log('rendered pickatime modal', $('#'+instance.id).get(0));
  }
});

//on destroyed
Template.timePicker.onDestroyed(() => {
  const instance = Template.instance();
  // console.log('destroy time picker');
});
