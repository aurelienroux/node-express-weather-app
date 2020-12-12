const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const icon = document.querySelector('#icon')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = searchInput.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  icon.innerHTML = ''

  fetch(`/weather?address=${address}`) //eslint-disable-line
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        const img = document.createElement('img')
        img.setAttribute('src', data.icon)
        img.setAttribute('alt', 'weather icon')

        messageOne.textContent = data.location
        messageTwo.textContent = `It is ${data.conditions}. Temperature is ${data.temperature} but it feels like ${data.feelslike}.`
        icon.appendChild(img)
      }
    })
    .catch((err) => {
      messageOne.textContent = err
    })
})
