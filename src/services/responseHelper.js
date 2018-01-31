export default rsp => rsp.ok ? rsp.json() : rsp.json().then(msg => Promise.reject(msg));
