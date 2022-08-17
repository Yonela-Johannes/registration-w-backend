const RegistrationNumbers = () => {
    let number = ''
    let selectedTownReg = []
    const regex = /[a-zA-Z]{1,2}\s[0-9]{2,5}(\s|\-)?([0-9]{2,3})?[a-zA-Z]?/
    const regisAbreviations = () => {
        const indexes = ['ca', 'caa', 'wp', 'cy', 'cf', 'cn', 'cl', 'ck', 'cw', 'ct', 'caw', 'cf', 'cj']
        return indexes.map(el => el.toUpperCase())
    }
    const limit = (list) => list < 20

    const setNumber = (reg) => {
        number = reg.toUpperCase().trim()
    }

    const getRegNumber = () => number
    const validNo = () => regex.test(number)
    const getValidReg = () => validNo() ? number : ''

    const regNumber = () => {
        if (getRegNumber().includes(regisAbreviations())) {
            console.log(regisAbreviations())
            return true
        } else {
            return false
        }
    }

    const checkPrefixAndAffix = () => regisAbreviations().includes(getRegNumber())

    const checkReg = () => {
        let introArray = false
        for (let i = 0; i < regisAbreviations().length; i++) {
            if (getRegNumber().startsWith(regisAbreviations()[i])) introArray = true
        }
        return introArray
    }

    const setTownReg = (string, array) => {
        selectedTownReg = array.filter(arr => arr.startsWith(string))
    }

    const setByTown = (string, array) => {
        selectedTownReg = string !== "refresh" ? array.filter(arr => arr.startsWith(string.toUpperCase())) : array
    }

    const getTownReg = () => selectedTownReg

    return {
        limit,
        setNumber,
        regisAbreviations,
        getRegNumber,
        validNo,
        getValidReg,
        regNumber,
        checkPrefixAndAffix,
        checkReg,
        setTownReg,
        getTownReg,
        setByTown,
    }
}

module.exports = RegistrationNumbers