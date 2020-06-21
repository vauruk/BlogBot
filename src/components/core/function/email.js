export const isEmail = (email) => {
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if (er.test(email)) {
        return true;
    } else {
        return false;
    }
}