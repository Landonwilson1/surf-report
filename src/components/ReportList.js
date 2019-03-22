import React, { Component } from 'react'
import './SurfReport.css';

class ReportList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buoyRecords: [
        {
          APD: "7.2",
          DD: "21",
          MM: "03",
          MWD: "243",
          STEEPNESS: "SWELL",
          SwD: "WSW",
          SwH: "1.7",
          SwP: "12.9",
          WVHT: "1.8",
          WWD: "SSW",
          WWH: "0.6",
          WWP: "4.2",
          YY: "2019",
          hh: "22",
          mm: "00"
        }
      ],
      lastUpdate: {
        APD: "7.2",
        DD: "21",
        MM: "03",
        MWD: "243",
        STEEPNESS: "SWELL",
        SwD: "WSW",
        SwH: "1.7",
        SwP: "12.9",
        WVHT: "1.8",
        WWD: "SSW",
        WWH: "0.6",
        WWP: "4.2",
        YY: "2019",
        hh: "22",
        mm: "00"
      }
    }

  }

  componentDidMount() {
    let url = 'https://www.ndbc.noaa.gov/data/realtime2/46029.spec';

    fetch(url)
      .then((resp) => resp.text())
      .then((data) => {
       function parseRow(string) {
         const parsedRowArray = string.split(/\s/).filter((e) => e !== '')
         return parsedRowArray
       }

       //splits response into array w/string values equalling rows
       let separateRows = data.split(/\n/).slice(0,20)
       let parsedRows = separateRows.map(row => parseRow(row))

       let dataRows = parsedRows.slice(2,22)
       function assignObjects(e) {
           let newRow = {};
           newRow['YY'] = e[0];
           newRow['MM'] = e[1];
           newRow['DD'] = e[2];
           newRow['hh'] = e[3];
           newRow['mm'] = e[4];
           newRow['WVHT'] = e[5];
           newRow['SwH'] = e[6];
           newRow['SwP'] = e[7];
           newRow['WWH'] = e[8];
           newRow['WWP'] = e[9];
           newRow['SwD'] = e[10];
           newRow['WWD'] = e[11];
           newRow['STEEPNESS'] = e[12];
           newRow['APD'] = e[13];
           newRow['MWD'] = e[14];
         return newRow;
       }

      let dataObjects = dataRows.map(row => assignObjects(row))
      console.log('data objects:', dataObjects)
      this.setState({buoyRecords: dataObjects, lastUpdate: dataObjects[0]})
     });

  }

  getWindDirectionScore(condition) {

  }

  getSwellPeriodScore(condition) {

  }

  getWaveSizeScore(SwP, SwH) {
    const condition = SwP * SwH;
    if(condition < 10) {
      return 1;
    } else if (condition > 10 && condition <= 19){
      return 2;
    } else if(condition > 19 && condition <= 24){
      return 3;
    } else if(condition > 24 && condition <= 30){
      return 4;
    } else if(condition > 30){
      return 5;
    }
  }

  render() {
    const last = this.state.lastUpdate
    const lastUpdatedTime = `${last.MM}/${last.DD}/${last.YY}, ${last.hh}:${last.mm}`
    const windDirection = this.state.lastUpdate.SwD
    const windDirectionScore = 5
    const swellPeriod = 'swellPeriod'
    const swellPeriodScore = 4
    const waveSize = 'thing * thing'
    const waveSizeScore = 3;
    const combinedSurfScore = (windDirectionScore + swellPeriodScore + waveSizeScore) / 3;

    return(
      <div className='wrapper'>

        <div className='property' id='summary'>
          <p>Last Updated: <br/>{lastUpdatedTime}</p>
          <p id='surf-score'>{combinedSurfScore}</p>
          <p>bottom text</p>
        </div>

        <div className='property'>
          <p>{windDirectionScore}</p>
          <p>{windDirection}</p>
          <p>Wind Direction</p>
        </div>

        <div className='property'>
          <p>{swellPeriodScore}</p>
          <p>{swellPeriod}</p>
          <p>Swell Period</p>
        </div>

        <div className='property'>
          <p>{waveSizeScore}</p>
          <p>{waveSize}</p>
          <p>Wave Size</p>
        </div>
      </div>
    )
  }

}


export default ReportList
