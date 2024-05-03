let userList = [];
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const ul = document.getElementById('joined');
const users = document.getElementById('users');
const send_msg = document.getElementById('send_msg');
const txt_msg = document.getElementById('txt_msg');
const tblChat = document.getElementById('tblChat');
let token = localStorage.getItem('token');
let chatStr = localStorage.getItem('chatHistory');
let chatArray = JSON.parse(chatStr);
console.log(chatArray);
let lastChat = '';

window.addEventListener('DOMContentLoaded', async () => {
    try {


        await getChats();

        chatArray.forEach(chat => {
            console.log(chat)
            printChat(chat);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });

        console.log(chatArray);

        chatStr = JSON.stringify(chatArray);
        localStorage.setItem('chatHistory', chatStr);

        const socket = io('http://localhost:4000');

        socket.on('message', message => {
            console.log(`Recieved Message:`, message);
            outputMessage(message);

            chatMessages.scrollTop = chatMessages.scrollHeight;
            msg.value = '';
            msg.focus();
        });


        // let res = await axios.get('http://localhost:4000/get-user-list', {
        //     headers: {
        //         'Authorization': token
        //     }
        // });
        // // console.log(res.data);

        // res.data.users.forEach(user => {
        //     console.log(user);

        // })

        let date = new Date().toISOString();

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let username = localStorage.getItem(localStorage.getItem(token));
            console.log(username);
            let msgObj = {
                msg: msg.value,
                date: date,
                username: username
            }

            socket.emit('chat-message', msgObj);

            let message = await axios.post('http://localhost:4000/message/post-message', msgObj, {
                headers: {
                    'Authorization' : token
                }
            });

        });

        // console.log(lastChat);

        // setInterval(async () => await getNewChats(lastChat), 5000);
        
    } catch (err) {
        console.log(err);
    }
});



async function getChats () {
    try {
        if (chatArray.length === 0) {
            let chats = await axios.get(`http://localhost:4000/message/get-messages/${chatArray[chatArray.length - 1]}`, {
                headers: {
                    'Authorization': token
                }
            });
            chats.data.messages.forEach(chat => {
                // console.log(chat);
                chatArray.push({
                    id: chat.id,
                    message: chat.message,
                    username: chat.user.name,
                    time: chat.timestamp
                });
            });
        } else {
            let chats = await axios.get(`http://localhost:4000/message/get-messages/${chatArray[chatArray.length - 1].id}`, {
                headers: {
                    'Authorization': token
                }
            });
            chats.data.messages.forEach(chat => {
                // console.log(chat);
                chatArray.push({
                    id: chat.id,
                    message: chat.message,
                    name: chat.user.name
                });            
            });
        }
        // console.log(chats.data);
    } catch (err) {
        console.log(err);
    }
       
}


function printChat(message) {
    let timest = moment(message.time).format('MMMM D, h:mm a');    
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${timest}</span></p>
    <p class="text">
        ${message.message}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

function outputMessage (message) {
    // let timest = moment(message.time).format('MMMM D, h:mm a');    
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.message}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}