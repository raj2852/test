Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  console.log("rendering home /");
  this.render("navbar", {to:"header"});
  this.render("landing_page", {to:"main"});
});


Router.route('/play', function () {
  console.log("play");
  
  if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
      //if user logged and user is in active table go to table
      //if user logged and user is not in table go to create new table
      var tables  = Tables.find({active:true}).fetch();

      if (tables != null && tables.length > 0){
          console.log("tables: " + tables.length); 
          Session.set("active_tables", tables); 
          for (var i = 0; i<tables.length; i++){
              for (var j=0; j<tables[i].players.length; j++){
                // console.log("tables: i " + i + " J: " + j); 
                if (tables[i].players[j] == Meteor.userId()){ //user is in running table
                    if (tables[i].state == 'running'){
                        Session.set("tableId", tables[i]._id); 
                        Session.set("current_table", tables[i]); 
                        this.render("navbar", {to:"header"});
                        this.render("current_table", {to:"main"});
                        return; 
                    } else if (tables[i].state == 'created'){
                        Session.set("current_table", tables[i]); 
                        this.render("navbar", {to:"header"});
                        this.render("edit_table", {to:"main"});
                        return; 
                    }
                 }  
              }              
          }

          this.render("navbar", {to:"header"});
          this.render("active_tables", {to:"main"});
           return; 
      }
  }
});


Router.route('/rankings', function () {
  if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
    Session.set("year", null); 
      console.log("rankings");

    this.render("navbar", {to:"header"});
    this.render("rankings", {to:"main"});

  }
  
});

Router.route('/rankings/:_year', function () {
  if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
    Session.set("year", this.params._year); 
      console.log("rankings");

    this.render("navbar", {to:"header"});
    this.render("rankings", {to:"main"});

  }
  
});

/*Router.route('/rankings_by_date', function () {
  if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
      console.log("rankings_by_date");
    this.render("navbar", {to:"header"});
    this.render("rankings_by_date", {to:"main"});
  }
  
});*/

Router.route('/active_tables', function () {
	if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
    Session.set("year", null); 
  	  console.log("active tables");
	  this.render("navbar", {to:"header"});
	  this.render("active_tables", {to:"main"});
  }
  
});

Router.route('/active_tables/:_year', function () {
  if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
    Session.set("year", this.params._year); 
      console.log("active tables");
    this.render("navbar", {to:"header"});
    this.render("active_tables", {to:"main"});
  }
  
});

Router.route('/add_inc/:_id', function () {
  if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
    console.log("add_inc tables");
    Session.set("currentPlateId", this.params._id)
    Session.set("currentPlate",null);
    this.render("navbar", {to:"header"});
    this.render("add_inc", {to:"main"});
  }
  
});

Router.route('/edit_table/:_id', function () {
  
	if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {

  	var tableId; 
	  if (this.params._id == "new"){

	    var newTable = {
	      creator: Meteor.userId(),
	      date: new Date(),
	      players: [],
	      state: "created",
	      active: true
	    };    

	    tableId = Meteor.call("addTable", newTable ,function(err, res){
	      if (!err){// all good
	        //console.log("event callback received id: " + res);
	        Session.set("tableId", res);   
	        var tables  = Tables.find({active:true}).fetch();
	        Session.set("active_tables", tables); 
	        var currentTable  = Tables.findOne({_id:tableId});
	  		Session.set("current_table", currentTable); 
	      }
	    }); 

	  } else {
	    //var tableId = this.params._id; 
      tableId = this.params._id;
	    Session.set("tableId", tableId);  
	  
	  }
	  var currentTable  = Tables.findOne({_id:tableId});
	  Session.set("current_table", currentTable); 

    var tablePlates = Plates.find({table: tableId}).fetch();

    if(tablePlates != null && tablePlates.length > 0){
      Router.go('/current_table/' + tableId);
      // this.render("navbar", {to:"header"});
      // this.render("current_table", {to:"main"});
    } else {

    this.render("navbar", {to:"header"});
    this.render("edit_table", {to:"main"});
    }


  }
});

Router.route('/current_table/:_id', function () {
  console.log("current table: " + this.params._id);

  Session.set("tableId", this.params._id); 

  var tableId = Session.get("tableId"); 
  var table = Tables.findOne({_id:tableId});
  Session.set("current_table", table); 
  //table.state = "running"; 
  //Meteor.call("updateTable", table);

  this.render("navbar", {to:"header"});
  this.render("current_table", {to:"main"});
});


Router.route('/current_table', function () {

  if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {
    if (!Session.get("tableId")){
      console.log("current table: " + this.params._id);
      this.render("navbar", {to:"header"});
      this.render("active_tables", {to:"main"});
    } else {

      this.render("navbar", {to:"header"});
      this.render("current_table", {to:"main"});
    }

    
  }






  
});



Router.route('/hands_list/:_id', function () {
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    var winnerUserId = this.params._id;
    var winner = Meteor.users.findOne({_id:winnerUserId});
    Session.set("userWinner",  winner);   
    console.log("hands list " + winnerUserId);
    this.render("navbar", {to:"header"});
    this.render("hands_list", {to:"main"});
  });

Router.route('/table_hands', function () {
  console.log("table hands");
  this.render("navbar", {to:"header"});
  this.render("table_hands", {to:"main"});
});

Router.route('/point_height/:_id', function () {
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    var handId = this.params._id;
    
    var  hand; 
    for (var i=0; i<hands.length; i++){
      if(hands[i].id==handId){
        hand = hands[i]; 

      }
    }

    Session.set("hand", hand)
    console.log("point height " + hand);
    this.render("navbar", {to:"header"});
    this.render("point_heights", {to:"main"});
  });


Router.route('/suits_list/:_id', function () {
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    var handId = this.params._id;
    
    var  hand; 
    for (var i=0; i<hands.length; i++){
      if(hands[i].id==handId){
        hand = hands[i]; 
      }
    }
    Session.set("hand", hand)
    
    this.render("navbar", {to:"header"});
    this.render("suits_list", {to:"main"});
  });



  Router.route('/point_color_height/:_id', function () {
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    var colorId = this.params._id;
    
    var  suit; 
    for (var i=0; i<suits.length; i++){
      if(suits[i].id==colorId){
        suit = suits[i]; 
      }
    }

    Session.set("suit", suit)
    console.log("suit" + suit);
    this.render("navbar", {to:"header"});
    this.render("point_heights", {to:"main"});
  });

Router.route('/telesina_list', function () {
  console.log("telesina list");
  this.render("navbar", {to:"header"});
  this.render("telesina_list", {to:"main"});
});

Router.route('/telesina_winners/:_id', function () {
  console.log("telesina winners");

  var tableId = Session.get("tableId");
  var telesinaId = this.params._id;


  /*var winner =  {
        user: Session.get("userWinner"),
        hand: Session.get("hand"),
        point_suit: Session.get("suit")
      }*/

  var plate = {
        table: tableId, 
        type:2,
        type_code: telesinaId,
        winners:[],
        creator:Meteor.userId()
  }  

  Session.set("telesina_plate", plate); 


  var telesina; 
  for (var i=0; i<telesine.length; i++){
    if (telesine[i].id == plate.type_code){
      telesina = telesine[i]; 
    }
  }

  Session.set("current_telesina", telesina); 


  this.render("navbar", {to:"header"});
  this.render("telesina_winners", {to:"main"});
});