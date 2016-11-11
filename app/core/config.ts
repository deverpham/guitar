declare let process;
 class config {
    port:number =80;
    host:string ="0.0.0.0";
    viewPath:string = './app/views';
    viewEngine:string ='pug';
    publicFolder:string = '/public';
}
let configtype:any;
export default configtype = new config();
