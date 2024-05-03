const moment = require('moment');

function formatMessage (username, message) {
    // console.log(username, text);
    return {
        username,
        message,
        time: moment().format('MMMM D, h:mm a')
    }
}

module.exports = formatMessage;