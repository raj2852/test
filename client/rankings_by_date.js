Template.rankings_by_date.rendered = function(){
	var users = Meteor.users.find().fetch();

  	var tables = Tables.find({
  		"active":true,
  		"date":{
  			//"$gt": new Date("2020-8-31T00:00:00.000z"),
			"$lt": new Date("2020-08-31T00:00:00.000z")

		}}).fetch();
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