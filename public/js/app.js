const weatherForm = document.querySelector('form') //eslint-disable-line
const searchInput = document.querySelector('input') //eslint-disable-line
const messageOne = document.querySelector('#message-1') //eslint-disable-line
const messageTwo = document.querySelector('#message-2') //eslint-disable-line

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = searchInput.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${address}`) //eslint-disable-line
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = `It is ${data.conditions}. Temperature is ${data.temperature} but it feels like ${data.feelslike}.`
      }
    })
    .catch((err) => {
      messageOne.textContent = err
    })
})
