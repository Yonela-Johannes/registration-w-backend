const RegistrationNumbers = () => {
    let number = ''
    const regex = /[a-zA-Z]{1,2}\s[0-9]{1,6}(\s|-)?([0-9]{2,3})?[a-zA-Z]?/
    const regisAbreviations = () => {
        const indexes = ['ca', , 'cy', 'cf', 'cn', 'cl', 'ck', 'cw', 'ct', 'cf', 'cj']
        return indexes.map(el => el.toUpperCase())
    }
    const setNumber = (reg) => number = reg.toUpperCase().trim()
    const getRegNumber = () => number
    let validateNum = () => regex.test(number)
    const getValidReg = () => validateNum() && getRegNumber().length > 12 ? '' : number
    const checkRegistrationAbrev = () => {
        let introArray = false
        for (let i = 0; i < regisAbreviations().length; i++) {
            if (getRegNumber().startsWith(regisAbreviations()[i])) introArray = true
        }
        return introArray
    }
    const checkRegistration = (dbreg) => dbreg === getValidReg()
    const splitRegistration = () => getValidReg().split(' ')[0].toLowerCase()
    const successHandler = (check) => {
        let success = ''
        if (check === false && validateNum() && checkRegistrationAbrev() && getRegNumber().length <= 12) {
            success = `${getRegNumber()}, registration number added successfully`
        } else if (check === true && getRegNumber().length <= 12 && checkRegistrationAbrev()) {
            success = `${getRegNumber()}, already exist`
        }
        return success
    }
    const errorHandler = (check) => {
        let error = ''
        if (getRegNumber().length < 1) {
            return error = 'Enter registration number!'
        }
        else if (getRegNumber().length > 12) {
            return error = `${getRegNumber()} exceeds registration limit!`
        }
        else if (!validateNum() || getRegNumber().length > 12 || !checkRegistrationAbrev()) {
            return error = "Please enter valid registration number!"
        }
        return error
    }

    return {
        setNumber,
        regisAbreviations,
        getRegNumber,
        validateNum,
        getValidReg,
        checkRegistrationAbrev,
        checkRegistration,
        errorHandler,
        successHandler,
        splitRegistration,
    }
}

module.exports = RegistrationNumbers