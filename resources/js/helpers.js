import axios from 'axios';

export async function fetchAPI(route, { method = 'GET', body = null } = {}) {
    const isWriteMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());

    if (isWriteMethod) {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
    }

    const config = {
        method,
        url: `/api${route}`,
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            ...(body && { 'Content-Type': 'application/json' }),
        },
        ...(body && { data: JSON.stringify(body) }),
    };

    const { data } = await axios(config);

    return data;
}
