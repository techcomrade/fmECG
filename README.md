# fmECG

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Project fmECG is Application for measuring ECG pregnant's data that uses Flutter for Mobile App and NodeJS for back-end. 

## Installation

####NodeJS
Make sure you turn on MySQL (can turn on with xampp)
```bash
cd server
npm install
npm start
```
If terminal shows `connected DB`, the back-end has been setup successfully.

####Flutter

To connect to back-end in Flutter App, `localhost` is default in `api_constant.dart`, but if you are in trouble with `localhost` (with Android simulator) and cannot connect to API, use correct IP of your Internet instead of `localhost`.

Make sure you have turned on Android simulator.

```Dart
flutter run
```
or `Run without Debugging on VSCode`.
