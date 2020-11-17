const { isEmpty } = require("lodash");
const bot = require('bbot');
const { triv_msg_regex, iMatch } = require("./utils");

const notDirectMatcher = (message) => {
    const isRCDM = message.user.room.type === "d";
    const isWAPrivate = message.user.room.name?.match(triv_msg_regex);
    const isRCMention = message.text?.includes(`${process.env.ROCKETCHAT_USER}`);
    const isWAMention = message.text?.includes(`@${process.env.WHATSAPP_NUMBER}`);
    const isManageMessage = message.event === "enter" || message.event === "leave";
    return (!isRCDM && !isWAPrivate && !isRCMention && !isWAMention) || isManageMessage;
};

const resetStateMatcher = (message) => message.text === process.env.ROCKETCHAT_USER;

const rootMatcherBuilder = (response) => (message) => isEmpty(bot.memory.get(message.user.room.id));

const optionMatcherBuilder = (response) => (message) => bot.memory.get(message.user.room.id).id === response.parent_id && iMatch(message.text, response.opt.trigger);

const fallbackMatcherBuilder = (response) => (message) => bot.memory.get(message.user.room.id).id === response.id;

// order matters
exports.notDirectMatcher = notDirectMatcher;
exports.resetStateMatcher = resetStateMatcher;
exports.rootMatcherBuilder = rootMatcherBuilder;
exports.optionMatcherBuilder = optionMatcherBuilder;
exports.fallbackMatcherBuilder = fallbackMatcherBuilder;
