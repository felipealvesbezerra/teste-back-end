'use strict'

const User = use("App/Models/User");

class UserController {

    async store({request, response}) {
        const { email, password, username } = request.all();

        try {

        const user = await User.create({
            email: email, 
            username: username,
            password: password
        }); 

        return response.status(200).json(user); 

        } catch (error) {

            return response.status(404).json({
                message: "error creating user"
            })

        }
    }

    async show({request, response}) {

        try {

            const user = await User.find(params.id)
      
            if (!user) {
              return response.status(404).json({
                message: "user not found"
              })
            }
      
            return response.status(200).json(user);
      
          } catch (error) {
      
            console.log(error)
      
            return response.status(400).json({
              message: "error showing user"
            })
          }
    }
 
    async update({request, response}) {
        
        const data = request.all();

        try {

        const user = await User.find(params.id)

        if (!user) {
            return response.status(404).json({
            message: "user not found"
            })
        }

        await user.merge(data)

        return response.status(200).json(user);

        } catch (error) {

        console.log(error)

        return response.status(400).json({
            message: "error showing user"
        })

        } 
    }
}

module.exports = UserController
