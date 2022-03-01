export const regExpNames = new RegExp(/^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/)
export const regExpEmail = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/)
export const regExpPassword = new  RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)