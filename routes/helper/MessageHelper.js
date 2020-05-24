module.exports = {
    SuccessMessage: (type) => {
        if (type === "write") {
            let data = {
                status: true,
                message: "Your request was Successfully to written in the Database."
            }
            return data
        }
    },
    FailedMessage: (type, message = null) => {
        if (type === "write" && message !== null) {
            let data = {
                status: false,
                message: message
            }

            return data
        }
        
        if (type === "write") {
            let data = {
                status: false,
                message: "Your request was failed to written in the Database."
            }

            return data
        }

        
    }
}