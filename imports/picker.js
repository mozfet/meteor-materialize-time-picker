/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';

import './unit.js';
import './meridiem.js';
import './picker.html';

//constant time format
const TIME_FORMAT = 'h:mm A';

//constant left pad function
const padLeft = (nr, n, str) => {
  return Array(n-String(nr).length+1).join(str||'0')+nr;
};

//export utility function to convert numeric time to string
export const timeString = (hour, minute, meridiem) => {
  return hour+':'+padLeft(minute.toString(),2,'0')+' '+meridiem;
};

//export utility function to convert moment to string
export const momentToTimeString = (momento) => {
  // console.log('to string', momento);
  const currentHour = Number(momento.format('h'));
  const currentMinute = Number(momento.format('mm'));
  const currentMeridiem = momento.format('A');
  const currentTimeValue = timeString(currentHour, currentMinute, currentMeridiem);
  return currentTimeValue;
};


//export utility function to convert moment to time
export const momentToTimeObject = (momento) => {
  const hour = Number(momento.format('h'));
  const minute = Number(momento.format('mm'));
  const meridiem = momento.format('A');
  return {
    hour: hour,
    minute: minute,
    meridiem: meridiem
  };
};

//export utility function to get current time as string
export const currentTime = () => {
  const now = moment();
  // console.log('now', now);
  return momentToTimeString(now);
};

//when template is created
Template.materializeTimePicker.onCreated(() => {
  const instance = Template.instance();

  //get time from data or use current time
  let inValue = (instance.data && instance.data.value)?instance.data.value.get():undefined;
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

  //if data value is present
  if(instance.data && instance.data.value) {

    //assign value
    instance.value = instance.data.value;
  }

  //else - no value data present
  else {

    //create new value
    instance.value = new ReactiveVar(currentTimeValue);
  }

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
