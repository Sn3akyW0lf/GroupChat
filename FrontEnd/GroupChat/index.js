let userList = [];

const ul = document.getElementById('joined');
const users = document.getElementById('users');
const send_msg = document.getElementById('send_msg');
const txt_msg = document.getElementById('txt_msg');
const tblChat = document.getElementById('tblChat');
let token = localStorage.getItem('token');
let lastChat = '';

window.addEventListener('DOMContentLoaded', async () => {
    try {
        let li1 = document.createElement('li');

        li1.appendChild(document.createTextNode('You Joined'));

        ul.appendChild(li1);

        let res = await axios.get('http://localhost:4000/get-user-list', {
            headers: {
                'Authorization': token
            }
        });
        console.log(res.data);

        res.data.users.forEach(user => {
            console.log(user);
            if (localStorage.getItem(localStorage.getItem(token)) === user.name) {
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(`${user.name} (You)`));
                users.appendChild(li);
            } else {
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(user.name));
                users.appendChild(li);
            }

        })

        let date = new Date().toISOString();

        // getChats();

        await getChats();

        send_msg.onclick = async function () {
            let msgObj = {
                user: token,
                msg: txt_msg.value
            };

            let response = await axios.post('http://localhost:4000/message/post-message', msgObj, {
                headers: {
                    'Authorization': token
                }
            });
            printChat(response.data);
        };

        console.log(lastChat);

        setInterval(async () => await getNewChats(lastChat), 5000);
        
    } catch (err) {
        console.log(err);
    }
});



async function getChats () {
    try {
        let chats = await axios.get(`http://localhost:4000/message/get-messages`, {
            headers: {
                'Authorization': token
            }
        });

        chats.data.messages.forEach(chat => {
            // console.log(chat.createdAt);
            printChat(chat);
        });
    } catch (err) {
        console.log(err);
    }
       
}

async function getNewChats(date) {
    try {
        let chats = await axios.get(`http://localhost:4000/message/get-messages/${date}`, {
            headers: {
                'Authorization': token
            }
        });

        chats.data.messages.forEach(chat => {
            console.log(chat);
            printChat(chat);
        });

        // console.log(chats.data.messages[0].createdAt, date, chats.data.messages[0].createdAt < date);
    } catch (err) {
        console.log(err);
    }
}

function printChat(row) {
    lastChat = row.createdAt;    
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

    if (localStorage.getItem(localStorage.getItem(token)) === row.sender) {
        td1.appendChild(document.createTextNode(`You`));
        td1.className = 'fw-bold text-info';
    } else {
        td1.appendChild(document.createTextNode(`${row.sender}`));
        td1.className = 'fw-bold text-success';        
    }

    td2.appendChild(document.createTextNode(`${row.message}`));

    tr.appendChild(td1);
    tr.appendChild(td2);

    tblChat.appendChild(tr);
}