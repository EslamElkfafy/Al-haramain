export function timeAgo(givenTimestamp) {
    const givenTime = new Date(givenTimestamp);
    const currentTime = new Date();
    const seconds = Math.floor((currentTime - givenTime) / 1000);

    if (seconds < 60) {
        return `${seconds} sec. ago`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min. ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hr. ago`;
    } else {
        const days = Math.floor(seconds / 86400);
        return `${days} days ago`;
    }
}