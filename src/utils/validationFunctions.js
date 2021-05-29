module.exports = {
    isDataMissing: (data) => {
        for (let prop in data) {
            if (typeof data[prop] === "undefined" || data[prop] === null || data[prop] === "" || data[prop].length === 0) {
                return true
            }
        }
    },

    isCpfValid: (cpf) => {
        if (typeof cpf !== "string" || cpf.length !== 11)
            return false

        let cpfNumbers = []
        let verificationDigits = 0
        let firstDigitValidationSum = 0
        let firstDigitValidationRest = 0
        let secondDigitValidationSum = 0
        let secondDigitValidationRest = 0
        let resultingDigits = 0

        cpfNumbers = cpf.split('')

        verificationDigits = cpfNumbers[9] + cpfNumbers[10]

        for (let index = 0; index < 9; index++) {
            let value = cpfNumbers[index]
            value = value * (10 - index)
            firstDigitValidationSum += value
        }

        firstDigitValidationRest = (firstDigitValidationSum * 10) % 11 === 10 ? 0
            : (firstDigitValidationSum * 10) % 11

        for (let index = 0; index < 10; index++) {
            let value = cpfNumbers[index]
            value = value * (11 - index)
            secondDigitValidationSum += value
        }

        secondDigitValidationRest = (secondDigitValidationSum * 10) % 11 === 10 ? 0
            : (secondDigitValidationSum * 10) % 11

        resultingDigits = String(firstDigitValidationRest) + String(secondDigitValidationRest)

        if (resultingDigits !== verificationDigits)
            return false

        return true
    },

    isEmailValid: (email) => {
        const regularExpression = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/
        return regularExpression.test(email)
    },

    isDateValid: (dateString) => {
        const dateFormatRegex = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/

        if (!dateFormatRegex.test(dateString))
            return false

        const parts = (dateString).split("-")

        if (!parts.length == 3)
            return false

        const [year, month, day] = parts

        if (day > 31 || day < 1 || day === undefined) return false
        if (month > 12 || month < 1 || month === undefined) return false
        if (year === undefined) return false

        return true
    }
}