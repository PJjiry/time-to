export type EventItemProps = {
    id: number;
    title: string;
    description?: string;
    timeLeft: string;
    labels?: string[];
    priority: "high" | "medium" | "low";
};