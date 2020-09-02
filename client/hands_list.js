Template.hands_list.helpers({
  userWinner:function(){

    
    return Session.get("userWinner"); 
  },
 
  hands:function(){

    //objs.sort(function(a,b) {return (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0);} ); 

    return hands.sort(function(a,b) {return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);} );
  },

  isPointHi: function(id){
    
    for(var i=0; i<hands.length; i++){
      if((hands[i].id == id) && (hands[i].type=='HI')){
        return true; 
      }      
    }
    return false; 
  },
  isPointCo: function(id){
    for(var i=0; i<hands.length; i++){
      if((hands[i].id == id) && (hands[i].type=='CO')){
        return true; 
      }      
    }
    return false; 
  },
  isPointNv: function(id){
    for(var i=0; i<hands.length; i++){
      if((hands[i].id == id) && (hands[i].type=='NV')){
        return true; 
      }      
    }
    return false; 
  }
});


Template.hands_list.events({

  "click .js-set-point": function (event) {

      event.preventDefault();
      var tableId = Session.get("tableId"); 

      var handId = event.currentTarget.getAttribute('data-id');
    
      var  hand; 
      for (var i=0; i<hands.length; i++){
        if(hands[i].id==handId){
          hand = hands[i]; 
        }
      }
      
      var winner =  {
        user: Session.get("userWinner"),
        hand: hand
      }

      Session.set("winner", winner); 
      
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

Template.hands_list.onRendered(function() {

      if(Session.get("userWinner")){
        
        var sound = document.getElementById("audio2");
        var src = "/music/" + Session.get("userWinner").profile.username + ".wav";           
        sound.src = src;
        sound.load();
        sound.play();
      }
          

  });