function openNav() {
    document.getElementById('open').style.display = "none";
    document.getElementById('nav').style.width = "200px";
    document.getElementById("myOverlay").style.display = "block";
    /*document.getElementById('page').style.marginLeft = "200px";
    document.getElementById('content').style.marginLeft = "200px";*/
  }
  
  function closeNav() {
    document.getElementById('nav').style.width = "0";
    document.getElementById('open').style.display = "block";
    document.getElementById("myOverlay").style.display = "none";
    /*document.getElementById('page').style.marginLeft = "0";
    document.getElementById('content').style.marginLeft = "0";*/
  }