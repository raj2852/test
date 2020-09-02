Template.suits_list.helpers({
  table:function(){
     var tableId = Session.get("tableId"); 
     var table = Tables.findOne({_id:tableId});
     return table; 
  },

  suits:function(){ 
    console.log(JSON.stringify(suits)); 
    return suits;
  },

  isPointCo: function(){
    var hand = Session.get("hand");
   
      if(hand.type=='CO'){
        return true; 
      }  else {
        return false; 
      }
    
  }
});