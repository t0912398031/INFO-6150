

var canvas  = $("#canvas"),
    context = canvas.get(0).getContext("2d"),
    $result = $('#result');


function draw(){
  // var ctx = document.getElementById("canvas").getContext("2d");  

  var img = new Image();
   
  img.onload = function(){        
      // ctx.drawImage(img,0,0);
      context.canvas.height = img.height;
      context.canvas.width  = img.width;
      context.drawImage(img, 0, 0);                 
  };                                      
  img.src = "docs/images/picture.jpg";
  
}

draw();


function start() {
  var width = this.offsetWidth;
  var height = this.offsetHeight;
  var cropper;

  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(
    this,
    0, 0, this.naturalWidth, this.naturalHeight,
    0, 0, width, height
  );
  cropper = new Cropper(canvas);
}




$('#btnStart').click(function() {
  var cropper;
  var canvas = document.getElementById('canvas');
  cropper = new Cropper(canvas);
  console.log("?");
  
  var canvas = document.getElementById('canvas');
  var image = document.getElementById('image');

  if (image.complete) {
    start.call(image);
  } else {
    image.onload = start;
  }
});




// initialise();

// function initialise() {
//   document.addEventListener('DOMContentLoaded', () => {
//     draw();
//   });
// }

$('#fileInput').on( 'change', function(){
    if (this.files && this.files[0]) {
      if ( this.files[0].type.match(/^image\//) ) {
        var reader = new FileReader();
        reader.onload = function(evt) {
           var img = new Image();
           img.onload = function() {
             context.canvas.height = img.height;
             context.canvas.width  = img.width;
             context.drawImage(img, 0, 0);
             var cropper = canvas.cropper({
               aspectRatio: 16 / 9
             });
             $('#btnCrop').click(function() {
                // Get a string base 64 data url
                var croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png"); 
                $result.append( $('<img>').attr('src', croppedImageDataURL) );
             });
             $('#btnRestore').click(function() {
               canvas.cropper('reset');
               $result.empty();
             });
           };
           img.src = evt.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      }
      else {
        alert("Invalid file type! Please select an image file.");
      }
    }
    else {
      alert('No file(s) selected.');
    }
});