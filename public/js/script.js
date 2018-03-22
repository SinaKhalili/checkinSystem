function openFloodgates() {
  var theirString = document.getElementById("checkinIdThing").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText)
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "newReq" + theirString , true);
  xhttp.send();
}
