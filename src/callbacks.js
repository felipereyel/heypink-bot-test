const bot = require('bbot');

const optionReplyBuilder = (response) => response.options.map(r => `*${r.opt.trigger}* - ${r.opt.description}`).join("\n");

const optionsCallbackBuilder = (response) => (b) => {
    b.bot.memory.set(b.message.user.room.id, response);
    b.respond(`${response.template}\n\nDigite somente a primeira parte da opção desejada:\n${optionReplyBuilder(response)}`);
};

const endCallbackBuilder = (response) => (b) => {
    b.bot.memory.unset(b.message.user.room.id);
    b.respond(response.template);
};

const redirectCallbackBuilder = (response) => (b) => {
    b.bot.memory.set(b.message.user.room.id, response);
    b.respond(response.template);
    bot.adapters.message.api.post('rooms.setCustomFields', {
        rid: b.user.room.id,
        data: { departmentQueue: "GENERAL" }
    });
};

const optionsFallbackBuilder = (response) => (b) => {
    b.respond(`${response.invalid_option_text}\n\nDigite somente a *primeira parte* da opção desejada:\n${optionReplyBuilder(response)}`);
};

const redirectFallbackBuilder = (response) => (b) => {
    b.respond(`Aguarde um pouco, em breve alguém vai te atender`);
};

exports.endCallbackBuilder = endCallbackBuilder;
exports.optionsCallbackBuilder = optionsCallbackBuilder;
exports.optionsFallbackBuilder = optionsFallbackBuilder;
exports.redirectCallbackBuilder = redirectCallbackBuilder;
exports.redirectFallbackBuilder = redirectFallbackBuilder;