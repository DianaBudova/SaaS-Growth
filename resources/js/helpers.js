import axios from 'axios';

export async function fetchAPI(route) {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

    const { data } = await axios.get(`/api${route}`, {
        withCredentials: true,
        headers: { Accept: 'application/json' },
    });

    return data.result;
}

export async function postAPI(route, body = {}) {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

    const { data } = await axios.post(`/api${route}`, body, {
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return data.result;
}
