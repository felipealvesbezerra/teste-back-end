'use strict'

class AuthController {

    async auth({ request, response, auth }) {
        const { email, password } = request.all();

        try {

            const token = await auth.attempt(email, password); 

            return response.status(200).json(token); 

        } catch (error) {

            console.log(error)

            return response.status(404).json({
                message: "error during athentication"
            })

        }
    }

}

module.exports = AuthController
