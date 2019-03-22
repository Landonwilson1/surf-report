# Surf Report App

View published site [here](https://jaredreando.github.io/surf-report/)

#### A simple dashboard pulling NOAA buoy data to display a current surf report.
#### By Jared Reando
###### March 22, 2019

## Description

Surf Report is a simple, easy to read UI dashboard that displays live NOAA buoy data.

The current day's surf score is determined by taking the average of 3 data points:
  1. Wind Direction
  2. Swell Period
  3. Wave Size (Swell Period * Swell Height)

NOAA data is updated each hour, on the hour.

## Setup/Installation Requirements
#### 1. Clone the project to your local drive:
```
$ git clone https://github.com/jaredreando/surf-report
```
#### 2. Install project dependencies:
```
$ npm install
```
#### 3. Build and start local server hosting:
```
$ npm run start
```
#### 4. View the project in your web browser: http://localhost:8080/
#### 5. Run application tests:
```
$ npm run test
```

## Known Bugs

Page does not auto-refresh when new NOAA data is available. User must manually refresh page to see updated data.

## Support and contact details

jaredreando@gmail.com

## Technologies Used
- Javascript
- React
- HTML/CSS
- Webpack

### License

This software is licensed under the MIT license.
