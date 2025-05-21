'use client'

import { parse } from 'cookie';

const baseUrl = "http://localhost:4000";

let chaveApi = "";
if (typeof document !== 'undefined') {
    let cookies = parse(document.cookie);
    if (cookies.cookieAuth !== undefined) {
        chaveApi = cookies.cookieAuth;
    }
}

// Seu código de criação do cliente HTTP (fetch wrapper ou axios etc)
// Por exemplo, com fetch:

async function httpClient(url, options = {}) {
    options.headers = {
        ...options.headers,
        'chaveapi': chaveApi,
        'Content-Type': 'application/json'
    };

    const res = await fetch(baseUrl + url, options);
    return res;
}

export default {
    get: (url) => httpClient(url, { method: 'GET' }),
    post: (url, body) => httpClient(url, { method: 'POST', body: JSON.stringify(body) }),
    put: (url, body) => httpClient(url, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (url) => httpClient(url, { method: 'DELETE' })
};
