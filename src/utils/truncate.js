export default function truncate(/**string*/str, maxLength) {
    if(str.length > maxLength) return str.substring(0, maxLength-1) + "…";
    return str;
}