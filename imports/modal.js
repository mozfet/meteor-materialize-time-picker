/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { modal } from './modalUtil.js';

import './modal.html';
import './picker.js';

//when template instance is rendered
Template.materializeTimePickerModal.onRendered(() => {
  const instance = Template.instance();

  //re-render the timepicker when there is a change in rendering of the modal
  const modalId = instance.data.id;

  //open modal
  modal.open(modalId);
});

//template helpers
Template.materializeTimePickerModal.helpers({
  closeButtonLabel() {
    const instance = Template.instance();
    return instance.data && instance.data.modalOptions && instance.data.modalOptions.closeButtonLabel?
      instance.data.modalOptions.closeButtonLabel:'Close';
  },
  clearButtonLabel() {
    const instance = Template.instance();
    return instance.data && instance.data.modalOptions && instance.data.modalOptions.clearButtonLabel?
      instance.data.modalOptions.closeButtonLabel:'Clear';
  },
  value() {
    const instance = Template.instance();
    return instance.data.value;
  }
});

//template events
Template.materializeTimePickerModal.events({
  'click .js-materialize-time-picker-modal-clear': function(event, template){
    const instance = Template.instance();
    instance.data.value.set(undefined);
  }
});
