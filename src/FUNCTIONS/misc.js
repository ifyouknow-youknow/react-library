export function randomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function emailFix(isWithPrefix, email, appName) {
    if (isWithPrefix) {
        return `${appName.toLowerCase()}_${email}`;
    } else {
        return email.split('_')[1];
    }
}
