// var myImage = document.getElementById('testImg');
// Tesseract.recognize('../img/test.jpg')
// .then(function(result){
//     console.log(result)
// })

// var errorCallback = function(e){
//   alert('nopee', e);
// };
//
// if(Modernizr.getusermedia){
//   // alert('supported!');
//   var gUM = Modernizr.prefixed('getUserMedia', navigator);
//   gUM({video: true}, function(localMediaStream){
//     var video = document.querySelector('video');
//     video.src = window.URL.createObjectURL(localMediaStream);
//
//     video.onloadedmetadata = function(e){
//       console.log('yo');
//     }
//
//   }, function(){
//     alert('fail');
//   })
// } else {
//   alert('fail');
// }

var input = $('#fileInput');
var preview = $('.preview');
var subBtn = $('#sub');

input[0].style.opacity = 0;
input.on('change', updateImgPrev);
subBtn.on('click', function(){
  console.log('yo');
})
// input.on('change', function(){
//   console.log('yo');
// });

function updateImgPrev(){
  if(preview.is(':empty')){
    preview.empty();
  }

  var curFiles = input[0].files;
  if(curFiles.length === 0){
    var para = $('<p></p>');
    para.setContent('No files currently selected for upload');
    para.append(para);
  } else {
    var imgP = $('<img>');
    console.log(curFiles[0]);
    imgP.attr('src', window.URL.createObjectURL(curFiles[0]));
    preview.append(imgP);
  }

  }
