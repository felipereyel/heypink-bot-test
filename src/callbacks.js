const bot = require('bbot');
const { availabilityChecker } = require("./utils");

const resetCallbackBuilder = () => (b) =>  b.bot.memory.unset(b.message.user.room.id);

const optionReplyBuilder = (response) => response.child_messages.map(r => `*${r.trigger}* - ${r.description}`).join("\n");

const optionsCallbackBuilder = (response) => (b) => {
    b.bot.memory.set(b.message.user.room.id, { id: response.id, created_at: Date.now() });
    b.respond(`${response.message}\n\nDigite somente a primeira parte da opção desejada:\n${optionReplyBuilder(response)}`);
};

const endCallbackBuilder = (response) => (b) => {
    b.bot.memory.unset(b.message.user.room.id);
    b.respond(response.message);
};

const redirectCallbackBuilder = (response) => (b) => {
    if (availabilityChecker(response.event_details.availability)) {
        b.bot.memory.set(b.message.user.room.id, { id: response.id, created_at: Date.now() });
        b.respond(response.message);
        bot.adapters.message.api.post('rooms.setCustomFields', {
            rid: b.user.room.id,
            data: { departmentQueue: response.event_details.redirect_to }
        });
    } else {
        b.bot.memory.unset(b.message.user.room.id);
        b.respond(response.event_details.unavailable_text);
    }
};

const optionsFallbackBuilder = (response) => (b) => {
    b.respond(`${response.event_details.invalid_option_text}\n\nDigite somente a *primeira parte* da opção desejada:\n${optionReplyBuilder(response)}`);
};

const redirectFallbackBuilder = (response) => (b) => {
    b.respond(`Aguarde um pouco, em breve alguém vai te atender`);
};

exports.resetCallbackBuilder = resetCallbackBuilder;
exports.optionsCallbackBuilder = optionsCallbackBuilder;
exports.endCallbackBuilder = endCallbackBuilder;
exports.redirectCallbackBuilder = redirectCallbackBuilder;
exports.optionsFallbackBuilder = optionsFallbackBuilder;
exports.redirectFallbackBuilder = redirectFallbackBuilder;