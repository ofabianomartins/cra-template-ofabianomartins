import React from 'react';

import CounterPanel from '../CounterPanel/CounterPanel.jsx';

import './MainApp.scss'

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <div className="toppanel">
          <CounterPanel />
        </div>
        <div className="bottompanel">

        </div>
      </div>
    );
  }
}

export default App;
