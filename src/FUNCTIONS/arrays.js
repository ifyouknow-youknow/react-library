export function sortArray(arr, desc = false) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array.");
    }

    return arr.sort((a, b) => {
        return desc ? b - a : a - b;
    });
}
export function sortArrayByObj(arr, field, desc = false) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array.");
    }

    return arr.sort((a, b) => {
        if (typeof a[field] === "undefined" || typeof b[field] === "undefined") {
            throw new Error(`Field "${field}" does not exist on some objects in the array.`);
        }

        // Handle sorting for both numbers and strings
        if (a[field] < b[field]) return desc ? 1 : -1;
        if (a[field] > b[field]) return desc ? -1 : 1;
        return 0; // If equal, no sorting
    });
}