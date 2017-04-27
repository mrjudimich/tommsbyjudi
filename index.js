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

var choiceSave=new Array();
var choiceData=new Array();
var chiffre=1;
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
		response=chunk;
	});
	res.on("end", function () {
        console.log("finished :" + response);
		var third=[
            {
                "content_type":"text",
                "title":"Chaussures! \uD83D\uDC4D",
                "payload":"0"
            },
            {
                "content_type":"text",
                "title":"Parfums! \u2764\ufe0f",
                "payload":"1"
            },
            {
                "content_type":"text",
                "title":"Habillement \ud83d\ude34",
                "payload":"next"
            }
        ];
		var jsonsss=JSON.parse(response);
		
		if(jsonsss.hasOwnProperty('nextUrl')){
				sendGET(jsonsss.nextUrl,senderID);
		}
		else
		{
			chiffre+=1;
			var second=new Array();
				for (var i in jsonsss.actions) {
				  second.push({"content_type":"text", "title":jsonsss.actions[i].description, "payload":jsonsss.actions[i].path});
				}
				
			if(jsonsss.content.length>0)
			{
				sendTextMessage(senderID,"Histoire: "+jsonsss.content);
			}
			choiceSave=jsonsss;
			for (var ii in choiceData) {
				  if(choiceData[ii].userID.includes(senderID)){
					  choiceData.splice(i, 1);
				  }
				}
				var msgList="";
			for (var iii in choiceData) {
				msgList+="DATA "+iii+" : "+choiceData[iii].userID;
				}
			choiceData.push({"userID":senderID, "donnee":jsonsss});
			sendQuickReplies(senderID,"MSG LIST : "+msgList+" Choisir la suite...", second);	
		}
    });
});
req.end();
}
//12121212112121 test heroku

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

var products = require('./menu.json'); // product data stored on the server
var missdressing_products = require('./products.json'); // product data stored on the server

// handle a URI encoded JSON request as a GET
app.get('/api/products', function (req, res) {
    var reqJSON = JSON.parse(decodeURIComponent(req.query.orderData));
    var orderDetails = reqJSON.order;
    var response = {"item_data" : []};
    var subtotal = 0;
    for (var j = 0; j < orderDetails.length; j++) {
        var item = orderDetails[j];
        var product = products.products[item.productID];
        var title = product.title;
        var subtitle = "";
        var product_image = product.image_url;
        var price = product.price;
        var extras = item.extras;
        for (var i = 0; i < extras.length; i++) {
            var extra = products.extras[extras[i]];
            price += extra.price;
            if (extras.length === 1 || i == extras.length - 2) {
                subtitle += extra.title;
            } else if (i === extras.length - 1) {
                subtitle += ' and ' + extra.title;
            } else {
                subtitle += extra.title + ", ";
            }
        }
        subtotal += item.quantity * price;
        response.item_data.push({
            "title" : title,
            "subtitle" : subtitle,
            "price" : price,
            "quantity" : item.quantity,
            "image_url" : product_image
        });
    }
    var total_tax = 0.0825 * subtotal;
    var total_cost = subtotal + total_tax;
    response.summary = {
        "subtotal" : subtotal.toFixed(2),
        "total_tax" : total_tax.toFixed(2),
        "total_cost" : total_cost.toFixed(2)
    };
    res.json(response);
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
					sendGET('http://tomss.azurewebsites.net/book/first-book/chapter/1?token='+jss.token,sender);

				});
			});
			} 
			
			if( findChoiceByDescription(choiceData,text,sender).length > 0){
				sendTextMessage(sender, "Choix: "+findChoiceByDescription(choiceData,text,sender));
				sendGET(findChoiceByDescription(choiceData,text,sender),sender);
			}else{
				sendTextMessage(sender, 'Tapez START pour commencer!');
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
function sendPizzaCTA(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "We don't yet support ordering pizza via our bot, but you can grab a delicious imaginary pie from the link below!",
                "buttons": [{
                    "type": "web_url",
                    "title": "Order a Pie!",
                    "url": myURL
                }]
            }
        }
    };

    // send the message
    sendMessage(sender, messageData);
}

/**
 * Sends a Structured Message with the Appboy logo and a link to appboy.com to a given Facebook Messenger ID using a POST request to the Facebook Send API
 * @param {string} sender - The page-specific Messenger ID of the intended recipient
 * @return nothing
 */
function sendProducts(sender) {
	
	var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
				
                "elements": missdressing_products.missdressing_products
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
                "elements": missdressing_products.chaussures
            }
        }
    };

    // send the message
    sendMessage(sender, messageData);
}
function sendParfums(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
				
                "elements": missdressing_products.parfums
            }
        }
    };

    // send the message
    sendMessage(sender, messageData);
}

function sendHabillement(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
				
                "elements": missdressing_products.habillement
            }
        }
    };

    // send the message
    sendMessage(sender, messageData);
}


function sendCategory(sender, url, fileType) {
    var messageData = {
		"attachment":{
            "type":fileType,
            "payload":{
                "url": url
            }
        },
    
        "quick_replies":[
            {
                "content_type":"text",
                "title":"Chaussures! \uD83D\uDC4D",
                "payload":"CHAUSSURES"
            },
            {
                "content_type":"text",
                "title":"Parfums! \u2764\ufe0f",
                "payload":"PARFUMS"
            },
            {
                "content_type":"text",
                "title":"Habillement \ud83d\ude34",
                "payload":"HABILLEMENT"
            }
        ]
    }
    // send the message
    sendMessage(sender, messageData);
}

function sendFileMessage(sender, url, fileType) {
    var messageData = {
        "attachment":{
            "type":fileType,
            "payload":{
                "url": url
            }
        },
        "quick_replies":[
            {
                "content_type":"text",
                "title":"Awesome! \uD83D\uDC4D",
                "payload":"awesome"
            },
            {
                "content_type":"text",
                "title":"Love it! \u2764\ufe0f",
                "payload":"love_it"
            },
            {
                "content_type":"text",
                "title":"Blah \ud83d\ude34",
                "payload":"blah"
            }
        ]
    }

    // send the message
    sendMessage(sender, messageData);
}

function sendAirlineTemplate(sender) {
    var messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "airline_itinerary",
            "intro_message": "Here\'s a sample flight itinerary. We're not really in the airline business though. Not yet, anyway.",
            "locale": "en_US",
            "theme_color":"#1C222B",
            "pnr_number": "ABCDEF",
            "passenger_info": [
              {
                "name": "Farbound Smith Jr",
                "ticket_number": "0741234567890",
                "passenger_id": "p001"
              },
              {
                "name": "Nick Jones",
                "ticket_number": "0741234567891",
                "passenger_id": "p002"
              }
            ],
            "flight_info": [
              {
                "connection_id": "c001",
                "segment_id": "s001",
                "flight_number": "KL9123",
                "aircraft_type": "Boeing 737",
                "departure_airport": {
                  "airport_code": "SFO",
                  "city": "San Francisco",
                  "terminal": "T4",
                  "gate": "G8"
                },
                "arrival_airport": {
                  "airport_code": "SLC",
                  "city": "Salt Lake City",
                  "terminal": "T4",
                  "gate": "G8"
                },
                "flight_schedule": {
                  "departure_time": "2016-01-02T19:45",
                  "arrival_time": "2016-01-02T21:20"
                },
                "travel_class": "business"
              },
              {
                "connection_id": "c002",
                "segment_id": "s002",
                "flight_number": "KL321",
                "aircraft_type": "Boeing 747-200",
                "travel_class": "business",
                "departure_airport": {
                  "airport_code": "SLC",
                  "city": "Salt Lake City",
                  "terminal": "T1",
                  "gate": "G33"
                },
                "arrival_airport": {
                  "airport_code": "AMS",
                  "city": "Amsterdam",
                  "terminal": "T1",
                  "gate": "G33"
                },
                "flight_schedule": {
                  "departure_time": "2016-01-02T22:45",
                  "arrival_time": "2016-01-03T17:20"
                }
              }
            ],
            "passenger_segment_info": [
              {
                "segment_id": "s001",
                "passenger_id": "p001",
                "seat": "12A",
                "seat_type": "Business"
              },
              {
                "segment_id": "s001",
                "passenger_id": "p002",
                "seat": "12B",
                "seat_type": "Business"
              },
              {
                "segment_id": "s002",
                "passenger_id": "p001",
                "seat": "73A",
                "seat_type": "World Business",
                "product_info": [
                  {
                    "title": "Lounge",
                    "value": "Complimentary lounge access"
                  },
                  {
                    "title": "Baggage",
                    "value": "1 extra bag 50lbs"
                  }
                ]
              },
              {
                "segment_id": "s002",
                "passenger_id": "p002",
                "seat": "73B",
                "seat_type": "World Business",
                "product_info": [
                  {
                    "title": "Lounge",
                    "value": "Complimentary lounge access"
                  },
                  {
                    "title": "Baggage",
                    "value": "1 extra bag 50lbs"
                  }
                ]
              }
            ],
            "price_info": [
              {
                "title": "Fuel surcharge",
                "amount": "1597",
                "currency": "USD"
              }
            ],
            "base_price": "12206",
            "tax": "200",
            "total_price": "14003",
            "currency": "USD"
          }
        }    
    }
    sendMessage(sender, messageData);
}

// set port
app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});