require("dotenv").config()
const { driver } = require('@rocket.chat/sdk');
const respmap  = require('./reply');

const BOTNAME = process.env.BOTNAME;
const ROOMS = [process.env.ROCKETCHAT_ROOM];

var myuserid;

const runbot = async () => {
    await driver.connect()
    myuserid = await driver.login();
    await driver.subscribeToMessages();
    await driver.reactToMessages( processDMs );

    await driver.sendToRoom(`${BOTNAME} is listening ...`, ROOMS[0]);
}

const processDMs = async (err, message, messageOptions) => {
  if (!err) {
    if (message.u._id === myuserid) return;

    const roomname = await driver.getRoomName(message.rid);

    const response = respmap[message.msg] ?? `${message.u.username}, sorry didnt get that`;
    await driver.sendToRoom(response, roomname);
  }
}

runbot()