Template.rankings.rendered = function(){

Meteor.call("royal_hands2", function(err,res){
  if(!err){
    var rrank = [];
    for(var i=0; i<res.length; i++){
        var win = {
          username: res[i].winners[0].user.profile.username,
          hand: res[i].winners[0].hand.name,
          point_height: res[i].winners[0].point_height.name,
          date: res[i].date
        }
        rrank.push(win);

    }
    console.log(rrank);
    Session.set("royal_ranking",rrank);
  }
});

	var users = Meteor.users.find().fetch();


var yearLimit = null; 
    if (Session.get("year") != null){
      yearLimit = getSessionYearLimits(Session.get("year"));
    }

var tables = null;

    if (yearLimit != null){
      tables = Tables.find({
      "active":true,
      "date":{
          "$gt": yearLimit.start,
          "$lt": yearLimit.end

      }}).fetch();
    } else {
        tables = Tables.find({"active":true}).fetch();
    }



  	//var tables = Tables.find({"active":true}).fetch();
  	var tablesId = [];
  	console.log("numero tavoli attivi:" + tables.length);
  	for(var i=0; i<tables.length; i++){
  		tablesId.push(tables[i]._id);
  	}
    var plates = Plates.find({"table": { "$in": tablesId }}).fetch();

    var tablePlayers = [];
    var players = [];

    var arrPoints = [];

    for (var i=0; i<users.length; i++){
    	//calcolo delle mani giocate per ogni giocatore
    var player = users[i];
    var userHands = 0; 
    var userPoints = 0; 
    var userTelesinaHands = 0; 
    var userTelesinaPoints = 0; 
    var userPokerHands = 0; 
    var userPokerPoints = 0; 
    var userMastroTelesinaPoints = 0;

    	for (var tabj=0; tabj<tables.length; tabj++){
    		var bIsUserInTable = isUserInTable(users[i]._id,tables[tabj]); 
	    		
	    	for (var platek=0; platek < plates.length; platek++){
	    		//se il giocatore è nel tavolo e la mano appartiene al tavolo
	    		if (bIsUserInTable && (plates[platek].table == tables[tabj]._id)){
	    			userHands++;
	    		}

	    		if (bIsUserInTable && (plates[platek].table == tables[tabj]._id)){
	    			userPoints = userPoints + getPointInHand(users[i]._id,plates[platek]);
	    		}

          //Calcolo punti telesina
          if (bIsUserInTable && (plates[platek].type==2) && (plates[platek].table == tables[tabj]._id)){
            userTelesinaHands++;
            userTelesinaPoints = userTelesinaPoints + getPointInHand(users[i]._id,plates[platek]);
          }

          /*if (bIsUserInTable && (plates[platek].type==2) && (plates[platek].table == tables[tabj]._id)){
            userTelesinaPoints = userTelesinaPoints + getPointInHand(users[i]._id,plates[platek]);
          }*/

          //Calcolo punti poker
          if (bIsUserInTable && (plates[platek].type!=2) && (plates[platek].table == tables[tabj]._id)){
            userPokerHands++;
            userPokerPoints = userPokerPoints + getPointInHand(users[i]._id,plates[platek]);
            userMastroTelesinaPoints = userMastroTelesinaPoints + getNumberOfStudPoints(users[i]._id,plates[platek]);

            //creazione del punto da inserire nell'array per il calcolo del punto piu alto
            if(plates[platek].winners){
              var winner = plates[platek].winners[0];
              if (users[i]._id == winner.user._id){
                  var pointHeigher = {
                  username: users[i].profile.username,
                  hand_value: winner.hand?winner.hand.value:0,
                  hand_name: winner.hand?winner.hand.name:'',
                  suit_value:winner.point_suit?winner.point_suit.value:0,
                  suit_name: winner.point_suit?winner.point_suit.name:'',
                  height_value: winner.point_height?winner.point_height.value:0,
                  height_name: winner.point_height?winner.point_height.name:'',
                  date: plates[platek].date

                }
                arrPoints.push(pointHeigher);
              }
              
              
            }
            

          }

          /*if (bIsUserInTable && (plates[platek].type!=2) && (plates[platek].table == tables[tabj]._id)){
            userPokerPoints = userPokerPoints + getPointInHand(users[i]._id,plates[platek]);
          }
          if (bIsUserInTable && (plates[platek].type!=2) && (plates[platek].table == tables[tabj]._id)){
            userMastroTelesinaPoints = userMastroTelesinaPoints + getNumberOfStudPoints(users[i]._id,plates[platek]);
          }
*/

	    	}	
    	}


     

    	player.userHands = userHands; 
    	player.userPoints = userPoints; 

      player.userTelesinaHands = userTelesinaHands; 
      player.userTelesinaPoints = userTelesinaPoints; 

      player.userPokerHands = userPokerHands; 
      player.userPokerPoints = userPokerPoints; 

    	player.userMean = userHands?parseFloat((userPoints/userHands)).toFixed(3):0; 
      player.userTelesinaMean = userTelesinaHands?parseFloat((userTelesinaPoints/userTelesinaHands)).toFixed(3):0; 
      player.userPokerMean = userPokerHands?parseFloat((userPokerPoints/userPokerHands)).toFixed(3):0; 
      player.userMastroTelesinaPoints = userPokerHands?parseFloat((userMastroTelesinaPoints/userPokerHands)).toFixed(3):0; 
      
    	players.push(player); 

      /*var tablePlayer = {
        username:player.profile.username,
        userHands : player.userHands, 
        userPoints :player.userPoints, 
        userMean : player.userMean,
        userPokerMean : player.userPokerMean, 
        userTelesinaMean :player.userTelesinaMean 
      }*/

      var tablePlayer = {
        user:(player.profile.username.length > 8)?player.profile.username.substr(0,8):player.profile.username,
        mani : player.userHands, 
        punti :player.userPoints, 
        MVP : player.userMean,
        MVPP : player.userPokerMean, 
        MVPT :player.userTelesinaMean,
        MT:  player.userMastroTelesinaPoints 
      }
      
      


      tablePlayers.push(tablePlayer); 
    }

     //console.log(JSON.stringify(arrPoints.sort(sortPoint)));
    //console.log(JSON.stringify(players));

  	var result = {
      tablePlayers: tablePlayers,
  		players: players,
  		n_players: players.length,
  		hands: plates,
  		n_hands: plates.length
  	}

    // console.log(JSON.stringify(tablePlayers)); 
    refreshTable(null,tablePlayers);

};




Template.rankings.helpers({
 /* plates:function(){
    var plates = Plates.find({"active":true}).fetch();
    return plates; 
  },*/

  settings: function () {
        return {
            /*collection: collection,*/
            rowsPerPage: 12,
            showFilter: true,
            fields: ['giocatore', 'mani', 'punti','MVP','MVPP','MVPT','MT']
        };
    },

    royal_hands2: function(){
        return Session.get("royal_ranking"); 
      
      
    },
getDate: function(handsDate){
    
    return  getDate2(handsDate);
  },
  /*getDate: function(handsDate){
    var time = handsDate.toLocaleTimeString().toLowerCase();
    var day = $.datepicker.formatDate("dd/mm/yy", handsDate); 
    return  day + " " + time;
  },*/
    royal_hands: function(){
      var plates = Plates.find({},{sort:{"winners.hand.value":-1,"winners.point_height.value":-1, "date":1},limit:10}).fetch();
      console.log("OK");
      console.log(plates);
      return plates;
    },

    winner_username: function(winners){
        return winners[0].user.profile.username;
    }



    
 
});


isUserInTable = function(userId,table){
	var players = table.players;
	for(var i=0; i< players.length; i++){
		if(players[i] == userId){
			return true; 
		}
	}
	return false;
}