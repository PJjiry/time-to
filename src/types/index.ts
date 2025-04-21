export type Priority = "high" | "medium" | "low";

export type EventItemProps = {
    id: number;
    title: string;
    description?: string;
    datetime: string;
    labels?: string[];
    priority: Priority;
};

export interface EventFormProps {
    initialData?: EventItemProps | null,
    onAdd: (event: EventItemProps) => void,
    onEdit: (event: EventItemProps) => void,
    onCancel: () => void,
}

export interface HeaderProps {
    eventsLength: number;
    onOpenForm: () => void;
    buttonIsVisible: boolean;
}