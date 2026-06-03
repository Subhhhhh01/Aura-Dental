fetch('http://localhost:3000/api/cms/doctors')
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);
