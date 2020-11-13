require("dotenv").config()
const { isEmpty } = require("lodash");
const bot = require('bbot');
const fetch = require('node-fetch');
const PRIVATE_MESSAGE_REGEX = /(.*)_([0-9]{13})/g;

const getConfigurations = async (botId) => {
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
    const responses = result.data.execute_statement.rows;

    for (const response of responses) {
        response.options = responses.filter(r => r.parent_id === response.id);
    }

    return responses;
}

const isNotDirect = (message) => {
    const isRCDM = message.user.room.type === "d";
    const isWAPrivate = message.user.room.name?.match(PRIVATE_MESSAGE_REGEX);
    const isRCMention = message.text?.includes(process.env.ROCKETCHAT_USER);
    const isWAMention = message.text?.includes(process.env.WHATSAPP_NUMBER);
    return !isRCDM && !isWAPrivate && !isRCMention && !isWAMention;
};

const iMatch = (str, exp) => str?.match(new RegExp(exp, "i"));

const rootMatcherBuilder = (response) => (message) => isEmpty(message.user.state);

const optionMatcherBuilder = (response) => (message) => message.user.state.id === response.parent_id && iMatch(message.text, response.opt.trigger);

const fallbackMatcherBuilder = (response) => (message) => message.user.state.id === response.id;

const optionReplyBuilder = (response) => response.options.map(r => `*${r.opt.trigger}* - ${r.opt.description}`).join("\n");

const optionsCallbackBuilder = (response) => (b) => {
    b.user.state = response;
    b.respond(`${response.template}\n\nDigite somente a primeira parte da opção desejada:\n${optionReplyBuilder(response)}`);
};

const nothingCallbackBuilder = (response) => (b) => {
    b.user.state = {};
    b.respond(response.template);
};

const redirectCallbackBuilder = (response) => (b) => {
    b.user.state = response;
    b.respond(response.template, "REDIRECT PLACEHOLDER");
};

const optionsFallbackBuilder = (response) => (b) => {
    b.respond(`${response.invalid_option_text}\n\nDigite somente a *primeira parte* da opção desejada:\n${optionReplyBuilder(response)}`);
};

const redirectFallbackBuilder = (response) => (b) => {
    b.respond(`Aguarde um pouco, em breve alguém vai te atender`);
};

const runBot = async () => {
    const responses = await getConfigurations(process.env.BOT_ID);

    // purge non direct messages
    bot.global.custom(isNotDirect, (b) => {});

    // debug
    bot.global.custom(
        (message) => iMatch(message.text, "state"), 
        (b) => b.respond(JSON.stringify(b.user.state, null, 4))
    );
    bot.global.custom(
        (message) => iMatch(message.text, "reset"), 
        (b) => b.respond(JSON.stringify(b.user.state={}, null, 4))
    );
    
    // root state
    const rootResponse = responses.filter(r => r.parent_id === -1)[0];
    bot.global.custom(rootMatcherBuilder(rootResponse), optionsCallbackBuilder(rootResponse));
        
    // nothing states
    const nothingResponses = responses.filter(r => r.event === "nothing");
    for (const response of nothingResponses) {
        bot.global.custom(optionMatcherBuilder(response), nothingCallbackBuilder(response));
    }
        
    // options states
    const optionsResponses = responses.filter(r => r.event === "options");
    for (const response of optionsResponses) {
        bot.global.custom(optionMatcherBuilder(response), optionsCallbackBuilder(response));
    }
        
    // redirect states
    const redirectResponses = responses.filter(r => r.event === "redirect");
    for (const response of redirectResponses) {
        bot.global.custom(optionMatcherBuilder(response), redirectCallbackBuilder(response));
    }

    // options fallbacks
    for (const response of optionsResponses) {
        bot.global.custom(fallbackMatcherBuilder(response), optionsFallbackBuilder(response));
    }

    // redirect fallbacks
    for (const response of redirectResponses) {
        bot.global.custom(fallbackMatcherBuilder(response), redirectFallbackBuilder(response));
    }

    bot.start(); // 🚀
}

runBot();
