require("dotenv").config()
const { driver } = require('@rocket.chat/sdk');
const fetch = require('node-fetch');

var myUserID;
var responses = [];
const usersState = {};

async function runbot() {
    responses = await getConfigurations(process.env.BOT_ID);

    await driver.connect();
    myUserID = await driver.login();

    await driver.subscribeToMessages();
    await driver.reactToMessages(processMessages);

    // await driver.sendToRoom(`I am on`, process.env.GREETING_ROOM);
}

async function getConfigurations(botId) {
    const body = {
        query: "mutation Something($statementId: ID!, $args: [Arg]) { execute_statement(statement_id: $statementId, args: $args){ rows } }",
        variables: { statementId: process.env.CONFIGURATION_QUERY_ID, args: [botId] }
    }

    const response = await fetch(process.env.TABLES_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    return result.data.execute_statement.rows;
}

async function processMessages(err, message, messageOptions) {
    if (err || message.u._id === myUserID) return;

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
    if (message.u.username !== process.env.CLIENT_USERNAME) return;
    var response;
    const lastState = usersState[message.rid];

    if (!lastState || lastState.response.event === "nothing" || lastState.response.event === "redirect") {
        response = responses.filter(resp => resp.parent_id === -1)[0];
    } 
    else {
        response = responses
            .filter(resp => resp.parent_id === lastState.response.id)
            .filter(resp => message.msg.includes(resp.opt.trigger))[0];

        if (!response) {
            await driver.sendToRoomId(lastState.response.invalid_option_text, message.rid);
            return;
        }
    }

    await driver.sendToRoomId(response.template, message.rid);

    if (response.event === "redirect") {
        await driver.sendToRoomId(`REDIRECIONANDO PARA ${response.redirect_to.join(" OU ")}`, message.rid);
    }

    usersState[message.rid] = { response, createdAt: Date.now() };
}

// deprecated
async function respondToDM(message, messageOptions) {
    if (process.env.RESPOND_TO_DM !== "true") return;
    var response;
    const lastState = usersState[message.u._id];

    if (!lastState || lastState.response.event === "nothing" || lastState.response.event === "redirect") {
        response = responses.filter(resp => resp.parent_id === -1)[0];
    } 
    else {
        response = responses
            .filter(resp => resp.parent_id === lastState.response.id)
            .filter(resp => message.msg.includes(resp.opt.trigger))[0];

        if (!response) {
            await driver.sendDirectToUser(lastState.response.invalid_option_text, message.u.username);
            return;
        }
    }

    await driver.sendDirectToUser(response.template, message.u.username);

    if (response.event === "redirect") {
        await driver.sendDirectToUser(
            `REDIRECIONANDO PARA ${response.redirect_to.join(" OU ")}`, 
            message.u.username
        );
    }

    usersState[message.u._id] = { response, createdAt: Date.now() };
}

runbot();
