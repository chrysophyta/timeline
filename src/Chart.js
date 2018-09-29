import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const red = '#eb6a5b';
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends Component {
  state = {
    highs: null,
    lows: null
  };

  xScale = d3.scaleTime().range([margin.left, width - margin.right]);
  yScale = d3.scaleLinear().range([0, width / 2]);
  lineGenerator = d3.line();

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (!data) return;

    // update the scales

    const timeDomain = d3.extent(data, d => d.date);
    const tempMax = d3.max(data, d => d.high);
    this.xScale.domain(timeDomain);
    this.yScale.domain([0, tempMax]);

    this.lineGenerator.x(d => this.xScale(d.date));
    this.lineGenerator.y(d => this.yScale(d.high));

    const highs = this.lineGenerator(data);
    this.setState({ highs });
  }
  render() {
    console.log(this.state.highs);
    return (
      <svg width={width} height={height}>
        <path d={this.state.highs} fill="none" stroke={red} />
      </svg>
    );
  }
}

export default Chart;
