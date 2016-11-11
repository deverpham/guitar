declare var require;
let express = require('express');
let app = express();
let bodyParser = require('body-parser')
import route from "./app/control/controller"
import config from "./app/core/config"
app.set('views',config.viewPath);
app.set('view engine',config.viewEngine);
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(config.publicFolder,express.static('public'));
route(app)
app.listen(config.port,config.host,function() {
   console.log('server Started')
});
