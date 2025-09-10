const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file. [DONE]
      path = require ("path"),
      mime = require( "mime" ),
      dir  = "public/";
const port = process.env.PORT || 3000;


let nextId = 1;
const appdata = [
  { id: nextId++, model: "toyota", year: 1999, mpg: 23 },
  { id: nextId++, model: "honda",  year: 2004, mpg: 30 },
  { id: nextId++, model: "ford",   year: 1987, mpg: 14 }
]

//----------- Helper Functions -----------
function sendJSON(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", chunk => (raw += chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(raw || "{}")); }
      catch { resolve({ _raw: raw }); }
    });
  });
}
  // NECESSARY?:
// // Serve a static file, preferring ./public if present, but gracefully falling back
// // to your current project root files (index.html, main.js, main.css).
// function serveStatic(urlPath, res) {
//   // map "/" → index.html
//   const requested = urlPath === "/" ? "index.html" : urlPath.replace(/^\//, "");

//   // first try ./public/<path>
//   const publicPath = path.join(".", dir, requested);

//   // small compatibility map for your current paths
//   // (index.html references "js/main.js" and "css/main.css" from project root)
//   const fallbacks = {
//     "js/main.js": "main.js",
//     "css/main.css": "main.css"
//   }; 

//   const rootPath = path.join(".", fallbacks[requested] || requested);

//   const trySend = (p, next) => {
//     fs.readFile(p, (err, content) => {
//       if (err) return next();
//       res.writeHead(200, { "Content-Type": mime.getType(p) || "application/octet-stream" });
//       res.end(content);
//     });
//   };

//   trySend(publicPath, () => trySend(rootPath, () => {
//     res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
//     res.end("404 Error: File Not Found");
//   }));
// }

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}
// const handleGet = function( request, response ) {
//   // API: return the entire server-resident dataset
//   if( request.url === "/api/entries" ) {
//     return sendJSON( response, 200, { ok: true, data: appdata } )
//   }

//   // Static files (homepage + everything under /public)
//   if( request.url === "/" || request.url === "/index.html" ) {
//     return sendFile( response, "public/index.html" )
//   }

//   const filename = dir + request.url.slice( 1 )
//   return sendFile( response, filename )
// }

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )
    // ... do something with the data here!!!

    let body = {}
    try { body = JSON.parse( dataString || "{}" ) } catch { body = {} }
    
    // *** minimal addition: maintain the server-side dataset here ***
    if ( request.url === "/api/entries" ) {
      const { model, year, mpg } = body || {}

      // tiny validation to prove it's a tabular row with 3+ fields
      if ( !model || !Number.isInteger(+year) || !Number.isFinite(+mpg) ) {
        return sendJSON( response, 400, { ok:false, error:"Expected JSON: { model, year, mpg }" } )
      }

      const row = { id: nextId++, model: String(model), year: +year, mpg: +mpg }
      appdata.push( row )
      return sendJSON( response, 201, { ok:true, data: row } )
    }

    // keep your original behavior for all other POSTs (e.g., /submit)
    console.log( body )

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end("test")
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

//server.listen( process.env.PORT || port )
server.listen(process.env.PORT || port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});