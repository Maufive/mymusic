import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
  chartExample = {
    labels: this.props.labels,
    datasets: [
      {
        label: 'Artists',
        data: this.props.playcount,
        backgroundColor: this.props.color
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    title: {
      display: true,
      fontSize: 22,
      color: '#3a3a3a',
      text: this.props.title
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  render() {
    return (
      <div className="chart">
        <Bar data={this.chartExample} options={this.options} />
      </div>
    );
  }
}

export default Chart;
