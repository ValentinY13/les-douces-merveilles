export function generateDateRange(range: { date: string, end_date?: string, reason?: string }) {
    const dates = [] as { date: Date, reason?: string }[];

    let currentDate = new Date(range.date);

    if (!range.end_date) {
        dates.push({date: new Date(currentDate), reason: range.reason});
    } else {
        let endDate = new Date(range.end_date);

        while (currentDate <= endDate) {
            dates.push({date: new Date(currentDate), reason: range.reason});
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    return dates;
}