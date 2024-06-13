const moment = require('moment');

const stajDate = (startDate, endDate, isSixDay) => {
    let current = moment(startDate);
    const end = moment(endDate);
    let result = [];
    while (current <= end) {
        const dayOfWeek = current.day();
        if (isSixDay && dayOfWeek !== 0) {
            result.push(current.format('YYYY-MM-DD'));
        } else if (!isSixDay && dayOfWeek >= 1 && dayOfWeek <= 5) {
            result.push(current.format('YYYY-MM-DD'));
        }
        current.add(1, 'day');
    }
    return result;
}

module.exports = stajDate;