import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const red = '#eb6a5b';
const blue = 'blue';
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends Component {
  state = {
    highs: null,
    lows: null,
    bars: []
  };

  xScale = d3.scaleTime().range([margin.left, width - margin.right]);
  yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
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

    this.lineGenerator.y(d => this.yScale(d.low));
    const lows = this.lineGenerator(data);

    this.setState({ highs, lows });

    const bars = data.map(d => {
      const y1 = this.yScale(d.high);
      const y2 = this.yScale(d.low);
      return {
        x: this.xScale(d.date),
        y: y1,
        height: y2 - y1
      };
    });
    this.setState({ bars });
  }
  render() {
    console.log(this.state.highs);
    return (
      <svg width={width} height={height}>
        <path d={this.state.highs} fill="none" stroke={red} />
        <path d={this.state.lows} fill="none" stroke={blue} />
        <g transform="translate(0,100)">
          {this.state.bars.map(d => (
            <rect x={d.x} y={d.y} width="2" height={d.height} />
          ))}
        </g>
      </svg>
    );
  }
}

export default Chart;
