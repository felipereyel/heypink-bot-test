const triv_msg_regex = /(.*)_([0-9]{10,13})/g;

const iMatch = (str, exp) => str ? str.match(new RegExp(exp, "i")) : false;

const availabilityChecker = (weeklyvailability) => {
    // "09:00/17:00", "09:00/17:00, sex@09:00/15:00" or "09:00/17:00, qui@09:00/15:00, sex@09:00/15:00"
    const dayOfWeek = new Date().toLocaleTimeString('pt-BR', { weekday: 'short' }).replace("á", "a").slice(0, 3);
    const hour = new Date().toLocaleTimeString('pt-BR', { hour: "numeric", minute: "numeric" });

    const [ defaultHours, ...rest ] = weeklyvailability.split(",").map(h => h.trim());
    const specificHours = rest.filter(h => h.includes(dayOfWeek)).map(h => h.replace(dayOfWeek, "").replace("@", "").trim())[0];
    const [start, end] = (specificHours ? specificHours : defaultHours).split("/");

    return start <= hour && hour <= end;
};

exports.triv_msg_regex = triv_msg_regex;
exports.iMatch = iMatch;
exports.availabilityChecker = availabilityChecker;
