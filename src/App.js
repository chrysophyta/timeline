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
    let promise = new Promise((resolve, reject) => {
      resolve(fetch(`${process.env.PUBLIC_URL}/am.json`));
    });

    promise.then(response => response.json()).then(am => {
      am.forEach(day => (day.date = new Date(day.date)));
      this.setState({ temps: { am } });
    });
    // .then(am => {
    //   am.forEach(day => (day.date = new Date(day.date)));
    //   this.setState({ temps: { am } });
    // });
  }
  render() {
    const data = this.state.temps[this.state.city];
    console.log(data);
    return (
      <div className="App">
        <Chart data={data} />
      </div>
    );
  }
}

export default App;
