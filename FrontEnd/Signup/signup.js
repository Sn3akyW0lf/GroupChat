const myForm = document.querySelector('#my-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const msg_username = document.getElementById('msg_username');
const msg_email = document.getElementById('msg_email');
const msg_dup = document.getElementById('msg_dup');
const msg_phone = document.getElementById('msg_phone');
const msg_dup_phone = document.getElementById('msg_dup_phone');
const msg_password = document.getElementById('msg_password');

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    try {
        e.preventDefault();

        if (username.value === '') {
            msg_username.style.color = 'chocolate';
            msg_username.style.background = 'beige';
            msg_username.innerHTML = 'Please Enter Username!';
            setTimeout(() => msg_username.remove(), 3000);
        } else if (email.value === '') {
            msg_email.style.color = 'chocolate';
            msg_email.style.background = 'beige';
            msg_email.innerHTML = 'Please Enter Email!';
            setTimeout(() => msg_email.remove(), 3000);
        } else if (phone.value === '') {
            msg_phone.style.color = 'chocolate';
            msg_phone.style.background = 'beige';
            msg_phone.innerHTML = 'Please Enter Phone Number!';
            setTimeout(() => msg_phone.remove(), 3000);
        } else if (password.value === '') {
            msg_password.style.color = 'chocolate';
            msg_password.style.background = 'beige';
            msg_password.innerHTML = 'Please Enter Password!';
            setTimeout(() => msg_password.remove(), 3000);
        } else {
            // console.log(username.value, email.value, password.value);

            objUser = {
                username: username.value,
                email: email.value,
                phone: phone.value,
                password: password.value
            };

            console.log(objUser);

            let res = await axios.post('http://localhost:4000/signup', objUser);

            // window.location.replace('../Login/login.html');
            alert('Successfully Signed Up!');

            // username.value = '';
            // email.value = '';
            // password.value = '';
            // studentParentPhone.value = '';
        }



    } catch (err) {
        console.log('err---', err.response.data.errors[0].path === 'phone');
        if (err.response.data.errors[0].path === 'email') {
            msg_dup.style.color = 'chocolate';
            msg_dup.style.background = 'beige';
            msg_dup.innerHTML = 'Sorry, the Email already Exists!';
            alert('The User Already Exists, Please Login');
        } else if (err.response.data.errors[0].path === 'phone') {
            msg_dup_phone.style.color = 'chocolate';
            msg_dup_phone.style.background = 'beige';
            msg_dup_phone.innerHTML = 'Sorry, the Phone Number is already Registered!';
        }
    }
}