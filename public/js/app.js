fetch('http://localhost:3000/weather?address=frejus')
  .then((response) => response.json())
  .then((data) => console.log('data', data))
  .catch((err) => console.log('err', err))
