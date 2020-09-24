$(document).foundation();

    // The below code fills in the first row of the table
    //input window and adding submit event listener
    $("#covid-form").submit(stateStatFunction)
      
      function stateStatFunction( event ) {
      event.preventDefault();
        //displays modal so api populates it 
      modal.style.display = "block";


      //input gets stored as variabel to push into api
    var stateCode = $("#inpt").val();
    var queryURL = "https://api.covidtracking.com/v1/states/" + stateCode + "/current.json";
      
    //api for covid stats per states
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      //displays modal so api populates it 
      modal.style.display = "block";

      var stateIn = $("<h2>").text(response.state);
      $("#stateHeading").html(stateIn);

      var statDate = $("<p>").text("Last Update On: " + response.lastUpdateEt);
      $("#dateOfStat").html(statDate);

      // Create a new table row element
      var tRow = $("<tr>");

      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var totalTestsTd = $("<td>").text(response.totalTestResults);
      var positiveCasesTd = $("<td>").text(response.positive);
      var negativeTd = $("<td>").text(response.negative);
      var deathRatioTd = $("<td>").text(response.death); //.toPrecision(2));
        
      // Append the newly created table data to the table row
      tRow.append(totalTestsTd,positiveCasesTd, negativeTd, deathRatioTd);
      // Append the table row to the table body
      $("tbody").html(tRow);

      //high risk vs low risk algorithm
      var posIncAverage = (parseInt(response.positiveIncrease))/(parseInt(response.totalTestResultsIncrease))*100;
      if(posIncAverage> 5)  {
       $("#pRisk").html("HIGH RISK");
       $("#pRisk").attr("class", "red");
      } else if(posIncAverage< 5) {
        $("#pRisk").html("LOW RISK");
        $("#pRisk").attr("class", "green");
      }

            //inbedding the second api call withing the eventlistener to trigger it simultanaeously with the first
      //api for state parks 
      //using the original variable of 'stateCode'

    var stateAbbr = response.state
    var queryURL = "https://developer.nps.gov/api/v1/places?stateCode=" + stateCode +"&api_key=7aCU7fV7hsighmeE17eWuvD72X2MLXCGXnTdmu79";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //looping through first 5 responses

      var count = response.data.length >= 5? 5: response.data.length;
      console.log(count)
      for (var i = 0; i<count; i++) {
            
      var title = response.data[i].title;
      var urlL = response.data[i].url;
      var imgUrl = response.data[i].images[0].url;

      var titleDiv = $("<h5>").text(title);
      var urlDiv = $("<a>").html(urlL);
      urlDiv.attr("href", urlL)
      var imgUrlDiv = $("<img class='parkImg'>").attr("src", imgUrl);
      var stateDiv = $("<div>").text(stateAbbr);

      var parkDiv = $("<div class='park'>").append("<br>");

      parkDiv.append(titleDiv);
      parkDiv.append(urlDiv);
      parkDiv.append(imgUrlDiv);
      parkDiv.append(stateDiv);
      
      $("#parkResults").prepend(parkDiv);
         }
       }); 
    });
  };

//modal code to give function to modal once opened
  var modal = document.getElementById("modalBox");
  var btn1 = document.getElementById("modalBtn");
  var span = document.getElementsByClassName("close")[0];
  var btn2 = document.getElementById("parklist");
  var btn3 = document.getElementById("close-modal");
  // btn1.onclick = function() {
  //   modal.style.display = "block";
  // }
  span.onclick = function() {
    modal.style.display = "none";
  }

  btn3.onclick = function() {
    modal.style.display = "none";
  }

btn2.onclick = function(){
  modal.style.display = "none";
}


