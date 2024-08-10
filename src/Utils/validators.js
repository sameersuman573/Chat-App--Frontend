import {isValidUsername} from "6pp"

export const usernameValidators = (Username) => {

    if(!isValidUsername(Username))
    return { isValid: false , errorMessage:"Username is Invalid"}
}