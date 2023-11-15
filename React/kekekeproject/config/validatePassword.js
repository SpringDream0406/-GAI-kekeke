function validatePassword_hiLv (password) {
    // 최소 8자 이상, 20자 이하, 대문자, 소문자, 숫자, 특수 문자가 포함되어야 함
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    return passwordRegex.test(password);
}

function validatePassword_midLv (password) {
    // 최소 8자 이상, 20자 이하, 특수 문자 포함
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;

    return passwordRegex.test(password);
}

module.exports = { validatePassword_hiLv, validatePassword_midLv }