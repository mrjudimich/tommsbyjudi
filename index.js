// initialize server and go from there
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var http = require("http");
http.post = require('http-post');
var options = {
  hostname: 'tomss.azurewebsites.net',
  port: 80,
  path: '/user',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  }
};

var choiceData=new Array();

function sendGET(var_path,senderID) {
var options_GET = {
  hostname: 'tomss.azurewebsites.net',
  port: 80,
  path: var_path,
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
  }
};

var req = http.request(var_path,function(res){
	var response='';
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		console.log(chunk);
		response+=chunk;
	});
	res.on("end", function () {
        console.log("finished :" + response);
		
		var jsonsss=JSON.parse(response);
		
		if(jsonsss.hasOwnProperty('bookmarks')){
			sendGET(jsonsss.bookmarks[0].link,senderID);
		}
		if(jsonsss.hasOwnProperty('nextUrl')){
				sendGET(jsonsss.nextUrl,senderID);
		}
		if(jsonsss.hasOwnProperty('content'))
		{
			
			for (var ii in choiceData) {
				  if(choiceData[ii].userID.includes(senderID)){
					  choiceData.splice(ii, 1);
				  }
				}
			
			choiceData.push({"userID":senderID, "donnee":jsonsss});
			
			var second=new Array();
				for (var k in jsonsss.actions) {
				  second.push({"content_type":"text", "title":jsonsss.actions[k].description, "payload":jsonsss.actions[k].path});
				}
			sendQuickReplies(senderID,jsonsss.content, second);		
		}
    });
});
req.end();
}
function findChoiceByDescription(choiceData,descriptionSearch,senderID)
{
	var search="";
	for (var i in choiceData){
		if(choiceData[i].userID.includes(senderID)){
			for (var j in choiceData[i].donnee.actions) {
				  if(choiceData[i].donnee.actions[j].description.includes(descriptionSearch)){
					  search=choiceData[i].donnee.actions[j].path;
				  }
				}	
		}
	}
	return search;
}


// other requirements
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

/* Redirect http to https */
app.get('*', function (req,res,next) {
    if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
        res.redirect('https://' + req.hostname + req.url);
    else
        next(); /* Continue to other routes if we're not redirecting */
});

// serve static files from 'css' (stylesheets), 'scripts' (client-side JS) and 'assets' (images, etc.) directories
app.use(express.static('scripts'));
app.use(express.static('css'));
app.use(express.static('assets'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname+'/www/index.html'));
});

// router to send API keys to client side
app.get('/config', function (req, res) {
    res.json({
        "appboy": process.env.APPBOY_API_KEY,
        "facebook": {
            "appID": process.env.FACEBOOK_APP_ID,
            "pageID": process.env.FACEBOOK_PAGE_ID
        },
        "google": {
            "mapsAPI": process.env.GOOGLE_MAPS_API_KEY
        }
    })
})

// socket.io listener for connections
io.on('connection', function (socket) {
    // generate uuid for session
    var session_uuid = uuid.v4();
    // send connected socket to private chat room so that we can safely pass data from auth event
    socket.join(session_uuid);
    // send UUID to connected socket
    socket.emit('response', { 'uuid' : session_uuid } );
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'judi_bot_token') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

// API endpoint to process messages
var myURL;
app.post('/webhook/', function (req, res) {
    myURL = req.protocol + '://' + req.get('host');
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message && event.message.text) {
            text = event.message.text;
            var upperCasedText = text.toUpperCase();
            if(upperCasedText.includes('START')){
			// GET POST NAME TOKEN FROM FEHZ
			var dataPost= { name: sender, email: sender, password: sender };
			var httppost = http.post(options,dataPost, function(res){
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					console.log('name: ' + chunk);
					var jss=JSON.parse(chunk);
					console.log('name: ' + jss.name);
					console.log('token: ' + jss.token);
					sendTextMessage(sender, "Name :"+jss.name+" Token :"+jss.token );
					sendGET('http://tomss.azurewebsites.net/me?token='+jss.token,sender);

				});
			});
			} else if( findChoiceByDescription(choiceData,text,sender).length > 0){
				//sendTextMessage(sender, "Choix: "+findChoiceByDescription(choiceData,text,sender));
				sendGET(findChoiceByDescription(choiceData,text,sender),sender);
			} else {
				sendTextMessage(sender,'Tapez START pour commencer!');
			}
			
			
			// GET URL
			
            if (event.postback) {
                text = JSON.stringify(event.postback)
                sendTextMessage(sender, "Postback received:" + text.substring(0, 200))
                continue
            }
        }
        else if (event.optin) {
            var dataRef = event.optin.ref;
            io.to(dataRef).emit('fb_messenger_auth', { 'messenger_id' : sender });
            sendTextMessage(sender, "Merci de votre inscription. Nous allons bientôt donner suite à votre commande!");
        }
    }
    res.sendStatus(200);
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke... We\'ll look into it.');
});

// FACEBOOK MESSENGER AUTH TOKEN
var FACEBOOK_ACCESS_TOKEN = "EAAI7ccGDI6ABADJKEC1400oTDlO8aslbvaBTzZAjwobZBoYn35qMDgdoQfoCVbCwpFjHQbbYKzFnZAz9QvBIYWZCpjKkZBR5tlotQmYmZA90pxFtJPhe3uaO6NJoqClEhS7sCLEZA7ETTtSZAidaw9u5v2ZBAZBOauIlAYk52bowhCMgZDZD";

/**
 * Sends a message to a given Facebook Messenger ID using a POST request to the Facebook Send API
 * @param {string} sender - The page-specific Messenger ID of the intended recipient
 * @param {Object} messageData - The contents of the message in Facebook-compliant JSON
 * @return nothing
 */
function sendMessage(sender, messageData) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:FACEBOOK_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

/**
 * Sends a text message to a given Facebook Messenger ID using a POST request to the Facebook Send API
 * @param {string} sender - The page-specific Messenger ID of the intended recipient
 * @param {string} text - The text message to be sent
 * @return nothing
 */
function sendTextMessage(sender, text) {
    var messageData = {
        text:text
    };

    // send the message
    sendMessage(sender, messageData);
}


function sendQuickReplies(sender, var_text, var_quick) {
    var messageData = {
		"text":var_text,
    
        "quick_replies": var_quick
    }
    // send the message
    sendMessage(sender, messageData);
}
/**
 * Sends a Button message with a call to action to visit the site to a given Facebook Messenger ID using a POST request to the Facebook Send API
 * @param {string} sender - The page-specific Messenger ID of the intended recipient
 * @return nothing
 */

/**
 * Sends a Structured Message with the Appboy logo and a link to appboy.com to a given Facebook Messenger ID using a POST request to the Facebook Send API
 * @param {string} sender - The page-specific Messenger ID of the intended recipient
 * @return nothing
 */

// set port
app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});