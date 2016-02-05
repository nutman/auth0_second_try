# quick start instructions 
    run server on 3001 port:
    
    ```
    node ./server.js
    ```
    and run web server on 3000 port:
    ```
    serve ./app
    ```
# Auth0 + NodeJS API Seed
This is the seed project you need to use if you're going to create a NodeJS API. You'll mostly use this API either for a SPA or a Mobile app. If you just want to create a Regular NodeJS WebApp, please check [this other seed project](https://github.com/auth0/node-auth0/tree/master/examples/nodejs-regular-webapp)

This example is deployed at Heroku at http://auth0-nodejsapi-sample.herokuapp.com/ping

#Running the example
In order to run the example you need to have npm and nodejs installed.

Run `npm install` to ensure local dependencies are available.

You also need to set the ClientSecret and ClientId for your Auth0 app as enviroment variables with the following names respectively: `AUTH0_CLIENT_SECRET` and `AUTH0_CLIENT_ID`.

For that, the following should have been already created for you; if not, just create a file named `.env` in the directory and set the values like the following, the app will just work:

````bash
# .env file
AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
````

Once you've set those 2 enviroment variables, just run `node server.js` and try calling [http://localhost:3001/ping](http://localhost:3001/ping)

##How it works

 * server.js - app
 * server_conf.js - app config 
 * routes.js - all current routes (should be split)
 
 - acl
    
    * acl.js - connect acl with db
    * acl_conf.js - config for acl
    
 - app - Angular web app. (To start app run 'serve' in app folder. It should run in 3000 port)
    
    * home - if user is logged in - give him access if not propose him to log in, 
    also admin can manage users roles
    
    * libs - temporary directory with libs
     
 - auth0 
 
    * auth0.js - connect with AUTH0 service to get user from auth0 user
    * authenticate - connect with AUTH0 for checking user
 
 - conf - folder with configs for app
 
 - models - folder with user models
 
    * user.js - user model
    
 - routes - server routes