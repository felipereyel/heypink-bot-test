require("dotenv").config()
const { isEmpty } = require("lodash");
const bot = require('bbot');
const fetch = require('node-fetch');
const PRIVATE_MESSAGE_REGEX = /(.*)_([0-9]{13})/g;

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

async function runBot() {
    const responses = await getConfigurations(process.env.BOT_ID);

    // debug
    bot.global.custom(
        (b) => b.text.includes("state"), 
        (b) => b.respond(JSON.stringify(b.user.state, null, 4))
    );
    bot.global.custom(
        (b) => b.text.includes("reset"), 
        (b) => b.respond(JSON.stringify(b.user.state={}, null, 4))
    );
    
    // set root state
    const rootResponse = responses.filter(r => r.parent_id === -1)[0];
    bot.global.custom(
        (b) => isEmpty(b.user.state),
        (b) => {
            b.user.state = rootResponse;
            b.respond(rootResponse.template);
        }
    );
        
    // set options states
    const optionsResponses = responses.filter(r => r.event === "options");
    for (const response of optionsResponses) {
        bot.global.custom(
            (b) => b.user.state.id === response.parent_id && b.text.includes(response.opt.trigger), 
            (b) => {
                b.user.state = response;
                b.respond(response.template);
            }
        );
    }
        
    // set nothing states
    const nothingResponses = responses.filter(r => r.event === "nothing");
    for (const response of nothingResponses) {
        bot.global.custom(
            (b) => b.user.state.id === response.parent_id && b.text.includes(response.opt.trigger), 
            (b) => {
                b.user.state = {};
                b.respond(response.template);
            }
        );
    }
        
    // set redirect states
    const redirectResponses = responses.filter(r => r.event === "redirect");
    for (const response of redirectResponses) {
        bot.global.custom(
            (b) => b.user.state.id === response.parent_id && b.text.includes(response.opt.trigger), 
            (b) => {
                b.user.state = {};
                b.respond(response.template, "REDIRECT PLACEHOLDER");
            }
        );
    }

    // set fallbacks
    for (const response of optionsResponses) {
        bot.global.custom(
            (b) => b.user.state.id === response.id, 
            (b) => b.respond(response.invalid_option_text)
        );
    }

    bot.start(); // 🚀
}

runBot();
