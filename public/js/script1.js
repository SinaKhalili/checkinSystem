function getOpenClasses() {
  //var theirString = document.getElementById("checkinIdThing").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText){
        var openClasses = JSON.parse(this.responseText);
        for(var i = 0; i<openClasses.length; i++){

          document.getElementById("response").innerHTML += beginCard + openClasses[i].className + endCard + openClasses[i].className + pt3 +openClasses[i].className + pt4 +openClasses[i].className+pt5;
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
  var hidden = document.getElementById("changeMeClose");
  //var s = this.text
  hidden.value = this.value;
  console.log(hidden.value + "<- that is the value I'm sending..." + "which is ..." + this.value);
  //put the va lue of e into the form
  document.getElementById("close").submit();
}
function DeleteClass(e){
  var hidden = document.getElementById("changeMeDelete");
  hidden.value = this.value;
  //put the value of e into the form
  document.getElementById("close").submit();
}
function viewClass(e){
  var hidden = document.getElementById("changeMeClass");
  hidden.value = this.value;
  //put the value of e into the form
  document.getElementById("close").submit();
}
