Template.point_heights.helpers({
  point_heights:function(){
    return point_heights;
  }
});

Template.point_heights.events({

  "click .js-set-point": function (event) {
      
      //console.log("VIEW WINNER" + this.params._id);
      event.preventDefault();
      var tableId = Session.get("tableId"); 

      var pointId = event.currentTarget.getAttribute('data-id');
      var point_height; 
      for (var i=0; i<point_heights.length; i++){
        if(point_heights[i].id==pointId){
          point_height = point_heights[i]; 

        }
      }

      var winner =  {
        user: Session.get("userWinner"),
        hand: Session.get("hand"),
        point_suit: Session.get("suit"),
        point_height: point_height
      }

      Session.set("winner", winner); 
      
      //console.log(winner);
      
      var plate = {
        table: tableId, 
        type:1,
        winners:[winner],
        creator:Meteor.userId()
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