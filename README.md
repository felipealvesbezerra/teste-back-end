# Account Manager API

A simple rest API to manage super market customers accounts, this API uses a jwt token (generated at login) to authenticate accounts and protect API routes.
This API was programmed using Node.js and MongoBD.

![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)
![](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## Author
<a href="https://jordanbispo.com.br">Jordan Rodrigo Souza Bispo</a>

## Installation

1º step - In the root folder create the .env file containing the environment variables according to the .env.example file.

2º step - Run
```bash 
    > npm i 

      or

    > yarn
```
to install the node's dependencies.

3º step - Run 
```bash 
    > npm start 

       or

    > yarn start
``` 

to start server.

## Usage
 
Use the post, get, put and patch methods, with the correct parameters in the following end poits:
    *obs.: all responses from the server contain an object with a message, ({message: "message"}), and if requested a get or patch can also contain objects and lists according to the route

## TEST.http
Case you are using VSCode, Install / enable the extension "REST Client" to test in a simple way and testing the api routes with just one click.

If the extension is enabled, it is enough that the server is running on localhost to test the routes.

In the file above each route there is written "Send Request"
and just click on the word and the request will be made.

https://github.com/Huachao/vscode-restclient/blob/master/README.md



## License
[MIT](https://choosealicense.com/licenses/mit/)