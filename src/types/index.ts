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
    onCancel: () => void,
}

export interface HeaderProps {
    eventsLength: number;
    onOpenForm: () => void;
    buttonIsVisible: boolean;
}

export type EventItemProps = {
    event: EventItem,
}

export type EventListProps = {
    events: EventItem[],
    onStartEdit: (event: EventItem) => void,
    onDelete: (id: number) => void,
    onLabelClick: (label: string) => void,
    isFormVisible: boolean
}
