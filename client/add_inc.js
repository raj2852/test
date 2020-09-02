Template.add_inc.helpers({
  users:function(){
    return Meteor.users.find();
  },
  tableId: function(){
    return Session.get("tableId");  
  },

  table: function(){
    var table = Session.get("current_table"); 
    if (!table || !table.state){
      table = {
        state: 'created'
      }
    }
    console.log(JSON.stringify(table)); 
    return table; 
  },


  isRunning: function(){
    var table = Session.get("current_table");  
    if (table && table.state == 'running'){
      return true; 
    } else {
      return false; 
    }
  },

  isUserInTable: function(userId){
    var table = Session.get("current_table");
    var userIds = table.players;
    //console.log(userIds);
    for(var i = 0; i<userIds.length; i++){
      if(userIds[i] == userId){
        return true; 
      }
      
    }
    return false; 
  },

  getDate: function(tableDate){
    return  getDate2(tableDate);
    // var time = tableDate.toLocaleTimeString().toLowerCase();
    // var day = $.datepicker.formatDate("dd/mm/yy", tableDate); 
    // return  day + " " + time;
  },

  inc_points:function(userId){
    var table = Session.get("current_table");
    var userIds = table.players;
    var inc_points = [];
    console.log(userIds);
    for(var i = 0; i<6; i++){
      inc_points.push({
        player: userId,
        value: i
      });
    }
    
    return inc_points; 
  },

  getIncValue: function(userId){
    var currentPlateId = Session.get("currentPlateId");
    var plate = null;

    if (Session.get("currentPlate") != null){
      plate = Session.get("currentPlate"); 
    } else {
      plate = Plates.findOne({_id:currentPlateId}); 
      Session.set("currentPlate", plate); 
    }

    var result = 0; 
    if (plate != null){
        if (plate.incs != null && plate.incs.length > 0 ){
            for(var i=0; i< plate.incs.length; i++){
                if(plate.incs[i].player == userId){
                    result = plate.incs[i].value;
                }
            }
        } 
    } 
    return result; 
  },

  getClass: function(userId){
      var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId}); 

      var result = false; 
      if(table && table.players){
          for(var i=0; i< table.players.length; i++){
          if (table.players[i] == userId){
            result = true; 
          }
        }
      }      
      console.log('getClass result:' + result);
      return result?'table-user-selected':'table-user-unselected'; 
  },
  getYear: function(){
    return Session.get("year");
  }
});

Template.add_inc.events({
  
 /*  "click .js-start-table": function (event) {
    event.preventDefault();
    var tableId = Session.get("tableId"); 
    var table = Tables.findOne({_id:tableId}); 
    table.state = "running"; 
    Meteor.call("updateTable", table);
    Session.set("current_table", table); 
    Router.go('/current_table/' + tableId);    
  },
  "click .js-remove-table": function () {
    var r = confirm("sei sicuro di rimuovere il tavolo?");
    if (r == true) {
       var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId}); 
      table.active = false; 
      Meteor.call("updateTable", table);
    } else {
        return;
    }
   
    
  },*/

  "click .js-inc-point": function () {

    var plate = Session.get("currentPlate"); 
   
    console.log(plate);
    if (plate != null){
        if (plate.incs != null && plate.incs != undefined){
            var count = 0;
            if(plate.incs.length > 0 ){                 
                for(var i=0; i< plate.incs.length; i++){
                  if(plate.incs[i].player == this.player){
                      plate.incs[i].value = this.value;
                      count++;
                  }
              }               
            } 
            if (count == 0){
                plate.incs.push({
                  player: this.player,
                  value: this.value
                });
              }
        } else {
          var incs = [
            {
              player: this.player,
              value: this.value
            }
          ];
          plate.incs = incs; 
        }
    } 
    Session.set("currentPlate",plate);
  },

 "click .js-confirm-inc": function () {
    console.log("UPDATE PLATE");
    var plate = Session.get("currentPlate"); 
    console.log(plate);
    Meteor.call("updatePlate", plate, function(res){
      Session.set("currentPlate",null); 
      Router.go('/table_hands');
    });
    
  }
});