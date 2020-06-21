import md5 from 'crypto-js/md5';

export const loadGravatar = (email) => {
    const gravatarUrl = 'https://www.gravatar.com/avatar/';
    let hashGravatar = md5(email);
    let url = gravatarUrl + hashGravatar + '?d=mp&s=120'
    //console.log(email, url)
    return url;
}