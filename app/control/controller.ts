declare let require;
let exec = require('exec');
let request = require('request');
export default  function(app) {
    app.get('/',(req,res)=>{
        var css = [
            'materialize',
            'hack',
            'style'
            ];
        var js = [
            'jquery.min',
            'TweenMax.min',
            'style'
            ]
        res.render('index',{
            cssel:css,
            jsel:js

        })
    });
    app.post('/getchord',function(req,res) {
       /*let youtube:string="pseudoId=youtube%3A"+req.body.pseudoId;
       let retry:string="retry="+"false";
       let postdata:string =youtube+'&'+retry;
       let str:string ="curl --data \"" +postdata + "\" https://chordify.net/song";
       console.log(str);
       console.log(req.body.pseudoId)
        exec(str, function(err, out, code) {
            console.log(err+out);
            res.send(out);
           });
           */
           let youtube:string="youtube:"+req.body.pseudoId;
           console.log(youtube);
           request.get (
             'https://chordify.net/song/'+youtube,
             {},function(err,response,body) {
               if(!err && response.statusCode==200) {
                 res.send(body);
               }
             }
           )
        });


    app.get('/playchord/:slug',function(req,res) {

       let slug = req.params.slug;
       let data;
       let str ='https://chordify.net/song/data/'+slug;
      /*  exec(str, function(err, out, code) {
            if (err instanceof Error)
                throw err;
            try {

                res.render('player',
                {
                    jsondata : data,
                    cssel:'',
                    jsel:''
                })
            }
            catch(ex) {
                res.send('Not found')
            }
        }); */
        request.get(
          str,
          {},function(er,rs,body) {
            try {

            let data = JSON.parse(body);
            data.chords= data.chords.split("\n");
            res.render('player',
            {
                jsondata : data,
                videoId : slug,
                cssel:'',
                jsel: [
                  'jquery.min',
                  'youtube'
                ]
            });
            }
            catch(ex) {
              res.send('not found');
            }
          }
        )
    });
    app.post('/api/getinfo/:slug',function(req,res) {
      let slug = req.params.slug;
      let data;
      let str ='https://chordify.net/song/data/'+slug;
      request.get(
        str,
        {},function(er,rs,body) {
          try {

          let data = JSON.parse(body);
          data.chords= data.chords.split("\n");
          res.send(data);
          }
          catch(ex) {
            res.send('not found');
          }
        }
      )
    })
}
