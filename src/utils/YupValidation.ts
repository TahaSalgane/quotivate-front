import * as Yup from 'yup';

export const quoteSchema = Yup.object().shape({
    author: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    tags: Yup.array().of(Yup.string().required()).required(),
});
export const tagSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
});
export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(5, 'Must be 5 characters or more').required('required'),
});
export const registerSchema = Yup.object().shape({
    username: Yup.string().min(5, 'Must be 5 characters or more').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(5, 'Must be 5 characters or more').required('required'),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null as any], 'password not matched')
        .required('required'),
});
export const forgotSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
});
export const commentSchema = Yup.object().shape({
    text: Yup.string().required('Required'),
});
