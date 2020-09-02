Template.telesina_winners.helpers({
  activeTable: function(){
    return Session.get("tableId"); 
  },

  getClass: function(userId){
      var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId}); 

      var result = false; 
      for(var i=0; i< table.players.length; i++){
        if (table.players[i] == userId){
          result = true; 
        }
      }
      //console.log('getClass result:' + result);
      return result?'table-user-selected':'table-user-unselected'; 
  },
  winners: function(){
      var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId}); 

      var telesina_plate = Session.get("telesina_plate"); 

      return telesina_plate.winners;
      
  },
  players: function(){

    var players = []; 

     var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId});
      var usersId = table.players; 

      var users = Meteor.users.find( {"_id": { "$in": usersId }}).fetch();
      var plates = Plates.find({table: tableId}).fetch();

      players = getPlayersWithPoints(users, plates);

    /*if (!Session.get("players")){
      var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId});
      var usersId = table.players; 
      var users = Meteor.users.find( {"_id": { "$in": usersId }}).fetch();
   
      console.log(users); 
      var plates = Plates.find({table: tableId}).fetch();
      console.log(plates); 
      
      for (var i = 0; i<users.length; i++){
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
      }
      console.log(players); 
    } else {
      players = Session.get("players"); 
    }*/
    return players; 
  },
  telesina: function(){
    /*var telesina_plate = Session.get("telesina_plate"); 
    var telesina; 
    for (var i=0; i<telesine.length; i++){
      if (telesine[i].id == telesina_plate.type_code){
        telesina = telesine[i]; 
      }
    }
    return telesina; */
    return Session.get("current_telesina");
  }
});


Template.telesina_winners.events({

  "click .js-close-table": function () {

    /*console.log(this); 
    alert("close table"); */
    console.log("current_table IN"); 
    var tableId = Session.get("tableId"); 
    var table = Tables.findOne({_id:tableId});
    table.state = "closed"; 
    Meteor.call("updateTable", table);
    Session.set("current_table", table); 
    console.log("current_table OUT"); 
    Router.go('/active_tables');
  },

   "click .js-toggle-add-winner": function (event) {


    var telesina_plate = Session.get("telesina_plate"); 
    var current_telesina = Session.get("current_telesina"); 

    if (telesina_plate.winners != null && telesina_plate.winners.length < current_telesina.plates){

        var userId = event.currentTarget.getAttribute('data-id');
        //console.log(telesina_plate);
        //console.log(userId);
        var user = Meteor.users.findOne( {"_id": userId});
        //alert(JSON.stringify(user)); 

        var winner = {
          user: user,
          hand: hands[0]
        }

        telesina_plate.winners.push(winner); 
        Session.set("telesina_plate", telesina_plate); 
    } else {
        alert("max number of winner: " + current_telesina.plates); 
    }


    

    /*var tableId = Session.get("tableId"); 
    var table = Tables.findOne({_id:tableId}); 
   
    var index = table.players.indexOf(this._id);
    //console.log("player index:" + index); 
    if (index < 0){
      //add
      table.players.push(this._id); 
    } else {
      //remove
      table.players.splice(index, 1);
    }
    //console.log(table); 
    Meteor.call("updateTable", table);
    //alert("click" + this._id); */
  },

  "click .js-remove-winner": function (event) {
    
    var userId = event.currentTarget.getAttribute('data-id');
    //alert(userId); 
    var telesina_plate = Session.get("telesina_plate"); 

    console.log(telesina_plate.winners); 
    for(var i=0; i<telesina_plate.winners.length; i++){
        console.log("userId: " + userId); 
        console.log("id:" + telesina_plate.winners[i]._id); 
        if(telesina_plate.winners[i].user._id == userId){
          telesina_plate.winners.splice(i,1); 
          console.log(telesina_plate.winners); 
          break; 
        }        
    } 

    Session.set("telesina_plate", telesina_plate); 
    
    
  },
  
  "click .js-confirm-plate": function (event) {

    event.preventDefault();
    var telesina_plate = Session.get("telesina_plate"); 
    var current_telesina = Session.get("current_telesina"); 

    if ((telesina_plate.winners != null) && (telesina_plate.winners.length == current_telesina.plates)){
      Meteor.call("addPlate", telesina_plate);

      var tableId = Session.get("tableId"); 

      var users = Meteor.users.find().fetch();
      //console.log(users); 
      var plates = Plates.find({table: tableId}).fetch();

      Session.set("table_hands",plates); 

      console.log(plates); 
      var players = []; 
      for (var i = 0; i<users.length; i++){
        var points = 0; 
        var player = users[i];

        for(var j=0; j<plates.length; j++){
          for(var k=0; (plates[j].winners) && (k<plates[j].winners.length); k++){
            if(plates[j].winners[k].user != null && plates[j].winners[k].user != undefined){
              if(plates[j].winners[k].user._id == player._id){
                points++; 
              }
            }        
          }
        }
        player.points = points; 
        players.push(player); 
      }

      Session.set("player",players); 
      console.log("PRIMA DI  METODO"); 
      Router.go('/current_table');

      console.log("FINE METODO"); 

    } else {
        alert("Numero sbagliato di vincitori, richiesti: " + current_telesina.plates); 
    }

    
  }

});