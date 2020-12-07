const { isEmpty } = require("lodash");
const bot = require('bbot');
const { iMatch } = require("./utils");

const notDirectMatcher = (message) => {
    return message.event === "enter" || message.event === "leave";
};

const resetStateMatcher = (message) => message.text === process.env.ROCKETCHAT_USER;

const rootMatcher = (message) => {
    const currentState = bot.memory.get(message.user.room.id);
    return isEmpty(currentState) || Date.now() - currentState.created_at > 60*60*1000;  
};

const optionMatcherBuilder = (response) => (message) => bot.memory.get(message.user.room.id).id === response.parent_message_id && iMatch(message.text, response.trigger);

const fallbackMatcherBuilder = (response) => (message) => bot.memory.get(message.user.room.id).id === response.id;

// order matters
exports.notDirectMatcher = notDirectMatcher;
exports.resetStateMatcher = resetStateMatcher;
exports.rootMatcher = rootMatcher;

exports.optionMatcherBuilder = optionMatcherBuilder;
exports.fallbackMatcherBuilder = fallbackMatcherBuilder;
