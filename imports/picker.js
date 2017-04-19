/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';

import './unit.js';
import './meridiem.js';
import './picker.html';

//format helpers
const TIME_FORMAT = 'h:mm A';
const timeString = (hour, minute, meridiem) => {
  return hour+':'+padLeft(minute.toString(),2,'0')+' '+meridiem;
};
const padLeft = (nr, n, str) => {
  return Array(n-String(nr).length+1).join(str||'0')+nr;
};

//when template is created
Template.materializeTimePicker.onCreated(() => {
  const instance = Template.instance();

  //get current time
  let inValue = instance.data && instance.data.value?instance.data.value.get():undefined;
  const now = moment();
  if(inValue) {
    inValue = now.format('YYYY/MM/DD ')+inValue;
  }
  const value = inValue?moment(inValue, 'YYYY/MM/DD '+TIME_FORMAT):now;
  const currentHour = Number(value.format('h'));
  const currentMinute = Number(value.format('mm'));
  const currentMeridiem = value.format('A');
  const currentTimeValue = timeString(currentHour, currentMinute, currentMeridiem);

  //init reactive vars
  instance.hour = new ReactiveVar(currentHour);
  instance.minute = new ReactiveVar(currentMinute);
  instance.meridiem = new ReactiveVar(currentMeridiem);
  instance.value = new ReactiveVar(currentTimeValue);

  //reactively calculate the time
  instance.autorun(() => {

    //parse the value of the component
    const hourValue = instance.hour.get();
    const minuteValue = instance.minute.get();
    const meridiemValue = instance.meridiem.get();
    const timeValue = timeString(hourValue, minuteValue, meridiemValue);
    instance.value.set(timeValue);

    //if data value was provided
    if(instance.data && instance.data.value) {

      //update data value
      instance.data.value.set(timeValue);
    }
  });
});

//helpers
Template.materializeTimePicker.helpers({
  hour() {
    const instance = Template.instance();
    return instance.hour;
  },
  minute() {
    const instance = Template.instance();
    return instance.minute;
  },
  meridiem() {
    const instance = Template.instance();
    return instance.meridiem;
  }
});
