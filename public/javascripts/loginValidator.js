window.addEventListener('load',()=>{

    const form = document.querySelector('Form');
    const email = document.querySelector('#email-m').value;
    const pass = document.querySelector('#pass-m');
    const check = document.querySelector('#remember')

    form.addEventListener('submit', (e) => {

        let expReg = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/

        if(!expReg.test(email)){
            return false;
          }

    })
})