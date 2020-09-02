Meteor.methods({
  
  addTable:function(table){
    var tableId;
    if (!this.userId){// not logged in
      console.log("Add table: not logged in");
      return;
    }
    
    tableId = Tables.insert(table);
    return tableId;
  },
  
  updateTable:function(table){
    
    if (!this.userId){// not logged in
      console.log("Update table: not logged in");
      return;
    } else {
      Tables.update(table._id, table);
    }    
  },

  removePlate:function(plateId){
    console.log("removePlate method");
    //console.log(table);
    if (!this.userId){// not logged in
      return;
    } else {
      Plates.remove(plateId); 
    }    
  },

  addPlate: function(plate){
    var plateId;
    if (!this.userId){// not logged in
      console.log("not logged in");
      return;
    }
    //set timestamp for plate
    plate.date = new Date();
    plateId = Plates.insert(plate);
    return plateId;
  },

  updatePlate:function(plate){
    
    if (!this.userId){// not logged in
      console.log("Update plate: not logged in");
      return;
    } else {
      var ret = Plates.update(plate._id, plate);
      console.log("update plate");
      return; 
    }    
  },


  royal_hands: function(){
      //var rh = Plates.aggregate([{$lookup:{from:"tables",localField:"table",foreignField:"_id",as:"table_info"}},{$unwind:"$table_info"},{$match:{$and:[{"table_info.active":true}]}},{$sort:{"winners.hand.value":-1,"winners.point_height.value":-1,"date":1}},{$limit:10}]);
      var plates = Plates.find({},{sort:{"winners.hand.value":-1,"winners.point_height.value":-1, "date":1},limit:10}).fetch();

      console.log(plates);
      return plates;

    }

})