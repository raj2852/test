Template.telesina_list.helpers({
  table:function(){
     var tableId = Session.get("tableId"); 
     var table = Tables.findOne({_id:tableId});
     return table; 
  },

  telesine:function(){
    return telesine;
  }
});