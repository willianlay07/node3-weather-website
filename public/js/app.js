console.log('Client site Javascript file is loaded')

// To fetch JSON
// https://puzzle.mead.io/puzzle
/*
fetch('http://localhost:3000/weather?address=Mawlamyine').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data.forecast)
            console.log(data.loc)
            console.log(data.address)
        }
    })
})
*/

const weatherForm   = document.querySelector('form')
const searchEle     = document.querySelector('input')
const messageOne    = document.querySelector('#message-1')
const messageTwo    = document.querySelector('#message-2')

//messageOne.textContent  = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location          = searchEle.value

    messageOne.textContent  = 'Loading...'
    messageTwo.textContent  = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                //console.log(data.error)
                messageOne.textContent  = data.error
            } else {
                //console.log(data.forecast)
                //console.log(data.loc)
                //console.log(data.address)

                messageOne.textContent  = data.loc
                messageTwo.textContent  = data.forecast
            }
        })
    })
})