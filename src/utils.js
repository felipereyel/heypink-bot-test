const triv_msg_regex = /(.*)_([0-9]{10,13})/g;
const iMatch = (str, exp) => str ? str.match(new RegExp(exp, "i")) : false;

exports.triv_msg_regex = triv_msg_regex;
exports.iMatch = iMatch;
