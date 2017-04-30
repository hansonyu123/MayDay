import { Uploader } from 'meteor/tomi:upload-jquery';

Meteor.startup(function () {
// Here we put function who will be executed after file uploading
// topic and subject are stored in templateContext.test or fileInfo.test
// Notice that fileInfo.name is content's uuid.
import { Meteor } from 'meteor/meteor';

Uploader.finished = function (index, fileInfo, templateContext) {
    console.log(fileInfo);
    console.log(templateContext);
    console.log("HI");
    Session.set('status', "loa");
    Session.set('id', fileInfo.name.slice(0, -4));
    Meteor.call('writeId', fileInfo.name.slice(0, -4), Session.get('date'));
    console.log("QQ");
    Meteor.call('callExe');
    Meteor.call('getMSV', fileInfo.name.slice(0, -4), function(err, data){
    	console.log("SEE");
    	console.log(data);
    	Session.set('status', "res");
    	Session.set('total', data.total);
    	Session.set('max', data.max);
    });
  }
})