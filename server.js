const http = require('http');
const fs = require("fs");


const server = http.createServer((req, res) => {
  // parse the request URL path
  let reqPath = req.url.split('/');

  // if the URL path starts with the keyword 'static'
  // send the specific file that is being requested as the response
  if (reqPath[1] === 'static') {
    let fileType;

    // set variable for the requested file type
    const reqType = req.url.split('.')[1];

    // set variable for the request file's folder path

    const staticFile = fs.readFileSync('./assets/' + reqPath.slice(2).join('/'));

    // check the file type and assign it to fileType
    if (reqType === 'css') {
      fileType ='text/CSS';
    }

    if (reqType === 'jpg') {
      fileType ='image/jpeg';
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', fileType);
    return res.end(staticFile);
    
    }

  // load the html file
  const html = fs.readFileSync('./index.html', 'utf-8');

  // send response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));