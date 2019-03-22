import React, { Component } from 'react'
import './SurfReport.css';

class SurfReport extends Component {
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
    this.getWindDirectionScore = this.getWindDirectionScore.bind(this);
    this.getSwellPeriodScore = this.getSwellPeriodScore.bind(this);
    this.getWaveSizeScore = this.getWaveSizeScore.bind(this);
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

       let separateRows = data.split(/\n/)
       let parsedRows = separateRows.map(row => parseRow(row))

       let dataRows = parsedRows.slice(2)
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

      let dataRowObjects = dataRows.map(row => assignObjects(row))
      console.log('data objects:', dataRowObjects)
      this.setState({buoyRecords: dataRowObjects, lastUpdate: dataRowObjects[0]})
     });

  }

  getWindDirectionScore(WWD) {
    if(WWD == 'E') {
      return 5;
    } else if (WWD == 'NE'){
      return 4;
    } else if(WWD == 'SE'){
      return 4;
    } else if(WWD == 'S'){
      return 3;
    } else {
      return 1;
    }
  }

  getSwellPeriodScore(SwP) {
    if(SwP < 10) {
      return 1;
    } else if (SwP >= 10 && SwP < 12){
      return 2;
    } else if(SwP >= 12 && SwP < 16){
      return 3;
    } else if(SwP >= 16){
      return 5;
    }
  }

  getWaveSizeScore(SwP, SwH) {
    const waveSize = SwP * SwH;
    if(waveSize < 10) {
      return 1;
    } else if (waveSize > 10 && waveSize <= 19){
      return 2;
    } else if(waveSize > 19 && waveSize <= 24){
      return 3;
    } else if(waveSize > 24 && waveSize <= 30){
      return 4;
    } else if(waveSize > 30){
      return 5;
    }
  }

  render() {
    const last = this.state.lastUpdate
    const lastUpdatedTime = `${last.MM}/${last.DD}/${last.YY} @ ${last.hh}:${last.mm}`

    const windDirection = last.SwD
    const windDirectionScore = this.getWindDirectionScore(last.WWD);

    const swellPeriod = last.SwP
    const swellPeriodScore = this.getSwellPeriodScore(last.SwP)

    const waveSize = last.SwP * last.SwH
    const waveSizeScore = this.getWaveSizeScore(last.SwP, last.SwH)

    const combinedSurfScore = ((windDirectionScore + swellPeriodScore + waveSizeScore) / 3).toFixed(2);

    return(
      <div className='wrapper'>

        <div className='property' id='summary'>
          <code>Last Updated: <br/>{lastUpdatedTime} <br/>(hourly)</code>
          <p id='surf-score'>{combinedSurfScore}</p>
          <p>SURFING NOT RECOMMENDED</p>
        </div>

        <div className='property'>
          <p style={{fontSize: '1.4em', background: 'black', color: 'white'}}>{windDirectionScore}</p>
          <p style={{fontSize: '3em'}}>{windDirection}</p>
          <p style={{background: 'black', color: 'white'}}>Wind Direction</p>
        </div>

        <div className='property'>
          <p style={{fontSize: '1.4em', background: 'black', color: 'white'}}>{swellPeriodScore}</p>
          <p style={{fontSize: '3em'}}>{swellPeriod}</p>
          <p style={{background: 'black', color: 'white'}}>Swell Period</p>
        </div>

        <div className='property'>
          <p style={{fontSize: '1.4em', background: 'black', color: 'white'}}>{waveSizeScore}</p>
          <p style={{fontSize: '3em'}}>{waveSize}</p>
          <p style={{background: 'black', color: 'white'}}>Wave Size</p>
        </div>
      </div>
    )
  }

}


export default SurfReport;