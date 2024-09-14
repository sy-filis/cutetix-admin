export interface Ticket {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    status?: number;
    description?: string;
    group_id: number;
}
