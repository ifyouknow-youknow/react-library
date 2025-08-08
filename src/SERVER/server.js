import axios from 'axios';

const serverURL = "https://nothingbagel.com/";

export async function server_GET(endpoint) {
    if (typeof endpoint !== 'string') {
        console.error("Endpoint must be a string.");
        return;
    }

    try {
        const response = await axios.get(`${serverURL}/${endpoint}`);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error during server_GET:", error.message);
    }
}

export async function server_POST(endpoint, args) {
    if (typeof endpoint !== 'string') {
        console.error("Endpoint must be a string.");
        return;
    }

    try {
        const response = await axios.post(`${serverURL}/${endpoint}`, args);
        return response.data; // Return the object from the response
    } catch (error) {
        console.error("Error during server_POST:", error.message);
        return null;
    }
}

export async function GET(url, endpoint) {
    if (typeof endpoint !== 'string') {
        console.error("Endpoint must be a string.");
        return;
    }

    try {
        const response = await axios.get(`${url}/${endpoint}`);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error during server_GET:", error.message);
    }
}

export async function POST(url, endpoint, args) {
    if (typeof endpoint !== 'string') {
        console.error("Endpoint must be a string.");
        return;
    }

    try {
        const response = await axios.post(`${url}/${endpoint}`, args);
        return response.data; // Return the object from the response
    } catch (error) {
        console.error("Error during server_POST:", error.message);
        return null;
    }
}