# Quick start instructions 

In order to run the example you need to have npm and nodejs installed.

Run `npm install` to ensure local dependencies are available.

You also need to set the ClientSecret and ClientId for your Auth0 app as enviroment variables with the following names respectively: `AUTH0_CLIENT_SECRET` and `AUTH0_CLIENT_ID`.

For that, the following should have been already created for you; if not, just create a file named `config.json` in the `conf` directory and set the values like the following, the app will just work:

````bash
# conf/config.json file
{
  AUTH0_CLIENT_SECRET: myCoolSecret,
  AUTH0_CLIENT_ID: myCoolClientId,
  AUTH0_DOMAIN: yourAuth0Domain,
  AUTH0_CALLBACK_URL: yourAuth0CallbackUrl
````

Once you've set those 2 enviroment variables, just run `npm start` and try calling [http://localhost:3001/ping](http://localhost:3001/ping)

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