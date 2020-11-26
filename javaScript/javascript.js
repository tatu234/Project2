var first;
var test;
var xmlDoc;
var url = "https://www.finnkino.fi/xml/TheatreAreas/";

first = new XMLHttpRequest();
first.open("GET", url, true);
first.send();

first.onreadystatechange = function() {
  if (first.readyState == 4 && first.status == 200) {
    xmlDoc = first.responseXML;
    test = xmlDoc.getElementsByTagName("TheatreArea");
    list = "<tr><th> Movie theaters </th></th>";
    for (i = 2; i < test.length; i = i + 1) {
      var id = test[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
      list += "<tr onclick='show(" + id + ")'><td>";
      list = list + test[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
    }
    document.getElementById("theaters").innerHTML = list;
  }
}

function show(i) {
  $("#textField").show(2500);
  document.getElementById('textField').innerHTML = "";

  var second = new XMLHttpRequest();
  var url2 = "https://www.finnkino.fi/xml/Schedule/?area=" + i;
  var result = document.getElementById('textField');
  var xmlDoc;
  var show1;

  second.open("GET", url2, true);
  second.send();

  second.onreadystatechange = function() {
    if (second.readyState == 4 && second.status == 200) {

      xmlDoc = second.responseXML;
      show1 = xmlDoc.getElementsByTagName("Show");

      for (times = 0; times < show1.length; times = times + 1) {

        var image = show1[times].getElementsByTagName("EventSmallImagePortrait");
        var image2 = image[0];

        var link = image2.childNodes[0].nodeValue;
        var picture = '<img src="' + link + '">';

        var imageText = show1[times].getElementsByTagName("dttmShowStart"); //
        var first = imageText[0]; //
        imageText = first.childNodes[0].nodeValue;

        var name = show1[times].getElementsByTagName("Title");
        var third = name[0];
        name = third.childNodes[0].nodeValue;

        var genre = show1[times].getElementsByTagName("Genres");
        var fourth = genre[0];
        genre = fourth.childNodes[0].nodeValue;

        var duration = show1[times].getElementsByTagName("LengthInMinutes");
        var fifth = duration[0];
        duration = fifth.childNodes[0].nodeValue;

        var where = show1[times].getElementsByTagName("TheatreAndAuditorium");
        var sixth = where[0];
        where = sixth.childNodes[0].nodeValue;

        var date = new Date(imageText);
        var userTimezoneOffset = date.getTimezoneOffset() * 60000;
        new Date(date.getTime() - userTimezoneOffset);

        result.style.backgroundColor = "#73DBFC";

        result.innerHTML += '<table id="content"><td>' +
          picture + '</td><td>' +
          "<b>Movie: </b>" + name + "<br>" +
          "<b>Showtime: </b>" + imageText + "<br>" +
          "<b>Duration: </b>" + duration + " min" + "<br>" +
          "<b>Genre: </b>" + genre + "<br>" +
          "<b>Location: </b>" + where + "<br>"
          '</table></td>';
      }
    }
  }
}
