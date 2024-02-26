import * as yup from "yup";

export const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").matches(
    /^(?=.*[!@#$%^&*()])(?=.*[0-9].*[0-9]).{8,}$/,
    "Password must include at least one special character and two numbers"
  ),
});

