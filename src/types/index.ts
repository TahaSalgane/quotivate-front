import UserInterface from 'types/interfaces/user.interface';

export type userAuthType = {
    name: string;
};

export interface HttpResponse<T> {
    success: boolean;
    realData?: T;
}

export type authCredentials = {
    email: string;
    password: string;
};

export type userChangePassword = {
    oldPassword: string;
    password: string;
    confirmPassword: string;
};

export type userReqResetPassword = {
    email: string;
};

export type userActivePassword = {
    password: string;
    confirmPassword: string;
};

export interface UserAuthInterface extends UserInterface {
    iat?: number;
    exp?: number;
}

export type ModalProps = {
    show: boolean;
    handleClose: () => void;
    handleAction?: () => void;
    title: string;
    btnText?: string;
    variant?: string;
    children: React.ReactNode | string;
};
