import React, { Component } from 'react';

import SurfReport from './SurfReport';

class App extends Component {
  render() {
    return (
      <div>
        <SurfReport />
        <div style={{textAlign: 'center', display: 'grid', alignItems: 'center'}}>
          <code >Surf Report data provided by <a href='https://www.ndbc.noaa.gov/data/realtime2/46029.spec'>NOAA</a></code>
        </div>
      </div>
    );
  }
}

export default App;
