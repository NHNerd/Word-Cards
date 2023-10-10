export function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export function passwordValidation(password) {
  if (/^[a-zA-Z0-9.]{6,16}$/.test(password)) {
    return true;
  } else {
    return false;
  }
}
