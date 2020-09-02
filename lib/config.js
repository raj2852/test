Points = new Mongo.Collection("points");
Plates = new Mongo.Collection("plates"); 
Tables = new Mongo.Collection("tables"); 

labels={
	app_title: "PAG Tournament"
};

hands=[
	{
		id: 0,
		name: "carta più alta",
		img: "niente_punto.png",
		type: 'HI',
		value: 1
	},
	{
		id: 1,
		name: "coppia",
		img: "coppia.png",
		type: 'HI',
		value: 2
	},
	{
		id: 2,
		name: "doppia coppia",
		img: "doppia_coppia.png",
		type: 'HI',
		value: 3
	},
	{
		id: 3,
		name: "tris",
		img: "tris.png",
		type: 'HI',
		value: 4
	},
	{
		id: 4,
		name: "scala",
		img: "scala.png",
		type: 'HI',
		value: 5
	},
	{
		id: 5,
		name: "full",
		img: "full.png",
		type: 'HI',
		value: 6
	},
	{
		id: 6,
		name: "colore",
		img: "colore.png",
		type: 'CO',
		value: 7
	},
	{
		id: 7,
		name: "poker",
		img: "poker.png",
		type: 'HI',
		value: 8
	},
	{
		id: 8,
		name: "scala reale",
		img: "scala_reale.png",
		type: 'CO-HI',
		value: 9
	},
	{
		id: 9,
		name: "non visto",
		img: "non_visto.png",
		type: 'NV',
		value: 0
	}
];

point_heights=[
/*	{
		id: 0,
		name: "two",
		img: "2_P.png",
		value: 2
	},
	{
		id: 1,
		name: "three",
		img: "3_P.png",
		value: 3
	},
	{
		id: 2,
		name: "four",
		img: "4_P.png",
		value: 4
	},
	{
		id: 3,
		name: "five",
		img: "5_P.png",
		value: 5
	},*/
	{
		id: 4,
		name: "sei",
		img: "6_P.png",
		value: 6
	},
	{
		id: 5,
		name: "sette",
		img: "7_P.png",
		value: 7
	},
	{
		id: 6,
		name: "otto",
		img: "8_P.png",
		value: 8
	},
	{
		id: 7,
		name: "nove",
		img: "9_P.png",
		value: 9
	},
	{
		id: 8,
		name: "dieci",
		img: "10_P.png",
		value: 10
	},
	{
		id: 9,
		name: "jack",
		img: "11_P.png",
		value: 11
	},
	{
		id: 10,
		name: "donna",
		img: "12_P.png",
		value: 12
	},
	{
		id: 11,
		name: "re",
		img: "13_P.png",
		value: 13
	},
	{
		id: 12,
		name: "asso",
		img: "1_P.png",
		value: 14
	}
];

suits=[
	{
		id: 0,
		name: "picche",
		img: "colore_picche.gif",
		value: 1
	},
	{
		id: 1,
		name: "fiori",
		img: "colore_fiori.gif",
		value: 2
	},
	{
		id: 2,
		name: "quadri",
		img: "colore_quadri.gif",
		value: 3
	},
	{
		id: 3,
		name: "cuori",
		img: "colore_cuori.gif",
		value: 4
	}
];

telesine=[
	{
		id: 0,
		name: "piramide",
		code: "PI",
		img: "piramide.jpg",
		plates: 2
	},
	{
		id: 1,
		name: "niagara",
		code: "NI",
		img: "niagara.jpg",
		plates: 2
	},
	{
		id: 2,
		name: "brivido",
		code: "BR",
		img: "brivido.jpg",
		plates: 1
	},
	{
		id: 3,
		name: "xyz",
		code: "XYZ",
		img: "xyz.png",
		plates: 3
	},
	{
		id: 4,
		name: "quattroP",
		code: "4P",
		img: "quattrop.jpg",
		plates: 4
	},
	{
		id: 5,
		name: "leccatombe",
		code: "LT",
		img: "leccatombe.jpg",
		plates: 1
	}
];

session_years=[
	{
		year: "2017",
		start: new Date("2016-12-31T00:00:00.000z"),
		end: new Date("2018-01-15T00:00:00.000z")
	},
	{
		year: "2018",
		start: new Date("2018-01-15T00:00:00.000z"),
		end: new Date("2018-12-31T00:00:00.000z")
	}
]


default_users=[
	{
		email: "bigblind@test.com",
		username: "bigblind",
		avatar: "bigblind.jpg"
	},
	{
		email: "decimomeridio@test.com",
		username: "decimomeridio",
		avatar: "decimomeridio.jpg"
	},
	{
		email: "blackhole@test.com",
		username: "blackhole",
		avatar: "blackhole.jpg"
	},
	{
		email: "maestroyota@test.com",
		username: "maestroyota",
		avatar: "maestroyota.jpg"
	},
	{
		email: "sirmikthequick@test.com",
		username: "sirmikthequick",
		avatar: "sirmikthequick.jpg"
	},
	{
		email: "terminator@test.com",
		username: "terminator",
		avatar: "terminator.jpg"
	},
	{
		email: "maverick@test.com",
		username: "maverick",
		avatar: "maverick.jpg"
	},
	{
		email: "theking@test.com",
		username: "theking",
		avatar: "theking.jpg"
	},
	{
		email: "kingalmiron@test.com",
		username: "kingalmiron",
		avatar: "kingalmiron.jpg"
	},
	{
		email: "fireace@test.com",
		username: "fireace",
		avatar: "fireace.jpg"
	},
	{
		email: "paythedevil@test.com",
		username: "paythedevil",
		avatar: "paythedevil.jpg"
	},
	{
		email: "morto@test.com",
		username: "morto",
		avatar: "morto.jpg"
	}
];