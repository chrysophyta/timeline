import React, { Component } from 'react';
import './App.css';
import Chart from './Chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temps: {},
      city: 'am'
    };
  }
  componentDidMount() {
    Promise.all([fetch(`${process.env.PUBLIC_URL}/am.json`)])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(am => {
        am.forEach(day => (day.date = new Date(day.date)));
        this.setState({ temps: { am } });
      });
  }
  render() {
    const data = this.state.temps[this.state.city];
    return (
      <div className="App">
        <Chart data={data} />
      </div>
    );
  }
}

export default App;
