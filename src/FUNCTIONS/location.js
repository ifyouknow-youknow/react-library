// Encode lat/lon to geohash (default precision = 10 chars)
export function encodeGeohash(lat, lon, precision = 10) {
    // Clamp inputs to valid ranges
    lat = Math.max(-90, Math.min(90, lat));
    lon = Math.max(-180, Math.min(180, lon));

    const base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
    let latRange = [-90.0, 90.0];
    let lonRange = [-180.0, 180.0];

    let hash = "";
    let bit = 0;
    let ch = 0;
    let evenBit = true;

    while (hash.length < precision) {
        if (evenBit) {
            // refine lon
            const mid = (lonRange[0] + lonRange[1]) / 2;
            if (lon >= mid) {
                ch = (ch << 1) + 1;
                lonRange[0] = mid;
            } else {
                ch = (ch << 1) + 0;
                lonRange[1] = mid;
            }
        } else {
            // refine lat
            const mid = (latRange[0] + latRange[1]) / 2;
            if (lat >= mid) {
                ch = (ch << 1) + 1;
                latRange[0] = mid;
            } else {
                ch = (ch << 1) + 0;
                latRange[1] = mid;
            }
        }

        evenBit = !evenBit;
        bit++;

        if (bit === 5) {
            hash += base32[ch];
            bit = 0;
            ch = 0;
        }
    }
    return hash;
}
export function decodeGeohash(geohash) {
    const base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
    let latRange = [-90.0, 90.0];
    let lonRange = [-180.0, 180.0];
    let evenBit = true;

    for (const char of geohash) {
        const bits = base32.indexOf(char.toLowerCase());
        if (bits === -1) throw new Error("Invalid geohash");

        for (let mask = 16; mask >= 1; mask >>= 1) {
            if (evenBit) {
                // refine longitude
                const mid = (lonRange[0] + lonRange[1]) / 2;
                if (bits & mask) lonRange[0] = mid;
                else lonRange[1] = mid;
            } else {
                // refine latitude
                const mid = (latRange[0] + latRange[1]) / 2;
                if (bits & mask) latRange[0] = mid;
                else latRange[1] = mid;
            }
            evenBit = !evenBit;
        }
    }

    return {
        lat: (latRange[0] + latRange[1]) / 2,
        lon: (lonRange[0] + lonRange[1]) / 2,
        bounds: {
            minLat: latRange[0],
            maxLat: latRange[1],
            minLon: lonRange[0],
            maxLon: lonRange[1]
        }
    };
}