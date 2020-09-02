Template.table_hands.helpers({
  activeTable: function(){
    return Session.get("tableId"); 
  },
  hands:function(){
    //var hands = Session.get("table_hands"); 
    var hands = Plates.find({table: Session.get("tableId")}).fetch();
    console.log("SESSION HANDS"); 
    console.log(hands); 

    /*for (var i=0; i<hands.length; i++){
      console.log(JSON.stringify(hands[i])); 
    }*/

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
  }
});
Template.table_hands.events({

  "click .js-remove-table-hand": function (event) {
    var plateId = event.currentTarget.getAttribute('data-id');
    console.log(event.currentTarget.getAttribute('data-id')); 

    Meteor.call("removePlate", plateId, function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      
      var tableId = Session.get("tableId"); 
      var plates = Plates.find({table: tableId}).fetch();
      Session.set("table_hands",plates); 

    });   

    
  },
  "click .js-add-inc": function (event) {
    var plateId = event.currentTarget.getAttribute('data-id');
    
    Router.go('/add_inc/' + plateId);
    
  }
});