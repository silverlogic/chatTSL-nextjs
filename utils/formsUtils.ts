import * as Yup from 'yup'

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  email: Yup.string()
    .email('Please provide a properly formatted email address')
    .required('This field is required'),
})
