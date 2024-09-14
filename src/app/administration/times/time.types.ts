export interface Time {
    id?: string;
    name: string;
    capacity: number;
    event_id: number;
}

export interface TimeUpdate {
    name?: string;
    capacity?: number;
    event_id?: number;
}

export interface TimeForFrontend {
    id?: string;
    name: string;
    capacity: number;
    occupiedPositions: number;
    freePositions: number;
    event_id: number;
}

export interface TimeSum {
    paid: number;
    free: number;
    reserved: number;
    total: number;
    cancelled: number;
}