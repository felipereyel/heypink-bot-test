require("dotenv").config()
const { driver } = require('@rocket.chat/sdk');
const respmap  = require('./reply');

var myuserid;

async function runbot () {
    await driver.connect()
    myuserid = await driver.login();
    await driver.subscribeToMessages();
    await driver.reactToMessages( processMessages );

    await driver.sendToRoom(
      `@${process.env.ROCKETCHAT_USER} is listening ...`, 
      process.env.GREETING_ROOM
    );
}

async function processMessages(err, message, messageOptions) {
  if (err || message.u._id === myuserid) return;

  switch (messageOptions.roomType) {
    case "c":
      return respondToChannel(message, messageOptions);
    case "d":
      return respondToDM(message, messageOptions);
    default:
      return;
  }
}

async function respondToChannel(message, messageOptions) {
  if (process.env.RESPOND_TO_CHANNEL !== "true") return;

  const response = respmap[message.msg] ?? `@${message.u.username}, sorry didnt get that`;
  await driver.sendToRoomId(response, message.rid);
}

async function respondToDM(message, messageOptions) {
  if (process.env.RESPOND_TO_DM !== "true") return;

  const response = respmap[message.msg] ?? `@${message.u.username}, sorry didnt get that`;
  await driver.sendDirectToUser(response, message.u.username);
}

runbot();
