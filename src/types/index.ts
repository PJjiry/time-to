export type Priority = "high" | "medium" | "low";

export type EventItem = {
    id: string;
    title: string;
    description?: string;
    datetime: string;
    labels?: string[];
    priority: Priority;
};

export interface EventFormProps {
    initialData?: EventItem | null,
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

export interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}
