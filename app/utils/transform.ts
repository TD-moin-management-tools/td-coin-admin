// 对象转 url string
export function objectToQueryString(obj: Record<string, any>) {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(obj[key]);
            keyValuePairs.push(`${encodedKey}=${encodedValue}`);
        }
    }
    return keyValuePairs.join('&');
}
