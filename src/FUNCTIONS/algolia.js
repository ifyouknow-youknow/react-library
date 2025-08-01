import { algoliasearch } from 'algoliasearch';

/**
 * Create/Update object in Algolia
 */
export async function createAlgolia(appId, apiKey, indexName, objectId, object) {
    try {
        const client = algoliasearch(appId, apiKey);

        await client.saveObject({
            indexName,
            body: {
                objectID: objectId,
                ...object,
            },
        });

        return true;
    } catch (err) {
        console.error("Algolia saveObject error:", err);
        return false;
    }
}

/**
 * Delete object from Algolia
 */
export async function deleteAlgolia(appId, apiKey, indexName, objectId) {
    try {
        const client = algoliasearch(appId, apiKey);

        await client.deleteObject({
            indexName,
            objectID: objectId,
        });

        return true;
    } catch (err) {
        console.error("Algolia deleteObject error:", err);
        return false;
    }
}

/**
 * Search Algolia
 */
export async function searchAlgolia(
    appId,
    apiKey,
    indexName,
    keywords,
    {
        lat = null,
        lng = null,
        radiusInMeters = 10000,
        isExact = false,
        exactField = null,
        exactValue = null,
        ignoreFields = [],
    } = {}
) {
    try {
        const client = algoliasearch(appId, apiKey);

        const params = {
            hitsPerPage: 100,
        };

        // Exact match (ignores geo)
        if (isExact && exactField && exactValue !== null) {
            params.filters = `${exactField}:"${exactValue}"`;
        } else if (lat !== null && lng !== null) {
            params.aroundLatLng = `${lat},${lng}`;
            params.aroundRadius = radiusInMeters;
            params.getRankingInfo = true;
        }

        // Search the index
        const response = await client.searchSingleIndex({
            indexName,
            searchParams: {
                query: isExact ? '' : keywords,
                ...params,
            },
        });

        // Remove ignored fields from each hit
        const cleanedHits = response.hits.map((hit) => {
            ignoreFields.forEach((field) => {
                delete hit[field];
            });
            return hit;
        });

        return cleanedHits;
    } catch (err) {
        console.error("Algolia search error:", err);
        return [];
    }
}