require("dotenv").config();
const bot = require('bbot');

const { getConfigurations } = require("./abstra_api");
const { iMatch } = require("./utils");
const { 
    notDirectMatcher, 
    resetStateMatcher, 
    rootMatcherBuilder, 
    optionMatcherBuilder, 
    fallbackMatcherBuilder 
} = require("./matchers");
const { 
    optionsCallbackBuilder, 
    endCallbackBuilder,
    redirectCallbackBuilder, 
    optionsFallbackBuilder, 
    redirectFallbackBuilder 
} = require("./callbacks");

const runBot = async () => {
    const responses = await getConfigurations(process.env.BOT_ID);

    // purge non direct messages
    bot.global.custom(
        notDirectMatcher, 
        (b) => {}, 
        { id: "purge_non_direct_messages" }
    );

    // reset state when added or removed
    bot.global.custom(
        resetStateMatcher, 
        (b) => b.bot.memory.unset(b.message.user.room.id),
        { id: "reset_when_enter_or_leave" }
    );

    // debug
    bot.global.custom(
        (message) => iMatch(message.text, "state"), 
        (b) => b.respond(JSON.stringify(b.bot.memory.get(b.message.user.room.id), null, 4)), 
        { id: "debug_state" }
    );
    bot.global.custom(
        (message) => iMatch(message.text, "reset"), 
        (b) => b.bot.memory.unset(b.message.user.room.id) && b.respond("👍"), 
        { id: "debug_reset" }
    );
    
    // root state
    const rootResponse = responses.filter(r => r.parent_id === -1)[0];
    bot.global.custom(
        rootMatcherBuilder(rootResponse), 
        optionsCallbackBuilder(rootResponse), 
        { id: "root_message" }
    );
        
    // end states
    const endResponses = responses.filter(r => r.event === "nothing");
    for (const response of endResponses) {
        bot.global.custom(
            optionMatcherBuilder(response), 
            endCallbackBuilder(response), 
            { id: `${response.opt.trigger}_trigger_message` }
        );
    }
        
    // options states
    const optionsResponses = responses.filter(r => r.event === "options");
    for (const response of optionsResponses) {
        bot.global.custom(
            optionMatcherBuilder(response), 
            optionsCallbackBuilder(response), 
            { id: `${response.opt.trigger}_trigger_message` }
        );
    }
        
    // redirect states
    const redirectResponses = responses.filter(r => r.event === "redirect");
    for (const response of redirectResponses) {
        bot.global.custom(
            optionMatcherBuilder(response), 
            redirectCallbackBuilder(response), 
            { id: `${response.opt.trigger}_trigger_message` }
        );
    }

    // options fallbacks
    for (const response of optionsResponses) {
        bot.global.custom(
            fallbackMatcherBuilder(response), 
            optionsFallbackBuilder(response), 
            { id: `${response.opt.trigger}_fallback_message` }
        );
    }

    // redirect fallbacks
    for (const response of redirectResponses) {
        bot.global.custom(
            fallbackMatcherBuilder(response), 
            redirectFallbackBuilder(response), 
            { id: `${response.opt.trigger}_fallback_message` }
        );
    }

    bot.start(); // 🚀
}

runBot();

/*
TODOS:
- dept e pessoas
- multiplas filas
- image attachments

- state timeout
- max retrys?
*/