const moment = require("moment-timezone");

const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

const iMatch = (str, exp) => str ? str.match(new RegExp(exp, "i")) : false;

const availabilityChecker = (weeklyvailability) => {
    // "09:00/17:00", "09:00/17:00, sex@09:00/15:00" or "09:00/17:00, qui@09:00/15:00, sex@09:00/15:00"
    const dayOfWeek = daysOfWeek[moment().tz("America/Sao_Paulo").day()];
    const hour = moment().tz("America/Sao_Paulo").format("HH:mm");

    const [ defaultHours, ...rest ] = weeklyvailability.split(",").map(h => h.trim());
    const specificHours = rest.filter(h => h.includes(dayOfWeek)).map(h => h.replace(dayOfWeek, "").replace("@", "").trim())[0];
    const [start, end] = (specificHours || defaultHours).split("/");

    return start <= hour && hour <= end;
};

exports.iMatch = iMatch;
exports.availabilityChecker = availabilityChecker;
