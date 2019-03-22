# Surf Report App

Click [here](https://jaredreando.github.io/surf-report/) to view published Surf Report hosted on GitHub.

#### A simple dashboard that fetches NOAA buoy data and displays a current surf report.
#### By Jared Reando
###### March 22, 2019

## Description

Surf Report is a simple, easy to read UI dashboard that displays the latest NOAA buoy data.

The day's current surf score is determined by averaging the values of 3 data points:
  1. Wind Direction
  2. Swell Period
  3. Wave Size (Swell Period * Swell Height)

Each of these data points are assigned a 1-5 score based on these parameters:

##### Wind Direction Scores (WWD)
| Condition | Score |
| :---      | :---: |
|E Wind     |   5   |
|NE Wind    |   4   |
|SE Wind    |   4   |
|S Wind     |   3   |
|All Others |   1   |


##### Swell Period (SwP)
| Condition | Score |
| :---      | :---: |
|16+ sec    |   5   |
|12-15 sec  |   4   |
|10-12 sec  |   3   |
|<10 sec    |   1   |

##### Wave Size (SwP * SwH)
| Condition         | Score |
| :---              | :---: |
|SwP * SwH = 30+    |   5   |
|SwP * SwH = 25 - 30|   4   |
|SwP * SwH = 20 - 24|   3   |
|SwP * SwH = 11 - 19|   2   |
|SwP * SwH < 10     |   1   |

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
#### 4. View the project in your web browser: http://localhost:3000/
#### 5. Run application tests:
```
$ npm run test
```

## Known Bugs

- Page does not auto-refresh when new NOAA data is available. User must manually refresh page to see updated data.
- Wind Direction indicator symbol is static 'NW' value. Needs additional logic to update direction symbol against all valid Wind Direction values.
- Hosted application is unable to fetch NOAA data to due to access control checks (not allowed by Access-Control-Allow-Origin). View locally hosted clone for current data viewing.

## Support and contact details

jaredreando@gmail.com

## Technologies Used
- Javascript
- React
- HTML/CSS
- Webpack
- Jest
- GitHub (hosting)

### License

This software is licensed under the MIT license.
