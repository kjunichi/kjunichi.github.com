(function(){
  function run() {
     var srcText = document.getElementById("src").value;
     var distText="";
     //console.log(srcText);
     var lines = srcText.split("\n");
     if(lines[0].length === 0) {
         return;
     }
     distText += "'" + lines[0]+ "\'"
     for(var i = 1; i < lines.length; i++) {
        distText += ",\n\'" + lines[i]+ "\'"
     }
     distText += "\n"
     var elm = document.getElementById("dist");
     elm.value=distText;
  }
  window.addEventListener("load", () => {
    const elm = document.getElementById("btn");
    elm.addEventListener("click", () => {
      run();
    },false);
  },false);
})();