var $;
$(document).ready(function() {
  $('#dohopam').click(function(){
    TweenMax.to('#dohopam',0.3,{
      backgroundColor:"rgba(68, 68, 68, 0.87)",
      width:"100%",
      onComplete : editText
    });
  })
});
function editText() {
  $('#dohopam span').text('Loading...');
}
function detectChord() {
     var namesong = $('#formdo input').val();
    var pos = namesong.indexOf('=');
     var keyword=namesong.slice(pos+1);
    var finish=false;
    var redo =setInterval(function() {
        if(finish) {
            clearInterval(redo);
        }
        else {
         $.post (
        './getchord',
        {
            pseudoId : keyword
        },
        function(data) {
          console.log(data);
            try {

           var result =JSON.parse(data);
            if(result.status=='done') {
                finish=true;
                var url ='./playchord/'+"youtube:"+keyword;
                window.location=url;

            }
            else {
                $('.progress').css('visibility','visible');
                console.log(result.progress)
                TweenMax.to('.progress',0.2,{
                  width: result.progress+"%"
                });
            }
            }
            catch(ex) {
                console.log("Khong Duoc" +ex);
                clearInterval(redo);
            }

        }
        )
        }



    },2000);

    return false;
}
