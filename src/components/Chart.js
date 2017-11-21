import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: this.props.labels,
      playcount: this.props.playcount,
      title: this.props.title
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      labels: nextProps.labels,
      playcount: nextProps.playcount,
      title: nextProps.title
    });
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={{
            labels: this.state.labels,
            datasets: [
              {
                label: 'Artists',
                data: this.state.playcount,
                backgroundColor: this.props.color
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            title: {
              display: true,
              fontSize: 22,
              color: '#CFCFCF',
              text: this.state.title
            },
            // scales: {
            //   xAxes: [
            //     {
            //       gridLines: {
            //         display: false
            //       }
            //     }
            //   ]
            // }
          }}
        />
      </div>
    );
  }
}

export default Chart;
