export function getTimeLeftFromInput(inputValue: string): string {
    const eventDate = new Date(inputValue);
    const now = new Date();
    const diffOfTheTimes = eventDate.getTime() - now.getTime();

    if (isNaN(eventDate.getTime()) || diffOfTheTimes <= 0) {
        return "Expired";
    }

    const totalMinutes = Math.floor(diffOfTheTimes / 1000 / 60);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    if (minutes === 0) parts.push("0 minutes")

    return parts.join(" and ") + " left";
}

export const generateRandomId = (): number => {
    return Math.floor(Math.random() * 1_000_000_000); // Generates a number between 0 and 999,999,999
};

export function getNowForInput(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const getLabelColor = (label: string): string => {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = hash % 360;

    return `hsl(${hue}, 70%, 80%)`;
};