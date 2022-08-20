const errorHandling = document.querySelector('.error-handling')
const successHandling = document.querySelector('.success-handling')
const regInput = document.querySelector('.reg-input')

if (regInput.value == '') {
    setTimeout(() => {
        errorHandling.classList.add('hide')
        successHandling.classList.add('hide')
    }, 3000)
} else if (regInput.value !== '') {
    setTimeout(() => {
    }, 3000)
}