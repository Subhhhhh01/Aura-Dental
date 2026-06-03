const http = require('http');
http.get('http://localhost:3000/api/db-status', (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(body));
});
