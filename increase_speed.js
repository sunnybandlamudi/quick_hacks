function init() {
  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    // if (document.getElementById(elmnt.id + "header")) {
    //   /* if present, the header is where you move the DIV from:*/ 
    //   document.getElementById(elmnt.id + "header" ).onmousedown = dragMouseDown;
    // } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/ 
      elmnt.onmousedown = dragMouseDown;
    // }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      elmnt.style.right = "unset";
    }
    function closeDragElement() {
      /* stop moving when mouse button is released:*/ document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  //   var button = document.createElement("Button");
  //   button.innerHTML = "Button";
  //   button.style = `
  //   position: absolute;
  //   z-index: 9;
  //   top:50%; right:0;
  //   background-color: #f1f1f1;
  //   cursor: move;
  //   text-align: center;
  //   border: 1px solid #d3d3d3;
  //   width:50px; height:50px; }`;
  //   document.body.appendChild(button);

  //   dragElement(button);

  //   button.addEventListener("click", function () {
  //     video = document.getElementsByTagName("video")[0];
  //     // video.playbackRate = video.playbackRate + 0.5;
  //     video.playbackRate = 3;
  //     alert("Hello World!");
  //   });

  let floatStyle = `
    position: absolute; 
    z-index: 1000; 
    top:50vh; 
    right:0;
    cursor: move; 
    text-align: center; 
    display:flex; }`;

  var styleButton = `
    background:grey;
    width:40px;
    height:40px;
    color:white;
    font-size:1.5rem;
    background:rgba(32,33,36,0.8);
    border-radius:35%;
    `;

  let container = document.createElement("div");
  let increase = document.createElement("button");
  let decrease = document.createElement("button");

  increase.style = styleButton;
  decrease.style = styleButton;
  container.style = floatStyle;

  increase.innerHTML = "+";
  decrease.innerHTML = "-";
  container.appendChild(increase);
  container.appendChild(decrease);
  // container.innerHTML="Text"

  increase.addEventListener("click", () => {
    video = document.getElementsByTagName("video")[0];
    if (video == null) {
      return;
    }
    video.playbackRate = video.playbackRate + 0.5;
    // video.playbackRate = 3;
  });

  decrease.addEventListener("click", () => {
    video = document.getElementsByTagName("video")[0];
    if (video == null) {
      return;
    }
    video.playbackRate = video.playbackRate - 0.5;
    // video.playbackRate = 3;
  });

  dragElement(container);

  document.body.appendChild(container);
}
