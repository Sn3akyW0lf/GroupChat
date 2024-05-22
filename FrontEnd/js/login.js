const myForm = document.querySelector('#my-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const msg_email = document.getElementById('msg_email');
const msg_password = document.getElementById('msg_password');

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    try {
        e.preventDefault();

        if (email.value === '') {
            msg_email.style.color = 'chocolate';
            msg_email.style.background = 'beige';
            msg_email.innerHTML = 'Please Enter Email!';
            setTimeout(() => msg_email.remove(), 3000);
        } else if (password.value === '') {
            msg_password.style.color = 'chocolate';
            msg_password.style.background = 'beige';
            msg_password.innerHTML = 'Please Enter Password!';
            setTimeout(() => msg_password.remove(), 3000);
        } else {
            objUser = {
                email: email.value,
                password: password.value,
            };

            let res = await axios.post('http://localhost:4000/login', objUser);

            console.log(res.data);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem(`${res.data.token}` , res.data.email);
            localStorage.setItem(`${res.data.email}`, res.data.name);
            const chatArray = []
            let string = JSON.stringify(chatArray);
            localStorage.setItem('chatHistory', string);

            window.location.replace('./index.html');

        }



    } catch (err) {
        console.log(err);

        if (err.response.status === 404) {
            msg_dup.style.color = 'chocolate';
            msg_dup.style.background = 'beige';
            msg_dup.innerHTML = 'The Email is not Registered, Please Register!';
        } else if (err.response.status === 401) {
            msg_wp.style.color = 'chocolate';
            msg_wp.style.background = 'beige';
            msg_wp.innerHTML = 'The Password is Wrong!';
        }
        
    }
}