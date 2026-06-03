import http from 'http';

const req = http.request({
  method: 'POST',
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/cms/doctors',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(res.statusCode, body));
});

req.write(JSON.stringify([{id: 1, name: 'Test Doctor', status: 'Active'}]));
req.end();
