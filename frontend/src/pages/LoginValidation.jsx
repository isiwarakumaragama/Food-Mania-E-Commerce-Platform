function Validation(values){
    let error = {};
    const password_pattern = /^(?=.*\S).{6,}$/;
    const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Validate email
    if (values.email === "") {
        error.email = "Email is required";
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Please enter a valid email";
    }
    else{
        error.email = ""
    }

    // Validate password
    if (!values.password === "" || !password_pattern.test(values.password)) {
        error.password = "Password must be at least 6 characters";
    }
    else{
        error.password = ""
    }

    return error;
}
export default Validation;