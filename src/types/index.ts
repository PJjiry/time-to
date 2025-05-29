export type Priority = "high" | "medium" | "low";

export type EventItem = {
    id: number;
    title: string;
    description?: string;
    datetime: string;
    labels?: string[];
    priority: Priority;
};

export interface EventFormProps {
    initialData?: EventItem | null,
    onAdd: (event: EventItem) => void,
    onEdit: (event: EventItem) => void,
}

export interface HeaderProps {
    eventsLength: number;
}

export type EventItemProps = {
    event: EventItem,
    onLabelClick: (label: string) => void,
}

export type EventListProps = {
    events: EventItem[],
    onLabelClick: (label: string) => void,
}
