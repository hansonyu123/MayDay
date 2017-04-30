import { Meteor } from 'meteor/meteor';
import {spawn} from 'child_process';

Meteor.methods({
	'writeId'(id, date){
		console.log("START");
		date = date.substr(0, 4)+'/' +date.substr(5, 2)+'/'+date.substr(8);
		fs.writeFile("C:/Users/Hans/Meteor/MayDay/CARI_7_DVD/id.txt", id+"\n"+date, 
        function (err) {
            if (err) throw err;
              console.log('Done!');
        });
	},
	'callExe': function() {
		var Future=Npm.require("fibers/future");
		var future=new Future();
		var execFile = require('child_process').execFile,
		ls    = execFile('C:/Users/Hans/Meteor/MayDay/CARI_7_DVD/Untitled1.exe',  {
  		cwd: 'C:/Users/Hans/Meteor/MayDay/CARI_7_DVD'}, function(err, res){
  			if(err){
	          future.throw(err);
	        }else{
	          future.return(res);
	        }
  		});
  		
		ls.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
		});

		ls.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
		});

		ls.on('exit', function (code) {
		console.log('child process exited with code ' + code);
		});

		ls.on('close', function (code) {
		console.log('child process exited with code ' + code);
		});
		console.log("END");
		return future.wait();
	},
	'getMSV': function(id){
		console.log("START");
		var file = fs.readFileSync('C:/Users/Hans/Meteor/MayDay/CARI_7_DVD/'+id+'.DAT', 'utf8');
		var ind = file.search("TOTAL          microSv");
		console.log(file);
		console.log(Number(file.substr(ind-11, 10)));
		var mx = 0;
		var obj = [];
		for(var i = 1;; i++){
			var ind1 = file.search(" "+i.toString()+" ");
			if(ind1 == -1) break;
			var rate = Number(file.substr(ind1+i.toString().length+3, 10));
			var ttl = Number(file.substr(ind1+i.toString().length+15, 10));
			var topush = {rate: rate, total: ttl, step: (i-1)/2};
			if(i%2) obj.push(topush);
			//console.log(rate);
			if(mx < rate) mx = rate;
		}
		console.log(mx);
		var data = {total: Number(file.substr(ind-11, 10)), max: mx, dt: obj};
		console.log(data);
		return data;
	}
});
