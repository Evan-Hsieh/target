var testbutton = document.getElementById('test_button')

testbutton.addEventListener('click', function (event) {
    console.log('test button clicked')
    document.querySelector('#body_id').classList.add('is-shown')
})
