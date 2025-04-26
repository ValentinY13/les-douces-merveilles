function generateSecureNumber(length = 7) {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // Sans caractères ambigus
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, x => chars[x % chars.length]).join('');
}

export function generateOrderNumber() {
    const orderCode = generateSecureNumber();
    const now = Date.now();
    return `CM-${orderCode}-${now}`;
}