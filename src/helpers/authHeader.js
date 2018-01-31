export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    return user ? 'Bearer ' + user.token : '';
}
