# how to run frontend_web
1. open terminal, cd frontend_web/bin, npm install and npm start to run bin
2. open a new terminal cd frontend_web, npm install and npm start to run frontend_web
3. open a new terminal cd server-web to run server 
# description bin folder: 
1. bin folder is small project that code by nodejs 
2. it is used for sign in and register feature 
3. because reactjs can not process cookie and set header for network, so we need to create a small project nodejs for that 

# deploy flow web:

1. run code "npm run build" to "build" frontend_web 
2. copy folder "build" in frontend_web, after that paste into "bin" project 
3. copy code of index.html in "build" folder, after that paste into home.js in "views" folder
4. Change the value of "ENVIRONMENT" variable in the env file to "product"
5. run "npm start" "bin" project, no need to run frontend_web
