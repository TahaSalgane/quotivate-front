export type userAuthType = {
    name: string;
};

export interface HttpResponse<T> {
    success: boolean;
    realData?: T;
}
