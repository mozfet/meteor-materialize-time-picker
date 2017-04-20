// package metadata file for Meteor.js

Package.describe({
  name: 'mozfet:materialize-time-picker',
  summary: 'The missing materialize time picker',
  version: '0.1.1',
  git: 'https://github.com/mozfet/meteor-materialize-time-picker.git'
});

Npm.depends({
  'moment': '2.18.0'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.4');
  api.use(['templating', 'underscore', 'reactive-var', 'blaze'], 'client');
  api.use('ecmascript@0.7.2');
  api.use('fourseven:scss@3.4.3');
  api.use('rwatts:uuid@0.1.0');
  api.addFiles([
    'index.js',
    'sass/timepicker.scss'
  ], 'client');
});
