import React, { Component } from 'react'

class ReportList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buoyRecords: ['state works'],
      lastUpdate: {name: 'jared'}
    }
  }

componentDidMount() {
  let url = 'https://www.ndbc.noaa.gov/data/realtime2/46029.spec';

  fetch(url)
    .then((resp) => resp.text())
    .then((data) => {
     function parseRow(string) {
       const parsedRowArray = string.split(/\s/).filter((e) => e != '')
       return parsedRowArray
     }

     //splits response into array w/string values equalling rows
     let separateRows = data.split(/\n/).slice(0,20)
     let parsedRows = separateRows.map(row => parseRow(row))
     console.log('data', parsedRows)

     let dataRows = parsedRows.slice(2,22)
     console.log("data:", dataRows)
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

   });

  this.setState({buoyRecords: ['component mounted'], lastUpdate: {name: 'jason', age: 33}})
}

render() {
  return(
    <div>
      <h1>ReportList Works</h1>
      <h2>{this.state.buoyRecords[0]}</h2>
      <h2>{this.state.lastUpdate.name} {this.state.lastUpdate.age ? this.state.lastUpdate.age : ''}</h2>
    </div>
  )
}

}


export default ReportList
