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
export function removeDupes(arr) {
    return [...new Set(arr)];
}
export function removeDupesByObj(arr, key) {
    const seen = new Set();
    return arr.filter(obj => {
        const val = obj[key];
        if (seen.has(val)) return false;
        seen.add(val);
        return true;
    });
}
export function removeDupeArray(arrays) {
    const seen = new Set();
    return arrays.filter(array => {
        // Normalize nested array or array of objects
        const norm = JSON.stringify(
            array.map(item =>
                typeof item === 'object' && item !== null
                    ? Object.keys(item).sort().reduce((acc, key) => {
                        acc[key] = item[key];
                        return acc;
                    }, {})
                    : item
            )
        );
        if (seen.has(norm)) return false;
        seen.add(norm);
        return true;
    });
}
