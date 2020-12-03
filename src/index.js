require("dotenv").config();
const bot = require('bbot');

const { getConfigurations } = require("./abstra_api");
const { iMatch } = require("./utils");
const { 
    notDirectMatcher, 
    resetStateMatcher, 
    rootMatcher, 
    optionMatcherBuilder, 
    fallbackMatcherBuilder 
} = require("./matchers");
const { 
    resetCallbackBuilder,
    optionsCallbackBuilder, 
    endCallbackBuilder,
    redirectCallbackBuilder, 
    optionsFallbackBuilder, 
    redirectFallbackBuilder 
} = require("./callbacks");

const runBot = async () => {
    const config = await getConfigurations(process.env.BOT_ID);

    // debug
    bot.global.custom(
        (message) => iMatch(message.text, "state"), 
        (b) => b.respond(JSON.stringify(b.bot.memory.get(b.message.user.room.id), null, 4)), 
        { id: "debug_state" }
    );
    bot.global.custom(
        (message) => iMatch(message.text, "reset"), 
        (b) => {
            b.bot.memory.unset(b.message.user.room.id);
            bot.adapters.message.api.post('rooms.setCustomFields', {
                rid: b.user.room.id,
                data: { departmentQueue: null }
            });
            b.respond("✅");
        }, 
        { id: "debug_reset" }
    );

    // purge non direct messages
    bot.global.custom(
        notDirectMatcher, 
        (b) => {}, 
        { id: "purge_non_direct_messages" }
    );

    // reset state when added or removed
    bot.global.custom(
        resetStateMatcher, 
        resetCallbackBuilder(),
        { id: "reset_when_enter_or_leave" }
    );
    
    // root state
    bot.global.custom(
        rootMatcher, 
        optionsCallbackBuilder(config.initial_message), 
        { id: "root_message" }
    );
        
    // end states
    const endResponses = config.messages.filter(m => !m.event || m.event === "end");
    for (const response of endResponses) {
        bot.global.custom(
            optionMatcherBuilder(response), 
            endCallbackBuilder(response), 
            { id: `${response.id}_trigger_end_message` }
        );
    }
        
    // options states
    const optionsResponses = config.messages.filter(r => r.event === "options");
    for (const response of optionsResponses) {
        bot.global.custom(
            optionMatcherBuilder(response), 
            optionsCallbackBuilder(response), 
            { id: `${response.id}_trigger_options_message` }
        );
    }
        
    // goback states
    const gobackResponses = config.messages.filter(r => r.event === "goback");
    for (const response of gobackResponses) {
        bot.global.custom(
            optionMatcherBuilder(response), 
            optionsCallbackBuilder(response.parent_message), 
            { id: `${response.id}_trigger_goback_message` }
        );
    }
        
    // redirect states
    const redirectResponses = config.messages.filter(r => r.event === "redirect");
    for (const response of redirectResponses) {
        bot.global.custom(
            optionMatcherBuilder(response), 
            redirectCallbackBuilder(response), 
            { id: `${response.id}_trigger_redirect_message` }
        );
    }

    // options fallbacks
    for (const response of optionsResponses) {
        bot.global.custom(
            fallbackMatcherBuilder(response), 
            optionsFallbackBuilder(response), 
            { id: `${response.id}_options_fallback_message` }
        );
    }

    // redirect fallbacks
    for (const response of redirectResponses) {
        bot.global.custom(
            fallbackMatcherBuilder(response), 
            redirectFallbackBuilder(response), 
            { id: `${response.id}_redirect_fallback_message` }
        );
    }

    bot.start(); // 🚀
}

runBot();
// getConfigurations(process.env.BOT_ID).then(res => console.log(JSON.stringify(res, null, 4))).catch(err => console.log(err));

/*
TODOS:
- dept e pessoas
- image attachments
- max retrys?
*/