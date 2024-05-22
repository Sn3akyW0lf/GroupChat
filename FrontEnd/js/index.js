const chatroom = document.getElementById('chatroom');
const desc = document.getElementById('desc');
const chatForm = document.getElementById('chatForm');
let token = localStorage.getItem('token');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log(`chatroom: ${chatroom.value}, description: ${desc.value}`);

    let roomObj = {
        groupName: chatroom.value,
        description: desc.value
    }

    let room = await axios.post('http://localhost:4000/group/create-room', roomObj, {
        headers: {
            'Authorization' : token
        }
    });

    console.log(room);
})