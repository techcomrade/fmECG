# fmECG

<!-- ## Table of Contents -->

- [fmECG](#fmecg)
  - [Project Overview](#project-overview)
  - [Installation](#installation)
    - [NodeJS (server)](#nodejs-server)
    - [Flutter (mobile app)](#flutter-mobile-app)

## Project Overview

Project fmECG is Application for measuring ECG pregnant's data that uses Flutter for Mobile App and NodeJS for back-end. 

## Installation

### NodeJS (server)
You can choose one of two following approach:
1. Using localhost 
Make sure you turn on MySQL (can turn on with xampp)
```bash
cd server
npm install
npm start
```

2. Using docker (recommend)
Make sure docker is running inside your computer
```bash
cd server
make app
```
If terminal shows `connected DB`, the back-end has been setup successfully.

### Flutter (mobile app)

To connect to back-end in Flutter App, `localhost` is default in `api_constant.dart`, but if you are in trouble with `localhost` (with Android simulator) and cannot connect to API, use correct IP of your Internet instead of `localhost`.

Make sure you have turned on Android simulator.

```bash
cd mobile_app
flutter run
```
or `Run without Debugging on VSCode`.
