import axios from 'axios';

export async function fetchAPI(route) {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

    const { data } = await axios.get(route, {
        withCredentials: true,
        headers: { Accept: 'application/json' },
    });

    return data.result;
}
