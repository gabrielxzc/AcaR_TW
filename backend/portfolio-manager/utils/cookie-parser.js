exports.parse = (request) => {
    let cookies = {}, rc = request.headers.cookie;

    rc && rc.split(';').forEach((cookie) => {
        let parts = cookie.split('=');
        cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return cookies;
}