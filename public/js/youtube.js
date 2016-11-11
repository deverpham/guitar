

  var player;
  var video;
  function onYouTubeIframeAPIReady() {

      var id = $('#player').attr('videoid');
      $.post(
        '../api/getinfo/'+id,
        function(data) {
          video=data;
          console.log(video)
          player = new YT.Player('player', {
            videoId :video.external_id,
            events : {
              'onReady':onOk,
              'onStateChange' :onChange

            }
          })
        },
        "json"
      );

  }
function onOk() {
  player.playVideo();
}
var checkisPlay;
var currentPos = 1;
function onChange(e) {

  console.log(e.data)
  if(e.data==1) {
    checkisPlay=setInterval(function(){
      var mapChord = video.chords;
      var currentSearch =mapChord[currentPos].split(";");
      var currentSearchTime=parseFloat(currentSearch[2]).toFixed(4);
      console.log("search" + ":" + currentSearchTime + "POS:" +currentPos)
      var currentTime =e.target.getCurrentTime().toFixed(4);
      currentTime = currentTime +0.001;
      if(parseFloat(currentTime)>=parseFloat(currentSearchTime)) {
        console.log("lon hon" + currentTime + ":" + currentSearchTime)
        currentPos++;

        $('.label').text(currentSearch[1])

      }
      console.log(e.target.getCurrentTime().toFixed(4))
    },0);
  }
  else {
    clearInterval(checkisPlay);
  }
}
