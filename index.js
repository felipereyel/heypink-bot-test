require("dotenv").config()
const { driver } = require('@rocket.chat/sdk');
const { messages } = require("@rocket.chat/sdk/dist/lib/driver");
const fetch = require('node-fetch');

var myUserID;
var responses = [];
const usersState = {};
const PRIVATE_MESSAGE_REGEX = /(.*)_([0-9]{13})/g;

async function runbot() {
    responses = await getConfigurations(process.env.BOT_ID);

    await driver.connect();
    myUserID = await driver.login();

    await driver.subscribeToMessages();
    await driver.reactToMessages(processMessages);
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
    const isConfigMessage = message.t;
    const isMyOwn = message.u._id === myUserID;
    const isNotFromChannel = messageOptions.roomType !== "c";
    const isNotFromClient = message.u.username !== process.env.CLIENT_USERNAME;
    if (err || isConfigMessage || isMyOwn || isNotFromChannel || isNotFromClient) return;

    const privateMessageMatches = messageOptions.roomName.match(PRIVATE_MESSAGE_REGEX);
    if (privateMessageMatches) {
        return await respondToPrivateMessage(message, messageOptions);
    } else if (message.msg.includes(process.env.GROUP_MENTION)) {
        return await respondToGroupMessage(message, messageOptions);
    }

    return;
}

async function respondToPrivateMessage(message, messageOptions) {
    const currentState = stateHandler(message.rid, message);
    
    if (currentState.error) {
        await driver.sendToRoomId(currentState.response.invalid_option_text, message.rid);
    } else {
        await driver.sendToRoomId(currentState.response.template, message.rid);
        if (currentState.response.event === "redirect") {
            await driver.sendToRoomId(`[PLACEHOLDER] ADICIONANDO AO CANAL ${currentState.response.redirect_to.join(", ")}`, message.rid);
        }
    }
}

async function respondToGroupMessage(message, messageOptions) {
    const currentState = stateHandler(message.rid, message);
    
    if (currentState.error) {
        await driver.sendToRoomId(currentState.response.invalid_option_text, message.rid);
    } else {
        await driver.sendToRoomId(currentState.response.template, message.rid);
        if (currentState.response.event === "redirect") {
            await driver.sendToRoomId(`[PLACEHOLDER] ADICIONANDO AO CANAL ${currentState.response.redirect_to.join(", ")}`, message.rid);
        }
    }
}

function stateHandler(stateKey, message) {
    let response;
    const currentState = usersState[stateKey];
    
    if (!currentState || currentState.response.event === "nothing" || currentState.response.event === "redirect") {
        response = responses.filter(resp => resp.parent_id === -1)[0];
    } else {
        response = responses
            .filter(resp => resp.parent_id === currentState.response.id)
            .filter(resp => message.msg.includes(resp.opt.trigger))[0];
    }

    if (response) {
        usersState[stateKey] = { response, createdAt: Date.now() };
    } else {
        usersState[stateKey] = { ...currentState, error: true };
    }

    return usersState[stateKey];
}

runbot();
