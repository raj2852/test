Template.active_tables.helpers({
  activeTables:function(userId){
    console.log("year:" + Session.get("year"));
    var tables;

    var yearLimit = null; 
    if (Session.get("year") != null){
      yearLimit = getSessionYearLimits(Session.get("year"));
    }

    if (yearLimit != null){
      if(!Session.get(tables)){
        tables  = Tables.find({active:true,
        "date":{
          "$gt": yearLimit.start,
          "$lt": yearLimit.end

      }}, {sort: {date: -1}}).fetch();
        Session.set("active_tables", tables); 
      }        
    } else { //non filtro per data
      if(!Session.get(tables)){
        tables  = Tables.find({active:true}, {sort: {date: -1}}).fetch();
        Session.set("active_tables", tables); 
      }       
    }
    
    return Session.get("active_tables");
  },

  numberOfPlayers: function(tableId){
    var table = Tables.findOne({_id:tableId}); 
    return table.players.length; 
  },

  numberOfHands: function(tableId){
    //console.log("number of hands");
    //console.log(tableId);  
    var plates = Plates.find({table:tableId}).fetch(); 
    //console.log(plates); 
    return plates.length; 
  },

  hands:function(tableId){
    //var hands = Session.get("table_hands"); 
    var hands = Plates.find({table: tableId}).fetch();
    
    return hands; 
  },

isStud: function(hand, point_height){
    var result = false;
    if (hand.value > 6 || ((hand.value==6) && (point_height.value > 10))){
      result = true; 
    } 
    return result; 
  },

  plateTypeName: function(type){
    var result = false;
    if (type==3){
      result = "piatto parol"; 
    } else if(type==4){
      result = "non aperto"; 
    }
    return result; 
  },



  player_name: function(userId){    
      var user = Meteor.users.findOne({_id: userId});
      var username = user.profile.username;

   
    return username;  
  },
  players_names: function(tableId){
    var table = Tables.findOne({_id:tableId}); 
    var result = "";
    for  (var i=0; i<table.players.length; i++){

      var user = Meteor.users.findOne({_id: table.players[i]});
      var username = user.profile.username;

      result += username + " ";
    }
    return result;  
  },

  players: function(tableId){
    var table = Tables.findOne({_id:tableId}); 
    var players = [];
    for  (var i=0; i<table.players.length; i++){
      var user = Meteor.users.findOne({_id: table.players[i]});
      players.push(user); 
    }
    //console.log(players); 
    return players;  
  },

  getDate: function(handsDate){
    
    return  getDate2(handsDate);
  }
  /*getDate: function(tableDate){
    var time = tableDate.toLocaleTimeString().toLowerCase();
    var day = $.datepicker.formatDate("dd/mm/yy", tableDate); 
    return  day + " " + time;
  }*/
});