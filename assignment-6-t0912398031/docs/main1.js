var theImage = "https://cdnen.samurai-gamers.com/wp-content/uploads/2018/08/02160301/Roxie.jpg";

"use strict";

var c1 = document.getElementById("c1");
var overlay = document.getElementById("overlay");
var crop = document.getElementById("btnCrop");
var start = document.getElementById("btnStart");

var c2 = document.getElementById("c2");
var ctx2 = c2.getContext("2d");

var cropRegion;



var img = new Image();
img.src = theImage;
img.onload = function() {
    c1.style.height = img.height + 'px';
    c1.style.width = img.width + 'px';
    c1.style.backgroundImage = "url("+theImage+")";

    overlay.style.maxHeight = img.height + 'px';
    overlay.style.maxWidth = img.width + 'px';

    c2.style.height = img.height + 'px';
    c2.style.width = img.width + 'px';
//   drawCroppedImage(imgo);
}





// Minimum resizable area
var minWidth = 60;
var minHeight = 40;

// Thresholds
var FULLSCREEN_MARGINS = -10;
var MARGINS = 4;

// End of what's configurable.
var clicked = null;
var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;

var rightScreenEdge, bottomScreenEdge;

var preSnapped;

var b, c, x, y;

var redraw = false;

var overlay = document.getElementById('overlay');
var ghostpane = document.getElementById('ghostpane');

function setBounds(element, x, y, w, h) {
	element.style.left = x + 'px';
	element.style.top = y + 'px';
	element.style.width = w + 'px';
	element.style.height = h + 'px';
}

function hintHide() {
  setBounds(ghostpane, b.left, b.top, b.width, b.height);
  ghostpane.style.opacity = 0.1;

  // var b = ghostpane.getBoundingClientRect();
  // ghostpane.style.top = b.top + b.height / 2;
  // ghostpane.style.left = b.left + b.width / 2;
  // ghostpane.style.width = 0;
  // ghostpane.style.height = 0;
}


// Mouse events
overlay.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMove);
document.addEventListener('mouseup', onUp);

// Touch events	
overlay.addEventListener('touchstart', onTouchDown);
document.addEventListener('touchmove', onTouchMove);
document.addEventListener('touchend', onTouchEnd);


function onTouchDown(e) {
  onDown(e.touches[0]);
  e.preventDefault();
}

function onTouchMove(e) {
  onMove(e.touches[0]);		
}

function onTouchEnd(e) {
  if (e.touches.length ==0) onUp(e.changedTouches[0]);
}

function onMouseDown(e) {
  onDown(e);
  e.preventDefault();
}

function onDown(e) {
  calc(e);

  var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

  clicked = {
    x: x,
    y: y,
    cx: e.clientX,
    cy: e.clientY,
    w: b.width,
    h: b.height,
    isResizing: isResizing,
    isMoving: !isResizing && canMove(),
    onTopEdge: onTopEdge,
    onLeftEdge: onLeftEdge,
    onRightEdge: onRightEdge,
    onBottomEdge: onBottomEdge
  };
}

function canMove() {
  return x > 0 && x < b.width && y > 0 && y < b.height;
//   && y < 30;
}

function calc(e) {
// b is a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height
  b = overlay.getBoundingClientRect();
//   console.log(b);
// console.log(e.clientX)
  c = c1.getBoundingClientRect();
//   console.log(c);
//   console.log(c.right)

  if(e.clientX<c.right&&e.clientX>c.left) x = e.clientX - b.left; //x value within rectangular
  if(e.clientY<c.bottom&&e.clientY>c.top) y = e.clientY - b.top;  //y value within rectangular
  
  

  onTopEdge = y < MARGINS;
  onLeftEdge = x < MARGINS;
  onRightEdge = x >= b.width - MARGINS;
  onBottomEdge = y >= b.height - MARGINS;

  rightScreenEdge = window.innerWidth - MARGINS;
  bottomScreenEdge = window.innerHeight - MARGINS;
}

var e;

function onMove(ee) {
  calc(ee);

  e = ee;

  redraw = true;

}


function animate() {

  requestAnimationFrame(animate);

  if (!redraw) return;

  redraw = false;
// Start resize
  if (clicked && clicked.isResizing) {

    if (clicked.onRightEdge) overlay.style.width = Math.max(x, minWidth) + 'px';
    if (clicked.onBottomEdge) overlay.style.height = Math.max(y, minHeight) + 'px';

    if (clicked.onLeftEdge) {
      if(e.clientX>c.left){
        var currentWidth = Math.max(clicked.cx - e.clientX  + clicked.w, minWidth);
        if (currentWidth > minWidth) {
            overlay.style.width = currentWidth + 'px';
            overlay.style.left = e.clientX + 'px';	
        }
      }
    }

    if (clicked.onTopEdge) {
      if(e.clientY>c.top){
        var currentHeight = Math.max(clicked.cy - e.clientY  + clicked.h, minHeight);
        if (currentHeight > minHeight && currentHeight < c.height) {
            overlay.style.height = currentHeight + 'px';
            overlay.style.top = e.clientY + 'px';	
        }
      }
    }

    hintHide();

    return;
  }
// Start drag
  if (clicked && clicked.isMoving) {
    ghostpane.style.display = "block";

    // if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.innerWidth - FULLSCREEN_MARGINS || b.bottom > window.innerHeight - FULLSCREEN_MARGINS) {
    //   // hintFull();
    //   // setBounds(ghostpane, 0, 0, window.innerWidth, window.innerHeight);
    //   // ghostpane.style.opacity = 0.2;
    // } else 
    if (b.top < c.top) {
      // hintTop();
      setBounds(ghostpane, c.left, c.top, c.width, c.height/2);
      ghostpane.style.opacity = 0.2;
    } else if (b.left < c.left) {
      // hintLeft();
      setBounds(ghostpane, c.left, c.top, c.width/2, c.height);
      ghostpane.style.opacity = 0.2;
    } else if (b.right > c.right) {
      // hintRight();
      setBounds(ghostpane, c.right/2, c.top, c.width/2, c.height);
      ghostpane.style.opacity = 0.2;
    } else if (b.bottom > c.bottom) {
      // hintBottom();
      setBounds(ghostpane, c.left, c.bottom/2, c.width, c.height/2);
      ghostpane.style.opacity = 0.2;
    } else {
      hintHide();
    }

    if (preSnapped) {
      setBounds(overlay,
      	e.clientX - preSnapped.width / 2,
      	e.clientY - Math.min(clicked.y, preSnapped.height),
      	preSnapped.width,
      	preSnapped.height
      );
      return;
    }
    
    overlay.style.top = (e.clientY - clicked.y) + 'px';
    overlay.style.left = (e.clientX - clicked.x) + 'px';

    // moving
    // overlay.style.top = (e.clientY - clicked.y) + 'px';
    // overlay.style.left = (e.clientX - clicked.x) + 'px';

    return;
  }

  // This code executes when mouse moves without clicking

  // style cursor
  if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
    overlay.style.cursor = 'nwse-resize';
  } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
    overlay.style.cursor = 'nesw-resize';
  } else if (onRightEdge || onLeftEdge) {
    overlay.style.cursor = 'ew-resize';
  } else if (onBottomEdge || onTopEdge) {
    overlay.style.cursor = 'ns-resize';
  } else if (canMove()) {
    overlay.style.cursor = 'move';
  } else {
    overlay.style.cursor = 'default';
  }
}

animate();

function onUp(e) {
  calc(e);

  if (clicked && clicked.isMoving) {
    // Snap
    var snapped = {
      width: b.width,
      height: b.height
    };

    // if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.innerWidth - FULLSCREEN_MARGINS || b.bottom > window.innerHeight - FULLSCREEN_MARGINS) {
    //   // hintFull();
    //   // setBounds(overlay, 0, 0, window.innerWidth, window.innerHeight);
    //   // preSnapped = snapped;
    // } else 
    if (b.top < c.top) {
      // hintTop();
      setBounds(overlay, c.left, c.top, c.width, c.height/2);
      overlay.style.backgroundColor = "white";
      overlay.style.opacity = 0.2;
      ghostpane.style.display = "none";
      preSnapped = snapped;
    } else if (b.left < c.left) {
      // hintLeft();
      setBounds(overlay, c.left, c.top, c.width/2, c.height);
      overlay.style.backgroundColor = "white";
      overlay.style.opacity = 0.2;
      ghostpane.style.display = "none";
      preSnapped = snapped;
    } else if (b.right > c.right) {
      // hintRight();
      setBounds(overlay, c.right/2, c.top, c.width/2, c.height);
      overlay.style.backgroundColor = "white";
      overlay.style.opacity = 0.2;
      ghostpane.style.display = "none";
      preSnapped = snapped;
    } else if (b.bottom > c.bottom) {
      // hintBottom();
      overlay.style.backgroundColor = "white";
      overlay.style.opacity = 0.2;
      ghostpane.style.display = "none";
      setBounds(overlay, c.left, c.bottom/2, c.width, c.height/2);
      preSnapped = snapped;
    } else {
      preSnapped = null;
    }

    hintHide();

  }

  clicked = null;


  cropRegion = overlay.getBoundingClientRect();
  console.log(cropRegion);
}



start.onclick = function(){
  var x = document.getElementById("overlay");
  var y = document.getElementById("ghostpane");

  if(start.value=="Start"){
    start.value="End";
    
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }

    var y = document.getElementById("ghostpane");
    if (y.style.display === "block") {
      y.style.display = "none";
    } else {
      y.style.display = "block";
    }
  } else{
    start.value="Start";
    x.style.display = "none";
    y.style.display = "none";
  }
  
}

crop.onclick = function(){
  
  var ratio = getPixelRatio(ctx2);

    ctx2.clearRect(0, 0, c2.width, c2.height);

    // var img1=document.createElement('img');
    // img1.src= theImage;

    var img1=new Image();
    img1.src= theImage;
    

    img1.onload = function () {
    // var c=document.getElementById('myCanvas');
    // var ctx=c.getContext('2d');

    c2.style.width = cropRegion.width +'px';
    c2.style.height = cropRegion.height +'px';

    // c2.width = cropRegion.width;
    // c2.height = cropRegion.height;

      // var hRatio = c1.width / img1.width;
      // var vRatio = c1.height / img1.height;
      // var ratio  = Math.min ( hRatio, vRatio );
      // console.log(ratio);
      // ctx2.drawImage(img1,cropRegion.left,cropRegion.top,cropRegion.width,cropRegion.height,0,0,cropRegion.width*ratio,cropRegion.height*ratio); 
      ctx2.drawImage(img1,cropRegion.left,cropRegion.top,cropRegion.width,cropRegion.height,0,0,c2.width*ratio,c2.height*ratio);
      // c2.style.width = '100%';
    }
};

var getPixelRatio = function(context) {
  var backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;
   return (window.devicePixelRatio || 1) / backingStore;
};

window.onunload = function() {
  console.log("about to clear event listeners prior to leaving page");
  document.body.removeEventListener('dragover', dragHandler);

  overlay.removeEventListener('mousedown', onMouseDown);
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseup', onUp);

  // Touch events	
  overlay.removeEventListener('touchstart', onTouchDown);
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
  return;
}