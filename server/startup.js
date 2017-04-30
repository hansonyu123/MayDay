import { Uploader } from 'meteor/tomi:upload-jquery';
import { Random } from 'meteor/random'

Meteor.startup(function () {
  UploadServer.init({
    // tmpDir: process.env.PWD + '/.uploads/tmp',
    // uploadDir: process.env.PWD + '/.uploads/',
    tmpDir: 'C:/Users/Hans/Meteor/MayDay/.uploads/tmp',
    uploadDir: 'C:/Users/Hans/Meteor/MayDay/CARI_7_DVD/',
    checkCreateDirectories: true, //create the directories for you
    getFileName: function (fileInfo, formData) {
      console.log(fileInfo);
      fileInfo.test = formData;
      var uuid = Random.id()+".csv";
      //fileInfo.extraData = fileInfo.name;
      uuid = uuid.toLowerCase();
      return uuid;
    }
  });
  fs = Npm.require('fs');
});