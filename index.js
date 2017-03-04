var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var ElizaBot = require('./elizabot');

var app = express();
var eliza = new ElizaBot();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000), function () {
  console.log('app listening on port 3000');
});

var missdressing_products = require('./products.json'); // product data stored on the server


// Server frontpage
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});


// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'judi_bot_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            // get reply from eliza 
			
			var text2 = event.message.text;
            var upperCasedText = text2.toUpperCase();
			
            if (upperCasedText.includes('SAD')) {
					var valiny="you say HELLO";
					sendProducts(event.sender.id)
			} else if (upperCasedText.includes('SICK')) {
					var valiny="you say SICK";
					sendChaussures(event.sender.id)
			} 
			
            var reply = eliza.transform(event.message.text);
            sendMessage(event.sender.id, {text: reply});
			
        } 
    }
    res.sendStatus(200);
});

// FACEBOOK MESSENGER AUTH TOKEN
var FACEBOOK_ACCESS_TOKEN = "EAAI7ccGDI6ABABm1GBuwANsjUfNZAhSNeYeNqjylSoZANDC5It2DI4X8OghWPlZAjsP4Tn0LFZBqJUTHX1trOrTBDiru8CN2cvLQTndjt6rLaJBBvsxnBJ0Sw1c5hYcMo2ZBQKjq0GH4yMBE8aHKKsRpfAOIcu9ReTWSu0SnuvAZDZD";

// generic function sending messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: FACEBOOK_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

function sendProducts(sender) {
	
	var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": missdressing_products.thanksfull
            }
        }
    };

    // send the message
    sendMessage(sender, messageData);
}

function sendProducts(sender) {
	
	var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": missdressing_products.sad
            }
        }
    };

    // send the message
    sendMessage(sender, messageData);
}

function sendChaussures(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": missdressing_products.sick
            }
        }
    };

    // send the message
    sendMessage(sender, messageData);
}
