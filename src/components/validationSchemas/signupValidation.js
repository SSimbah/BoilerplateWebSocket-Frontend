import * as Yup from 'yup';

export const signupValidation = Yup.object({
    role: Yup.string().required("Please select role"),
    username: Yup.string().min(3).required("Please enter username"),
    email: Yup.string().email("Please Enter Valid email").required("Please enter email"),
    password: Yup.string().min(5).required("Please enter password"),
});