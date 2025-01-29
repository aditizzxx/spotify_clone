import moment from "moment";

export function formatDateRange(date, startDate, endDate) {
    // const moment = require('moment');
    let formattedStartDate, formattedEndDate;

    switch (date) {
        case "today":
            formattedStartDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
            // console.log(formattedStartDate, formattedEndDate)
            break;
        case "yesterday":
            formattedStartDate = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
            // console.log(formattedStartDate, formattedEndDate)
            break;
        case "current_week":
            formattedStartDate = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            // console.log(formattedStartDate, formattedEndDate)
            break;
        case "current_month":
            formattedStartDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            // console.log(formattedStartDate, formattedEndDate)
            break;
        case "previous_month":
            formattedStartDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
            // console.log(formattedStartDate, formattedEndDate)
            break;
        case "select_Date":
            formattedStartDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
            // console.log(formattedStartDate, formattedEndDate)
            break;
        default:
            // console.log("Invalid date option");
            return res.status(400).send('Invalid date option');
    }
    return { startDate: formattedStartDate, endDate: formattedEndDate };
}