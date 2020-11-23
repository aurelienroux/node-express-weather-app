const weatherForm = document.querySelector('form') //eslint-disable-line
const searchInput = document.querySelector('input') //eslint-disable-line

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = searchInput.value

  fetch(`http://localhost:3000/weather?address=${location}`) //eslint-disable-line
    .then((response) => response.json())
    .then((data) => console.log('data', data)) //eslint-disable-line
    .catch((err) => console.log('err', err)) //eslint-disable-line
})
