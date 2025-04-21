export type Priority = "high" | "medium" | "low";

export type EventItemProps = {
    id: number;
    title: string;
    description?: string;
    timeLeft: string;
    labels?: string[];
    priority: Priority;
};

export interface EventData {
    id?: string;
    title: string;
    description?: string;
    datetime: string;
    tags: string[];
    priority: Priority;
}

export interface EventFormProps {
    initialData?: EventData;
    onSave: (event: EventData) => void;
    onCancel: () => void;
}

export interface HeaderProps {
    eventsLength: number;
    onOpenForm: () => void;
    buttonIsVisible: boolean;
}