"use strict";
var config = (function () {
    function config() {
        this.port = 80;
        this.host = "0.0.0.0";
        this.viewPath = './app/views';
        this.viewEngine = 'pug';
        this.publicFolder = '/public';
    }
    return config;
}());
var configtype;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configtype = new config();
