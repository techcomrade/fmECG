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
You can choose one of two following approach:
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
1. Run the bin folder (required NodeJS v18 or higher version)

Bin is a small NodeJS project to authenticate in front-end with cookies because ReactJS can not process cookies and set header for network. 
```bash
cd frontend_web
cd bin
npm install
npm start
```

2. Run the frontend_web folder
Make sure you get the .env file and run server, bin folder before
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
