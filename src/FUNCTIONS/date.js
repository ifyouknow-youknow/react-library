export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function formatShortDate(date) {
    if (!(date instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export function formatLongDate(date) {
    if (!(date instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    // Get the zero-based index and adjust for daysOfWeek starting with Monday
    const dayOfWeek = daysOfWeek[(date.getDay() + 6) % 7];
    const month = monthsOfYear[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek} ${month} ${day}, ${year}`;
}

export function formatLongerDate(date) {
    // Get day, month, and year
    const dayOfWeek = daysOfWeek[(date.getDay() + 6) % 7];
    const month = monthsOfYear[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    return `${dayOfWeek} ${month} ${day}, ${year} ${hours}:${minutes} ${period}`;
}

export function formatTime(date, isTwentyFourHour = false) {
    if (!(date instanceof Date)) {
        throw new Error("Input must be a valid Date object");
    }

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (isTwentyFourHour) {
        // 24-hour format
        return `${String(hours).padStart(2, '0')}:${minutes}`;
    } else {
        // 12-hour format
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${period}`;
    }
}

export function daysInMonth(month, year = new Date().getFullYear()) {
    if (typeof month !== 'number' || month < 1 || month > 12) {
        throw new Error("Month must be a number between 1 and 12.");
    }

    // JavaScript Date allows 0 for the last day of the previous month
    const days = new Date(year, month, 0).getDate();
    return parseFloat(days);
}
