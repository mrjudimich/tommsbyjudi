// start of file - elizadata.js
// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]

exports.elizaInitials = [
	"Fahasalamanao?",
// additions (not original)
	"Lazalazao amiko oe inona no tena manahirana anao",
	"Misy zavatra manahirana anao ve?"
];

exports.elizaFinals = [
	"Mandrampihaona indray ary. Dia mankasitraka fa nahafinaritra ny niresaka taminao",
// additions (not original)
	"Veloma indray ary. Tena nahafinaritra ahy ny niresaka taminao androany",
	"Manantena ny hiresaka aminao indray zah, amin'ny manaraka. mandrapiaona",
	"Tena nahafinaritra ny resakatsika teo, sa tsy izany? Indry anefa fa manampetra ny ora. Veloma indray ary.",
	"Manantena ny hiresaka aminay indray amin'ny manaraka?  Mandrampihaona."
];

exports.elizaQuits = [
	"okay",
	"veloma",
	"vita",
	"hivoaka",
	"hiala"
];

exports.elizaPres = [
	"tsy", "tsia",
	"tsy afaka", "tsiafaka",
	"tsy ho afaka", "tsy poince",
	"mahatadidy", "mahatsiaro",
	"mahatsiaro", "mitamberina ao antsaina",
	"nanofy", "nanofy",
	"nofy", "nofy",
	"mety ho", "ngamba",
	"tena marina izany", "ie izany tokoa",
	"solosaina", "ordinatera",
	"solosaina maro", "solosaina",
	"ordinateur maro", "solosaina",
	"were", "was",
	"ianao dia", "ianao",
	"zah", "izao dia",
	"mitovy", "sahala",
	"tsy samihafa", "sahala",
	"misy itovizana", "sahala"
];

exports.elizaPosts = [
	"dia", "dia",
	"anao", "ana",
	"aho", "anao",
	"ahy", "anao",
	"anao", "ahy",
	"za", "ianao",
	"ianao", "Izaho",
	"za", "ianao",
	"izaho dia", "ianao dia"
];

exports.elizaSynons = {
	"be": ["dia", "dia", "dia", "dia"],
	"belief": ["mahatsapa", "miheritreritra", "mino", "manantena"],
	"cannot": ["tsy afaka"],
	"desire": ["te", "mila"],
	"everyone": ["ny olo-drehetra", "tsy misy", "nizaniza"],
	"family": ["neny", "mama", "ray", "dada", "anabavy", "rahalahy", "vady", "zanaka", "zanako"],
	"happy": ["faly", "ravoravo", "miramirana","mirana"],
	"sad": ["tezitra", "tsy faly", "marary","ratsy","sorena","mamo","mamohy fo"],
    "no": ["tsia", "tsy izany"],
    "yes": ["izany mihintsy","marina izany","ie","ekeny","ekany"],
    "fuck": ["masosotay","masosotra","letie","aza atao an'io fa tsy","mandreraka"]
};

exports.elizaKeywords = [

	/*
	 Array of
	 ["<key>", <rank>, [
	 ["<decomp>", [
	 "<reasmb>",
	 "<reasmb>",
	 "<reasmb>"
	 ]],
	 ["<decomp>", [
	 "<reasmb>",
	 "<reasmb>",
	 "<reasmb>"
	 ]]
	 ]]
	 */

	["xnone", 0, [
		["*", [
			"Tsy sure zah oe azoko daholo izany.",
			"Tohizo iany azafady...",
			"Dia inona no ataon'izany anao?",
			"Tena te iresaka anzan ve inao?",
			"That is interesting.  Please continue.",
			"Ummmh, mahafinaritra kosa izany fa tohizo iany oe.",
			"Tsy mampaninona anao ve no miresaka an'izany?"
		]]
	]],
	["sorry", 0, [
		["*", [
			"Aza mialatsiny izany ianao.",
			"Tsisy tokony ialanao tsiny.",
			"Tsisy tsiny tompoko.",
			"Tsy mampaninona ahy izany fa tohizo iany..."
		]]
	]],
	["apologise", 0, [
		["*", [
			"goto sorry"
		]]
	]],
	["remember", 5, [
		["* tadidiko *", [
			"Ianao ve matetika miheritreritra an (2) ?",
			"Mety mampatsiahy anao zavatra ve ny miheritreritra an (2)?",
			"Inona ihany koa no tadidinao?",
			"Fa maninona ianao zao no mahatadidy an (2)?",
			"Fa inona amin'izao zavatra mitranga zao no nampatsiahy anao an (2) ?",
			"Fa inona kay no fifandraisanao sy i (2) ?",
			"Inona iany koa no tadidinao amin'i (2) ?"
		]],
		["* tadidinao ve *", [
			"Ianao ve mino fa mety ho adinoko i (2) ?",
			"Fa maninona ianao no miheritreritra oe tokony iantso an'i (2) zao?",
			"Inona amin'i (2) ?",
			"goto what",
			"Dia nasinao an'i (2) ?"
		]],
		["* tadidinao *", [
			"Ahoana no anadinoako an'i (2) ?",
			"Inona amin'i(2) noho tokony ho tadidiko?",
			"goto you"
		]]
	]],
	["forget", 5, [
		["* adinoko *", [
			"Hainao oe inona no adinonao (2) ?",
			"fa maninona no tsy tadidinao (2) ?",
			"Isakin'ny inona ianao no mahatsiaro an'i (2) ?",
			"Makarary anao ve ny manadino izany ?",
			"Makarary saina ve zany ?",
			"Ianao ve tena mpanadino ?",
			"Mino ve ianao fa ho afaka ao antsainao i (2) ?"
		]],
		["* nanadino *", [
			"Maninona ianao no manontany izany ?",
			"Tena ho resahanao amiko?",
			"Manahirana anao ve raha adinoko tanteraka i (2) ?",
			"Fa manino aho moa no atsiaro an'i (2) zao ?",
			"goto what",
			"Mba lazalazao amiko oe ny mahakasika an'i (2)."
		]]
	]],
	["if", 3, [
		["* raha *", [
			"Mino ve ianao fa mety ho (2) ?",
			"Manantena ve ianao fa (2) ?",
			"Inona no hainao mahakasika an (2) ?",
			"Izany ve, raha (2) ?",
			"Inona no ataonao raha (2) ?",
			"inona ary ny chance mba (2) ?",
			"inona no zavatra entin'izany ?"
		]]
	]],
	["dreamed", 4, [
		["* nanofy aho *", [
			"Izany ve, (2) ?",
			"(2) ianao ve rehefa taitra dia mba efa nandrevo ?",
			"(2) ianao ve mba efa nanofy?",
			"goto dream"
		]]
	]],
	["dream", 3, [
		["*", [
			"Fa inona no mba nolazain'ilay nofy taminao ?",
			"Manofy matetika nga ianao ?",
			"Iza no olona tao anaty nofinao ?",
			"Mino ve ianao fa ny nofy misy ifandraisany amin'ny olanao ?"
		]]
	]],
	["perhaps", 0, [
		["*", [
			"Oatran'ny tsy mino ianao .",
			"Fa maninona no tsy mino ianao ?",
			"afaka mba positive ve ianao ?",
			"Tsy mino ianao ?",
			"Tsy fantatrao ?",
			"firy ary ny probabilité heritreretinao ?"
		]]
	]],
	["name", 15, [
		["*", [
			"Tsy dia liana amin'ny anarana loatra aho.",
			"Efa nolazaiko taminao oe tsy dia tia miresaka anarana aho -- Tohizo le resaka azafady."
		]]
	]],
	["deutsch", 0, [
		["*", [
			"goto xforeign",
			"Efa noteneniko anao oe izaho tsy mahay Allemand."
		]]
	]],
	["francais", 0, [
		["*", [
			"goto xforeign",
			"Efa noteneniko anao oe izaho tsy mahay Français."
		]]
	]],
	["italiano", 0, [
		["*", [
			"goto xforeign",
			"Efa noteneniko anao oe izaho tsy mahay Italian."
		]]
	]],
	["espanol", 0, [
		["*", [
			"goto xforeign",
			"Efa noteneniko anao oe izaho tsy mahay espanol."
		]]
	]],
	["xforeign", 0, [
		["*", [
			"Malagasy ihany no aiko"
		]]
	]],
	["hello", 0, [
		["*", [
			"Inona no vaovao",
			"Manahoana."
		]]
	]],
	["computer", 50, [
		["*", [
			"Matahotra ordinateur ve ianao ?",
			"Fa maninona ianao no miresaka ordinateur ?",
			"Ianao ve tsy mino fa ny ordinateur afaka manampy anao amin'ny olanao ?",
			"Tsy mino ve ianao fa ny ordinateur afaka manampy olona ?",
			"Fa inona no atahoranao ordinateur ?",
			"Inona no eritreretinao amin'ny ordinateur ?",
			"Ianao izao tsy mino fa izaho miresaka aminao izaho dia ordinateur ?"
		]]
	]],
	["am", 0, [
		["* izaho ve *", [
			"Ianao ve mino fa ianao dia (2) ?",
			"Ianao ve te ho (2) ?",
			"Ianao ve mba te ho tenenina oe ianao dia (2) ?",
			"Inona no nitranga raha ianao (2) ?",
			"goto what"
		]],
		["* i am *", [
			"goto i"
		]],
		["*", [
			"fa maninona ianao no miteny oe 'am' ?",
			"I don't understand that."
		]]
	]],
	["are", 0, [
		["* ianao ve *", [
			"Fa inona no itiavana mahalala raha (2) izaho na tsia?",
			"Tinao ve raha mba tsy (2) izaho?",
			"Ngamb za (2) any an'eritreritrao any",
			"Ianao ve indraindray miheritreritra fa izaho (2) ?",
			"goto what",
			"Ilainao ve izany ?",
			"Inona no nitranga raha izaho no (2) ?"
		]],
		["* ianao dia *", [
			"goto you"
		]],
		["* are *", [
			"Nino ve iano fa zareo tsy (2) ?",
			"Tinao ve raha zareo tsy (2) ?",
			"Dia ahoana raha zareo tsy (2) ?",
			"Fa zareo ve (2) foana?",
			"Possible zareo (2).",
			"Ianao positive fa zareo (2) ?"
		]]
	]],
	["your", 0, [
		["* anao *", [
			"Inona no idiranao amin'ny (2)'ko ?",
			"Dia ahoana ny (2)'nao ?",
			"Matahotra ny (2)'ny hafa ve ianao?",
			"Izany ve,(2)'ko ?",
			"Inona no mahatonga anao miheritreritra ny (2)'ko ?",
			"Mila ny (2)'ko ve ianao ?"
		]]
	]],
	["was", 2, [
		["* was i *", [
			"Raha mba (2) ah?",
			"Ianao ve mino fa ianao dia (2) ?",
			"Ianao ve (2) ?",
			"Dia ahona raha mba (2) ianao ?",
			"Inona no etin'ny ' (2) ' anao?",
			"goto what"
		]],
		["* i was *", [
			"Ianao ve tena izany?",
			"Fa maninona ianao no milaza amiko fa ianao dia (2) zao ?",
			"Ngamba efa fantatro ianao fa (2)."
		]],
		["* was you *", [
			"Mino ve ianao fa 'zaho taloha dia (2) ?",
			"Inona no milaza fa 'zaho taloha (2) ?",
			"Inona no eritreretinao ?",
			"Ngamba zaho taloha (2).",
			"Nanahoana raha mba (2)'za taloha ?"
		]]
	]],
	["i", 0, [
		["* i @desire *", [
			"Midika inona aminao raha manana (3) ianao?",
			"Fa maninoa ianao no mila (3) ?",
			"Ndao ato oe hanana (3) ianao atsihoatsy.",
			"Dia ahoana raha tsy manana (3) mihintsy ianao?",
			"Midika inona aminao ny fananana (3)?",
			"Inona moa no hidiran'ny (3) amin'ny resatsika izao ?"
		]],
		["* i am* @sad *", [
			"Mialatsiny aho nohon'ny nandrenesako fa ianao dia (3).",
			"Mino ve ianao fa ny nandehananao aty dia hamampy ana fa tsy (3) ?",
			"Za mino fa tsy sangisangy ny (3).",
			"Afaka azavainao ve ny nahatonga anao (3) ?"
		]],
		["* i am* @happy *", [
			"Inona no hanampiako anao mba ho lasa  (3) ianao?",
			"fa ny traitement anao ve maha lasa (3) ?",
			"(3) inao teo fa naninona?",
			"Afaka lazainao ve hoe naninona ianao tampoka teo dia (3) ?"
		]],
		["* i was *", [
			"goto was"
		]],
		["* i @belief i *", [
			"Tena mino anzany ve ianao ?",
			"Fa ianao ary tsy mahatoly oe ianao (3).",
			"Ianao ve tena mihahiahy (3) ?"
		]],
		["* i* @belief *you *", [
			"goto you"
		]],
		["* i am *", [
			"Marina ve fa ny hiresahanao amiko dia satria ianao (2) ?",
			"Hafirina izay ianao no (2) ?",
			"Mino ve iano fa normal zany lasa (2) zany?",
			"Enao ve mba te ho lasa (2) ?",
			"Mafantantra olon-kafa (2) ve ianao?"
		]],
		["* i @cannot *", [
			"Hainao ve fa ianao dia tsy afaka (3) ?",
			"Mataotra nga ianao ?",
			"Ngamba tokony (3) ianao zao.",
			"Mino ve ianao fa tena afaka (3) ?",
			"Dia ahoana raha afaka (3) iano?"
		]],
		["* i don't *", [
			"Ianao ve tena tsy (2) ?",
			"Fa maninona ianao tsy mba (2) ?",
			"Ianao ve mantena mba  (2) ?",
			"Manankorotana anao ve izany ?"
		]],
		["* i feel *", [
			"Mba hilazalazao sentiments oe izaho",
			"Ianao ve matetika mahatsapa (2) ?",
			"Tia mahatsapa zavatra (2) ve ianao?",
			"inona no tsampanao amin'izany (2) izany ?"
		]],
		["* i * you *", [
			"Ngamba ianao mandrevo oe tsika miaraka (2)",
			"Tianao ve ny (2) ahy ?",
			"Ianao mila  (2) ahy.",
			"Ianao ve (2) olona hafa ?"
		]],
		["*", [
			"Hoy ianao oe (1) ?",
			"Mba afaka velabelarinao kely ve zany ?",
			"Hoy ianao oe (1) nohon'ny antony manokana ?",
			"Tena tsara izany."
		]]
	]],
	["you", 0, [
		["* you remind me of *", [
			"goto alike"
		]],
		["* you are *", [
			"What makes you think I am (2) ?",
			"Does it please you to believe I am (2) ?",
			"Do you sometimes wish you were (2) ?",
			"Perhaps you would like to be (2)."
		]],
		["* you* me *", [
			"Why do you think I (2) you ?",
			"You like to think I (2) you -- don't you ?",
			"What makes you think I (2) you ?",
			"Really, I (2) you ?",
			"Do you wish to believe I (2) you ?",
			"Suppose I did (2) you -- what would that mean ?",
			"Does someone else believe I (2) you ?"
		]],
		["* you *", [
			"We were discussing you -- not me.",
			"Oh, I (2) ?",
			"You're not really talking about me -- are you ?",
			"What are your feelings now ?"
		]]
	]],
	["yes", 0, [
		["*", [
			"You seem to be quite positive.",
			"You are sure.",
			"I see.",
			"I understand."
		]]
	]],
	["no", 0, [
		["* no one *", [
			"Are you sure, no one (2) ?",
			"Surely someone (2) .",
			"Can you think of anyone at all ?",
			"Are you thinking of a very special person ?",
			"Who, may I ask ?",
			"You have a particular person in mind, don't you ?",
			"Who do you think you are talking about ?"
		]],
		["*", [
			"Are you saying no just to be negative?",
			"You are being a bit negative.",
			"Why not ?",
			"Why 'no' ?"
		]]
	]],
	["my", 2, [
		["$ * my *", [
			"Does that have anything to do with the fact that your (2) ?",
			"Lets discuss further why your (2).",
			"Earlier you said your (2).",
			"But your (2)."
		]],
		["* my* @family *", [
			"Tell me more about your family.",
			"Who else in your family (4) ?",
			"Your (3) ?",
			"What else comes to your mind when you think of your (3) ?"
		]],
		["* my *", [
			"Your (2) ?",
			"Why do you say your (2) ?",
			"Does that suggest anything else which belongs to you ?",
			"Is it important to you that your (2) ?"
		]]
	]],
	["can", 0, [
		["* can you *", [
			"You believe I can (2) don't you ?",
			"goto what",
			"You want me to be able to (2).",
			"Perhaps you would like to be able to (2) yourself."
		]],
		["* can i *", [
			"Whether or not you can (2) depends on you more than on me.",
			"Do you want to be able to (2) ?",
			"Perhaps you don't want to (2).",
			"goto what"
		]]
	]],
	["what", 0, [
		["*", [
			"Why do you ask ?",
			"Does that question interest you ?",
			"What is it you really want to know ?",
			"Are such questions much on your mind ?",
			"What answer would please you most ?",
			"What do you think ?",
			"What comes to mind when you ask that ?",
			"Have you asked such questions before ?",
			"Have you asked anyone else ?"
		]]
	]],
	["who", 0, [
		["who *", [
			"goto what"
		]]
	]],
	["when", 0, [
		["when *", [
			"goto what"
		]]
	]],
	["where", 0, [
		["where *", [
			"goto what"
		]]
	]],
	["how", 0, [
		["how *", [
			"goto what"
		]]
	]],
	["because", 0, [
		["*", [
			"Is that the real reason ?",
			"Don't any other reasons come to mind ?",
			"Does that reason seem to explain anything else ?",
			"What other reasons might there be ?"
		]]
	]],
	["why", 0, [
		["* why don't you *", [
			"Do you believe I don't (2) ?",
			"Perhaps I will (2) in good time.",
			"Should you (2) yourself ?",
			"You want me to (2) ?",
			"goto what"
		]],
		["* why can't i *", [
			"Do you think you should be able to (2) ?",
			"Do you want to be able to (2) ?",
			"Do you believe this will help you to (2) ?",
			"Have you any idea why you can't (2) ?",
			"goto what"
		]],
		["*", [
			"goto what"
		]]
	]],
	["everyone", 2, [
		["* @everyone *", [
			"Really, (2) ?",
			"Surely not (2).",
			"Can you think of anyone in particular ?",
			"Who, for example?",
			"Are you thinking of a very special person ?",
			"Who, may I ask ?",
			"Someone special perhaps ?",
			"You have a particular person in mind, don't you ?",
			"Who do you think you're talking about ?"
		]]
	]],
	["everybody", 2, [
		["*", [
			"goto everyone"
		]]
	]],
	["nobody", 2, [
		["*", [
			"goto everyone"
		]]
	]],
	["noone", 2, [
		["*", [
			"goto everyone"
		]]
	]],
	["always", 1, [
		["*", [
			"Can you think of a specific example ?",
			"When ?",
			"What incident are you thinking of ?",
			"Really, always ?"
		]]
	]],
	["alike", 10, [
		["*", [
			"In what way ?",
			"What resemblence do you see ?",
			"What does that similarity suggest to you ?",
			"What other connections do you see ?",
			"What do you suppose that resemblence means ?",
			"What is the connection, do you suppose ?",
			"Could there really be some connection ?",
			"How ?"
		]]
	]],
	["like", 10, [
		["* @be *like *", [
			"goto alike"
		]]
	]],
	["different", 0, [
		["*", [
			"How is it different ?",
			"What differences do you see ?",
			"What does that difference suggest to you ?",
			"What other distinctions do you see ?",
			"What do you suppose that disparity means ?",
			"Could there be some connection, do you suppose ?",
			"How ?"
		]]
	]],
    ["fuck", 0, [
		["*", [
			"Does it make you feel strong to use that kind of language?",
            "Are you venting your feelings now?",
            "Are you angry?",
            "Does this topic make you feel angry?",
            "Is something making you feel angry?",
            "Does using that kind of language make you feel better?"
		]]
	]]

];

// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
exports.elizaPostTransforms = [
	/ old old/g, " old",
	/\bthey were( not)? me\b/g, "it was$1 me",
	/\bthey are( not)? me\b/g, "it is$1 me",
	/Are they( always)? me\b/, "it is$1 me",
	/\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
	/\bI to have (\w+)/, "I have $1",
	/Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];

// eof