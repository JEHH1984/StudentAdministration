
export interface ISubscriptionRequest {
    id?: string;
    alumno: string;
    clase: string;
    costo: number;
    diaPago: number;
    estado: number;
}

export interface ISubscription {
    id: string;
    alumno: string;
    clase: string;
    costo: number;
    diaPago: number;
    estado: number;
}
