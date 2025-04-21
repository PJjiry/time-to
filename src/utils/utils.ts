export function getTimeLeftFromInput(inputValue: string): string {
    const eventDate = new Date(inputValue);
    const now = new Date();
    const diffMs = eventDate.getTime() - now.getTime();

    if (isNaN(eventDate.getTime()) || diffMs <= 0) {
        return "Expired";
    }

    const totalMinutes = Math.floor(diffMs / 1000 / 60);
    const days = Math.floor(totalMinutes / 1440); // 1440 min/day
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);

    return parts.join(" and ") + " left";
}

export const generateRandomId = (): number => {
    return Math.floor(Math.random() * 1_000_000_000); // Generates a number between 0 and 999,999,999
};