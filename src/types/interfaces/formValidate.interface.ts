export interface QuoteFormValues {
    author: string;
    content: string;
    tags: string[];
}
export interface TagFormValues {
    _id?: string;
    name: string;
    createdAt?: any;
}

export interface loginFormValues {
    email: string;
    password: string;
}
export interface registerFormValues {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
}
export interface forgotFormValues {
    email: string;
}
