export interface Ticket {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    // TODO: Enum
    status?: number;
    description?: string;
    group_id: number;
}
