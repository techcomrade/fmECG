# fmECG

<!-- ## Table of Contents -->

- [fmECG](#fmecg)
  - [Project Overview](#project-overview)
  - [Installation](#installation)
    - [NodeJS (server-web)](#nodejs-server)
    - [ReactJS (frontend_web)](#reactjs-frontend)
    - [Flutter (mobile app)](#flutter-mobile-app)

## Project Overview

Project fmECG is Application for measuring ECG pregnant's data that uses Flutter for Mobile App, NodeJS for back-end and ReactJS for web admin. 

## Installation

### NodeJS (server)
Make sure you have .env file in folder. You can choose one of two following approach:
1. Using localhost 

Make sure you turn on MySQL server (or turn on with xampp) and config .env file with your SQL server
```bash
cd server
npm install
npm run migration
npm start
```

2. Using docker (recommend)
Make sure docker is running inside your computer
```bash
cd server
make app
```
If terminal shows `Connection to MySQL database has been established successfully.`, the back-end has been setup successfully.

### ReactJS (frontend)
Make sure you have .env file in frontend_web folder. Bin folder doesn't need .env file.
1. Run the bin folder (required NodeJS v18 or higher version)

Bin is a small NodeJS project to authenticate in front-end with cookies because ReactJS can not process cookies and set header for network. 
```bash
cd frontend_web/bin
npm install
npm start
```

2. Run the frontend_web folder
Make sure you get and config the .env file and run server, bin folder before.
```bash
cd frontend_web
npm install
npm start
```
If terminal shows `webpack compiled successfully`, the front-end has been setup successfully.

### Flutter (mobile app)

To connect to back-end in Flutter App, `localhost` is default in `api_constant.dart`, but if you are in trouble with `localhost` (with Android simulator) and cannot connect to API, use correct IP of your Internet instead of `localhost`.

Make sure you have turned on Android simulator.

```bash
cd mobile_app
flutter run
```

or `Run without Debugging on VSCode`.

Login to App: thaikaka@gmail.com / 12345678


### How to deploy server and web 

1. deploy server 
  - open terminal console, then run code `cd /var/www` to access deploy folder 
  - run `git clone https://github.com/techcomrade/fmECG.git` to clone project 
  - switch to `deploy` branch
  - run `cd fmECG/server-web` to access server-web folder
  - now you need to copy env.prod file and paste in server-web folder
  - run `npm install` to install package 
  - check file env.prod again and make sure the values in there are correct
  - after doing all the above work you can run project by `pm2 start server.sh`

2. deploy web
- open terminal console, then run code `cd /var/www` to access deploy folder 
  - run `git clone https://github.com/techcomrade/fmECG.git` to clone project 
  - switch to `deploy` branch
  - run `npm run build` to build frontend_web in your local laptop
  - upload build folder from your local environment into bin folder in host 
  - copy code in file index.html in build folder and paste them in home.js file in `frontend_web/bin/views`
  - run `cd frontend_web/bin` to access bin folder 
  - now you need to copy env.prod file and paste in bin folder
  - run `npm install` to install package in `frontend_web/bin/views`
  - check file env.prod again and make sure the values in there are correct
  - after doing all the above work you can run project by `pm2 start frontend.sh` 

3. check deploy status
  - run `pm2 status` to check deploy status 
  - if status is `running`, then you are done deploying

