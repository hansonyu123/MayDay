import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Uploader } from 'meteor/tomi:upload-jquery';
import { Meteor } from 'meteor/meteor';


import './main.html';

Blaze._allowJavascriptUrls();

Template.documentUploader.onCreated(function(){
	Session.set('status', "");
	this.rate = new ReactiveVar(0);
	this.ttl = new ReactiveVar(0);
})

Template.documentUploader.helpers({
	today: function(){
		var date = new Date();
		Session.set('date', date.toJSON().slice(0, 10));
		return date.toJSON().slice(0, 10);
	},
	loa: function(){
		return Session.get('status') == "loa";
	},
	res: function(){
		return Session.get('status') == "res";
	},
	total: function(){
		return Session.get('total');
	},
	max: function(){
		return Session.get('max');
	},
	data: function(){
		Meteor.call('getMSV', Session.get('id'), function(err, res){
			Session.set('dt', res.dt);
		});
		console.log(Session.get('dt'));
		return Session.get('dt');
	},
	rate: function(){
		return Template.instance().rate.get();
	},
	ttl: function(){
		return Template.instance().ttl.get();
	},
	time: function(num){
		return (num/0.27).toPrecision(4);
	}
});

Template.documentUploader.events({
	'change .date': function(evt){
		var date = evt.target.value;
		if(date) Session.set('date', date);
		console.log(Session.get('date'));
	},
	'mouseover .pt': function(evt){
		var target = evt.target;
		console.log(target.attributes[1].value);
		ind = Number(target.attributes[1].value);
		Template.instance().rate.set(Session.get('dt')[ind].rate);
		Template.instance().ttl.set(Session.get('dt')[ind].total);
	} 
})

Template.tutorial.onCreated(function(){
	this.open = new ReactiveVar(false);
})

Template.tutorial.helpers({
	open: function(){
		return Template.instance().open.get();
	}
});

Template.tutorial.events({
	'click .myopen': function(){
		Template.instance().open.set(true);
	},
	'click .myclose': function(){
		Template.instance().open.set(false);
	}
})

