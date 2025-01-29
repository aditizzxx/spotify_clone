import moment from "moment";

const today = moment();
const yesterday = moment().subtract(1, 'day');
const startOfWeek = moment().startOf('week');
const endOfWeek = moment();
const startOfMonth = moment().startOf('month');
const endOfMonth = moment();
const startOfPreviousMonth = moment().subtract(1, 'month').startOf('month');
const endOfPreviousMonth = moment().subtract(1, 'month').endOf('month');

const formattedDates = {
    today: today.format('MMM DD'),
    yesterday: yesterday.format('MMM DD'),
    currentWeek: `${startOfWeek.format('MMM DD')} - ${endOfWeek.format('MMM DD')}`,
    currentMonth: `${startOfMonth.format('MMM DD')} - ${endOfMonth.format('MMM DD')}`,
    previousMonth: `${startOfPreviousMonth.format('MMM DD')} - ${endOfPreviousMonth.format('MMM DD')}`
};

export default formattedDates;



