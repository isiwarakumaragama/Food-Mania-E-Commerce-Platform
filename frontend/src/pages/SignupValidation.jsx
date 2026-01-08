function Validation(values){
    let errors = {};
    const password_pattern = /^(?=.*\S).{6,}$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name
    if (!values.name === "") {
        errors.name = "Name is required";
    }

    
    // Validate password
    if (!values.password === "" || !password_pattern.test(values.password)) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
}
export default Validation;