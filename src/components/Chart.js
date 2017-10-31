import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component { 
  constructor(props) {
    super(props);
    this.asdf = this.asdf.bind(this);
  }

  artistChart = {
    labels: this.props.labels,     // Namn på artist/låt/album
    datasets: [{
      label: this.props.labelType, // Artist/Tracks/Albums
      data: [
        this.props.playcount       // På något sätt få in playcount för varje låt/artist/album
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ]
    }]
  }

  chartExample = {
    labels: this.props.getLabels,
    datasets: [{
      label: 'Artists',
      data: [
        617594,
        181045,
        153060,
        106519,
        105162,
        95072
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ]
    }]
  }

  asdf() {
    console.log(this.props.getLabels);
  }

  render() {
    return (
      <div className="chart">
        <p>Chart</p>
        <Doughnut 
          data={this.chartExample}
        />
        <button onClick={this.asdf}>labels???</button>
      </div>
    )
  }
}

export default Chart;