function getOpenClasses() {
  //var theirString = document.getElementById("checkinIdThing").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText){
        var openClasses = JSON.parse(this.responseText);
        for(var i = 0; i<openClasses.length; i++){
          if(openClasses[i].isLive === 'true'){
            document.getElementById("response").innerHTML += beginCard + openClasses[i].className + endCard + openClasses[i].className + pt3 +openClasses[i].className + pt4 +openClasses[i].className+pt5;
          }
          else{

            console.log("never got here");
            document.getElementById("response").innerHTML += beginCard + openClasses[i].className + endCard + openClasses[i].className + pt3  +openClasses[i].className+pt5;
          }
          // document.getElementById("response").innerHTML += ;
          // document.getElementById("response").innerHTML += endCard;

        }
      }
    // document.getElementById("response").innerHTML = this.responseText;
    }
  }
  xhttp.open("GET", "getOpenClasses" , true);
  xhttp.send();
}
var beginCard =
`<div class="card blue-grey darken-1">
  <div class="card-content white-text">
    <span class="card-title">
    Class: </span> <p>`;
var endCard =` </p> </div>
  <div class="card-action">\n
    <button type="button" class="waves-effect waves-light btn" name="button" value= "`;
    var pt3 = `" onclick="viewHistory(this)">View</button>\n
    <button type="button" class="waves-effect waves-light btn" name="button" value= "`;
    var pt4 = `" onclick="closeClass(this)">Close</button>\n
    <button type="button" class="waves-effect waves-light btn" name="button" value= "`;
    var pt5 = `" onclick="DeleteClass(this)">Delete</button>\n
  </div>\n
</div>`;
getOpenClasses();
function closeClass(e){
  console.log(e);
  var hidden = document.getElementById("changeMeClose");
  //var s = this.text
  hidden.value = e.value;
  console.log(hidden.value + "<- that is the value I'm sending..." + "which is ..." + e.value);
  //put the va lue of e into the form
  document.getElementById("close").submit();
}
function DeleteClass(e){
  var hidden = document.getElementById("changeMeDelete");
  hidden.value = e.value;
  //put the value of e into the form
  document.getElementById("delete").submit();
}
function viewHistory(e){
  getStudentClasses(e);
  //var hidden = document.getElementById("changeMeClass");
  //hidden.value = e.value;
  //put the value of e into the form
  //document.getElementById("view").submit();
}
function getStudentClasses(e) {
  //var theirString = document.getElementById("checkinIdThing").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText){
        var openClasses = JSON.parse(this.responseText);
        for(var i = 0; i<openClasses.length; i++){
    /*      if(openClasses[i].isLive === 'true'){
            document.getElementById("response").innerHTML += beginCard + openClasses[i].className + endCard + openClasses[i].className + pt3 +openClasses[i].className + pt4 +openClasses[i].className+pt5;
          }
          else{

            console.log("never got here");
            document.getElementById("response").innerHTML += beginCard + openClasses[i].className + endCard + openClasses[i].className + pt3  +openClasses[i].className+pt5;
          }*/
          // document.getElementById("response").innerHTML += ;
          // document.getElementById("response").innerHTML += endCard;
                var col2 = ["bname", "userId", "className", "date"];
                var col = ["name", "User ID", "Class Name", "Date"];
                  var table = document.createElement("table");
                  var tr = table.insertRow(-1);                   // TABLE ROW.
                  for (var i = 0; i < col.length; i++) {
                      var th = document.createElement("th");      // TABLE HEADER.
                      th.innerHTML = col[i];
                      tr.appendChild(th);
                  }
                  for (var i = 0; i < openClasses.length; i++) {
                      tr = table.insertRow(-1);
                      for (var j = 0; j < col.length; j++) {
                          var tabCell = tr.insertCell(-1);
                          tabCell.innerHTML = openClasses[i][col2[j]];
                      }
                  }
                  var divContainer = e.parentElement.parentElement;
                  divContainer.innerHTML += "";
                  divContainer.appendChild(table);
              }
        }
      }
    // document.getElementById("response").innerHTML = this.responseText;
    }

  xhttp.open("POST", "viewThisClass" , true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  stringo = "ref="+e.value;
  xhttp.send(stringo);
  xhttp.send();
}
