Meteor.startup(function () {
    if (!Meteor.users.findOne()){
      for (var i=0;i<default_users.length;i++){
        var email = default_users[i].email;
        var username = default_users[i].username;
        var avatar = default_users[i].avatar;
        console.log("creating a user with password 'test123' and username/ email: "+email);
        Meteor.users.insert({profile:{username:username, avatar:avatar}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      }


      var players =  Meteor.users.find( {"profile.username": { "$in": ["bigblind","theking","maestroyota","sirmikthequick"] }}).fetch();

      var arrPlayers = [];
      for(var i=0; i<players.length; i++){
          arrPlayers.push(players[i]._id); 
      }

      console.log("arrPlayers: " +  JSON.stringify(arrPlayers)); 

      if(!Tables.findOne()){
        Tables.insert({
          "creator" : "sbaXB4xHfK6GavuiR",
          "date" : new Date("January 11, 2017 22:18:00"),
          "players" : arrPlayers,
          "state" : "running",
          "active" : true
        });
      }      
    } 
  });


 Meteor.methods({
  
  
  royal_hands2: function(){
      var rh = Plates.aggregate([{$lookup:{from:"tables",localField:"table",foreignField:"_id",as:"table_info"}},{$unwind:"$table_info"},{$match:{$and:[{"table_info.active":true}]}},{$sort:{"winners.hand.value":-1,"winners.point_height.value":-1,"date":1}},{$limit:10}]);
      //var plates = Plates.find({},{sort:{"winners.hand.value":-1,"winners.point_height.value":-1, "date":1},limit:10}).fetch();

      console.log(rh);
      return rh;

    }

})