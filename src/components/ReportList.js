import React, { Component } from 'react'
import './SurfReport.css';

class ReportList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buoyRecords: ['state works'],
      lastUpdate: {name: 'jared'}
    }

    this.showWaveSize = this.showWaveSize.bind(this);
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

  showWaveSize() {
    const wwh = this.state.lastUpdate.WWH;
    if(wwh) {
      return wwh;
    }
    return 'No Data'
  }

  render() {
    const waveSize = this.showWaveSize()

    return(
      <div className='wrapper'>

        <div className='property' id='summary'>
          <p>Last Updated: <br/> Thursday, March 21 2:00pm</p>
          <p id='surf-score'>3.2</p>
          <p>bottom text</p>
        </div>

        <div className='property'>
          <p>5</p>
          <p>SE</p>
          <p>Wind Direction</p>
        </div>

        <div className='property'>
          <p>3</p>
          <p>10 sec</p>
          <p>Swell Period</p>
        </div>

        <div className='property'>
          <p>3</p>
          <p>{waveSize}</p>
          <p>Wave Size</p>
        </div>
      </div>
    )
  }

}


export default ReportList
