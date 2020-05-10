export function getProfileText(value, { intl }) {
    if (typeof value === 'string') {
        return value;
    } else {
        return value[intl?.locale ?? 'en'] ?? value;
    }
}
