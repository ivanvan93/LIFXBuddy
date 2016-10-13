var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');
var Settings = require('settings');
var Clay = require('clay');
var clayConfig = require('config');
var clay = new Clay(clayConfig, null, {autoHandleEvents: false});

var apiKey = "";

var main = new UI.Card({
  	title: 'LIFX Buddy',
	body: 'Press select to toggle your lights'
});

Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (e && !e.response) {
    return;
  }
  var dict = clay.getSettings(e.response);

  // Save the Clay settings to the Settings module. 
  Settings.option(dict);
  console.log('API Key: ' + Settings.option('apiKey'));
  apiKey = Settings.option('apiKey');
});

apiKey = Settings.option('apiKey');
console.log('Value of APIKey: ' + apiKey);

function toggleLights(){
	ajax({ 
		url: 'https://api.lifx.com/v1/lights/all/toggle', 
		type: 'json', 
		method: 'post',
		headers: {'Authorization': 'Bearer ' + apiKey }
		},
		function(data){
			console.log('Togged lights.');
			Vibe.vibrate('short');
		},
		function(error){
			console.log('Ass');
		}
	);
}

function turnOnLights(){
	ajax({ 
		url: 'https://api.lifx.com/v1/lights/all/state', 
		type: 'json', 
		method: 'put',
		data: {'power' : 'on'},
		headers: {'Authorization': 'Bearer ' + apiKey }
		},
		function(data){
			console.log('Turned on lights');
			Vibe.vibrate('short');
		},
		function(error){
			console.log('Ass');
		}
	);
}

function turnOffLights(){
	ajax({ 
		url: 'https://api.lifx.com/v1/lights/all/state', 
		type: 'json', 
		method: 'put',
		data: {'power' : 'off'},
		headers: {'Authorization': 'Bearer ' + apiKey }
		},
		function(data){
			console.log('Turned off lights');
			Vibe.vibrate('short');
		},
		function(error){
			console.log('Ass');
		}
	);
}

toggleLights();
main.show();

main.on('click','select', function(e){
	toggleLights();
});

main.on('click', 'down', function(e){
	turnOffLights();
});

main.on('click', 'up', function(e){
	turnOnLights();
});

