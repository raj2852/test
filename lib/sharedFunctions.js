previousSort = null;

getPlayersWithPoints = function (users, plates){

    var players = []; 
      //console.log(users); 
      //console.log(plates);       
      for (var i = 0; i<users.length; i++){
        // console.log('user:' + i); 
        var points = 0; 
        var player = users[i];

        for(var j=0; j<plates.length; j++){

          points = points + getPointInHand(player._id,plates[j]);
          // console.log('plate:' + j);
          /*var pointInPlateForWinner = 0;  
          if(plates[j].winners){
            for(var k=0; k<plates[j].winners.length; k++){
              // console.log('winner:' + k); 
              //points++; 
              if(plates[j].winners[k].user != null && plates[j].winners[k].user != undefined){
                if(plates[j].winners[k].user._id == player._id){
                  pointInPlateForWinner++; 
                  //points++; 
                }
              }            
            }
            if (plates[j].winners.length == 1){
              if(pointInPlateForWinner == 1){
                points++; 
              }
            } else if (plates[j].winners.length == 2){
              if(pointInPlateForWinner == 1){
                points = points + 0.5; 
              } else if (pointInPlateForWinner == 2){
                points = points + 1.5; 
              }
            } else if (plates[j].winners.length == 3){
              if(pointInPlateForWinner == 1){
                points = points + 0.5; 
              } else if (pointInPlateForWinner == 2){
                points = points + 1; 
              } else if (pointInPlateForWinner == 3){
                points = points + 2; 
              }
            } else if (plates[j].winners.length == 4){
              if(pointInPlateForWinner == 1){
                points = points + 0.25; 
              } else if (pointInPlateForWinner == 2){
                points = points + 1; 
              } else if (pointInPlateForWinner == 3){
                points = points + 1.5; 
              } else if (pointInPlateForWinner == 4){
                points = points + 2; 
              }
            }
          }*/
        }
        player.points = points; 
        players.push(player); 
      }
      //console.log(players);   
    return players; 
}


//return the number of points that origins stud hand
getNumberOfStudPoints = function(userId,hand){
   
  var points = 0;
  if(hand.winners){
    for(var k=0; k<hand.winners.length; k++){
      // console.log('winner:' + k); 
      //points++; 
      if(hand.winners[k].user != null && hand.winners[k].user != undefined){
        if(hand.winners[k].user._id == userId){

          if (hand.winners[k].hand.value > 6 || ((hand.winners[k].hand.value==6) && (hand.winners[k].point_height.value > 10))){
              points++;
          } 
        }
      }            
    }    
  }
  return points;
            
            
}

getDate2 = function(handsDate){
    var time = handsDate.toLocaleTimeString().toLowerCase();
    var day = $.datepicker.formatDate("dd/mm/yy", handsDate); 
    return  day + " " + time;
  }

getSessionYearLimits = function(year){
  for(var i=0; i< session_years.length; i++){
    if (session_years[i].year == year){
      return session_years[i];
    }
  }
}


getPointInHand = function(userId,hand){
  var pointInPlateForWinner = 0;  
  var points = 0;
  if(hand.winners){
    for(var k=0; k<hand.winners.length; k++){
      // console.log('winner:' + k); 
      //points++; 
      if(hand.winners[k].user != null && hand.winners[k].user != undefined){
        if(hand.winners[k].user._id == userId){
          pointInPlateForWinner++; 
          //points++; 
        }
      }            
    }
    if (hand.winners.length == 1){
      if(pointInPlateForWinner == 1){
        points++; 
      }
    } else if (hand.winners.length == 2){
      if(pointInPlateForWinner == 1){
        points = points + 0.5; 
      } else if (pointInPlateForWinner == 2){
        points = points + 1.5; 
      }
    } else if (hand.winners.length == 3){
      if(pointInPlateForWinner == 1){
        points = points + 0.5; 
      } else if (pointInPlateForWinner == 2){
        points = points + 1; 
      } else if (pointInPlateForWinner == 3){
        points = points + 2; 
      }
    } else if (hand.winners.length == 4){
      if(pointInPlateForWinner == 1){
        points = points + 0.25; 
      } else if (pointInPlateForWinner == 2){
        points = points + 1; 
      } else if (pointInPlateForWinner == 3){
        points = points + 1.5; 
      } else if (pointInPlateForWinner == 4){
        points = points + 2; 
      }
    }
  }
  return points;
}

refreshTable = function(sortOn, tableData){

  var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var canvas = d3.select(".canvas")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    /*.attr("transform", "translate(" + margin.left + "," + margin.top + ")")*/;



var headerGrp = canvas.append("g").attr("class", "headerGrp");
var rowsGrp = canvas.append("g").attr("class","rowsGrp");

/*console.log("rowsGrp:" + rowsGrp);  
console.log(JSON.stringify(canvas));*/

var fieldHeight = 30;
var fieldWidth = 48;
 timeFormat = d3.time.format("%a %b %d %Y");
//var dateFn = function(date) { return format.parse(d.created_at) };


/*var jsonData = [
{ "id": 3, "name": "Richy", "male": true, "born": "Sun May 05 2013", "amount": 12000},
{ "id": 1, "name": "Susi", "male": false, "born": "Mon May 13 2013", "amount": 2000},
{ "id": 2, "name": "Patrick", "male": true, "born": "Thu Jun 06 2013", "amount": 17000},
{ "id": 4, "name": "Lorenz", "male": true, "born": "Thu May 09 2013", "amount": 15000},
{ "id": 5, "name": "Christina", "male": false, "born": "Mon Jul 01 2013", "amount": 16000}
];
*/

  var jsonData = tableData; 

/*  console.log("TABLE D3 JS");
  // create the table header  
  console.log(JSON.stringify(d3.keys(jsonData[0])));*/
  var header = headerGrp.selectAll("g")
    .data(d3.keys(jsonData[0]))
    .enter().append("g")
    .attr("class", "header")
    .attr("transform", function (d, i){
      return "translate(" + i * fieldWidth + ",0)";
    })
    .on("click", function(d){ return refreshTable(d,jsonData);});
  
  header.append("rect")
    .attr("width", fieldWidth-1)
    .attr("height", fieldHeight);
    
  header.append("text")
    .attr("x", fieldWidth / 2)
    .attr("y", fieldHeight / 2)
    .attr("dy", ".35em")
    .text(String);
  


  // fill the table 
  // select rows
  var rows = rowsGrp.selectAll("g.row").data(jsonData, 
    function(d){ return d.user; });
  
  // console.log("ROWS:" + rows.length);  

  // create rows  
  var rowsEnter = rows.enter().append("svg:g")
    .attr("class","row")
    .attr("transform", function (d, i){
      
      return "translate(0," + (i+1) * (fieldHeight+1) + ")";
    });

  // select cells
  var cells = rows.selectAll("g.cell").data(function(d){ 
    
    return d3.values(d);});
  
  
  // create cells
  var cellsEnter = cells.enter().append("svg:g")
    .attr("class", "cell")
    .attr("transform", function (d, i){
      
      return "translate(" + i * fieldWidth + ",0)";
    });
    
  
  cellsEnter.append("rect")
    .attr("width", fieldWidth-1)
    .attr("height", fieldHeight); 
    
  cellsEnter.append("text")
    .attr("x", fieldWidth / 2)
    .attr("y", fieldHeight / 2)
    .attr("dy", ".35em")
    .text(String);
  
  //update if not in initialisation
  if(sortOn !== null) {
      
      // update rows
      if(sortOn != previousSort){
        rows.sort(function(a,b){return sort(a[sortOn], b[sortOn]);});     
        previousSort = sortOn;
      }
      else{
        rows.sort(function(a,b){return sort(b[sortOn], a[sortOn]);});
        previousSort = null;
      }
      rows.transition()
        .duration(500)
        .attr("transform", function (d, i){
          return "translate(0," + (i+1) * (fieldHeight+1) + ")";
        });
        
      //update cells
      //rows.selectAll("g.cell").select("text").text(String);
  }
}

function sort(a,b){
  if(typeof a == "string"){
    var parseA = timeFormat.parse(a);
    if(parseA){
      var timeA = parseA.getTime();
      var timeB = timeFormat.parse(b).getTime();
      return timeA > timeB ? 1 : timeA == timeB ? 0 : -1;
    }
    else 
      return a.localeCompare(b);
  }
  else if(typeof a == "number"){
    return a > b ? 1 : a == b ? 0 : -1;
  }
  else if(typeof a == "boolean"){
    return b ? 1 : a ? -1 : 0;
  }
}

sortPoint = function(a,b){

 /* var pointHeigher = {
                username: users[i].profile.username,
                hand_value: winner.hand?winner.hand.value:0,
                hand_name: winner.hand?winner.hand.name:'',
                suit_value:winner.point_suit?winner.point_suit.value:0,
                suit_name: winner.point_suit?winner.point_suit.name:'',
                height_value: winner.point_height?winner.point_height.value:0,
                height_name: winner.point_height?winner.point_height.name:''
              }
*/
  if (a.hand_value > b.hand_value){
    return 1;
  } else if (a.hand_value < b.hand_value) {
    return -1;
  } else {
    if (a.suit_value > b.suit_value){
      return 1;
    } else if (a.suit_value < b.suit_value){
      return -1;
    } else {
      if (a.point_height > b.point_height){
        return 1;
      } else if (a.point_height < b.point_height){
        return -1;
      } else {
        if (a.date < b.date){
          return 1;
        } else if (a.date > b.date){
          return -1;
        } else {
          return 0;
        }
      }
    }
  }
}