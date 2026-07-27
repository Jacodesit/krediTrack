export function formatAccessCode(code) {
    if (!code) return "";

    return code.match(/.{1,3}/g).join("-");
}