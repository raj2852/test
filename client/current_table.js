Template.current_table.helpers({
  activeTable: function(){
    return Session.get("tableId"); 
  },

  /*users:function(){
    return Meteor.users.find();
  },*/
  isRunning: function(){
    var tableId = Session.get("tableId"); 
    var table = Tables.findOne({_id:tableId});
    if (table && table.state == 'running'){
      return true; 
    } else {
      return false; 
    }
  },
  players: function(){

    var players = []; 
    if (!Session.get("players")){

      var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId});
      var usersId = table.players; 

      var users = Meteor.users.find( {"_id": { "$in": usersId }}).fetch();
   

      //console.log(users); 
      var plates = Plates.find({table: tableId}).fetch();
      //console.log(plates); 
      
      players = getPlayersWithPoints(users, plates);


      /*for (var i = 0; i<users.length; i++){
        // console.log('user:' + i); 
        var points = 0; 
        var player = users[i];
        for(var j=0; j<plates.length; j++){
          // console.log('plate:' + j); 
          for(var k=0; k<plates[j].winners.length; k++){
            // console.log('winner:' + k); 
            //points++; 
            if(plates[j].winners[k].user != null && plates[j].winners[k].user != undefined){
              if(plates[j].winners[k].user._id == player._id){
                points++; 
              }
            }            
          }
        }
        player.points = points; 
        players.push(player); 
      }*/
      console.log(players); 

    } else {
      players = Session.get("players"); 
    }
    return players; 
  }
});


Template.current_table.events({

  "click .js-close-table": function () {

    var r = confirm("Are you sure to close the table?");
    if (r == true) {
        /*console.log(this); 
      alert("close table"); */
      //console.log("current_table IN"); 
      var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId});
      table.state = "closed"; 
      Meteor.call("updateTable", table);
      Session.set("current_table", table); 
      //console.log("current_table OUT"); 
      if(Session.get("year")!=null){
        Router.go('/active_tables/' + Session.get("year"));
      } else {
        Router.go('/active_tables');
      }
      
    } else {
        return;
    }


    
  },

  "click .js-remove-table": function () {
    var r = confirm("sei sicuro di rimuovere il tavolo?");
    if (r == true) {
       var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId}); 
      table.active = false; 
      Meteor.call("updateTable", table, function(){
        Router.go('/active_tables/' + Session.get("year")); 
      });
    } else {
        return;
    }
  },

  //TODO: eliminare uno dei due metodi seguenti e unificare parametrizzando

  "click .js-add-piattoparol": function () {      
      
      //console.log("VIEW WINNER" + this.params._id);
      event.preventDefault();
      var tableId = Session.get("tableId"); 
      
      var plate = {
        table: tableId, 
        type:3,
        winners:null,
        creator: Meteor.userId()
      }  

      Meteor.call("addPlate", plate);

      var users = Meteor.users.find().fetch();
      //console.log(users); 
      var plates = Plates.find({table: tableId}).fetch();

      Session.set("table_hands",plates); 

      console.log(plates); 
      var players = []; 

      players = getPlayersWithPoints(users, plates);
      Session.set("player",players); 
      Router.go('/current_table');
  },
  "click .js-add-piattononaperto": function () {      
      
      //console.log("VIEW WINNER" + this.params._id);
      event.preventDefault();
      var tableId = Session.get("tableId"); 
      
      var plate = {
        table: tableId, 
        type:4,
        winners:null,
        creator: Meteor.userId()
      }  

      Meteor.call("addPlate", plate);

      var users = Meteor.users.find().fetch();
      //console.log(users); 
      var plates = Plates.find({table: tableId}).fetch();

      Session.set("table_hands",plates); 

      console.log(plates); 
      var players = []; 

      players = getPlayersWithPoints(users, plates);
      Session.set("player",players); 
      Router.go('/current_table');
  }
});