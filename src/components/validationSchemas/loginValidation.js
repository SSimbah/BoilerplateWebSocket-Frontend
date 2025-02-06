import * as Yup from 'yup';

export const loginValidation = Yup.object({
    username: Yup.string().required("Please enter username"),
    password: Yup.string().required("Please enter password"),
});