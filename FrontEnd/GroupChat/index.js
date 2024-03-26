let userList = [];

const ul = document.getElementById('joined');
const users = document.getElementById('users');

window.addEventListener('DOMContentLoaded', async () => {
    try {
        let li1 = document.createElement('li');

        li1.appendChild(document.createTextNode('You Joined'));

        ul.appendChild(li1);

        let res = await axios.get('http://localhost:4000/get-user-list');
        // console.log(res.data.users);

        res.data.users.forEach(user => {
            console.log(user);
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(user.name));
            users.appendChild(li);
        })
    } catch (err) {
        console.log(err);
    }
});