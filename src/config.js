module.exports = [
	{
		"type":"heading",
		"defaultValue":"LIFX Buddy"
	},
	{
		"type":"text",
		"defaultValue":"Settings"
	},
	{
		"type":"input",
		"appKey":"apiKey",
		"defaultValue":"",
		"label":"API Key",
		"description":"You can obtain your API key from <a href=\"https://cloud.lifx.com\">here<\/a>.",
		"attributes":{
			"placeholder":"eg. ce32c5e5c...",
			"required":"required"
		}
	},
	{
		"type":"submit",
		"defaultValue":"Submit"
	}
]