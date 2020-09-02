Template.edit_table.helpers({
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

  getDate: function(tableDate){
    return  getDate2(tableDate);
    // var time = tableDate.toLocaleTimeString().toLowerCase();
    // var day = $.datepicker.formatDate("dd/mm/yy", tableDate); 
    // return  day + " " + time;
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

Template.edit_table.events({
  
   "click .js-start-table": function (event) {
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
      Meteor.call("updateTable", table, function(){
        Router.go('/active_tables/' + Session.get("year")); 
      });
    } else {
        return;
    }


   
    
  },

 "click .js-toggle-select-user": function () {
    var tableId = Session.get("tableId"); 
    var table = Tables.findOne({_id:tableId}); 
    
    var index = table.players.indexOf(this._id);
    if (index < 0){
      //add
      table.players.push(this._id); 
    } else {
      //remove
      table.players.splice(index, 1);
    }
    //console.log(table); 
    Meteor.call("updateTable", table);
  }
});