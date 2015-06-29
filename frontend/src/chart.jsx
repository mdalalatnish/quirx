import React from 'react';
import Highcharts from 'react-highcharts';
import _ from 'lodash';

let dateMultiple = 24 * 60 * 60 * 1000;

let Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    term: React.PropTypes.string.isRequired
  },
  shouldComponentUpdate(props, state) {
    return !_.isEqual(this.props.data, props.data);
  },
  points() {
    return this.props.data.map(function (d, i) {
      return [d.term * dateMultiple, d.count];
    });
  },
  title() {
    return `${this.props.data.length} Adverse Events Matching "${this.props.term}"`;
  },
  config() {
    return {
      title: {text: this.title()},
      credits: { text: 'open fda', href: 'https://open.fda.gov' },
      xAxis: {
        type: 'datetime',
        title: {text: 'Date'}
      },
      yAxis: {
        title: {
          text: 'Event count'
        },
        min: 0
      },
      series: [{
        name: this.props.term,
        data: this.points()
      }]
    };
  },
  render() {
    return (<Highcharts config={this.config()}/>);
  }
});

export default Chart;
