import React from 'react';
import data from './data'

class Visualization extends React.Component {
  constructor(props) {
    super(props)
    data.loadData();

    this.state = {
      zeroToSixty: 5,
      mpg_stats: data.getStats(5)
    }
  }

  handleZeroToSixtyChange = (e) => {
    console.log(e.target.value)
    this.setState({
      zeroToSixty: e.target.value,
      mpg_stats: data.getStats(e.target.value)
    });
  }

  render() {
    return (
      <div>
        The visualization stuff
        <ZeroToSixtySlider zeroToSixty={this.state.zeroToSixty} handleChange={this.handleZeroToSixtyChange}/>
        <MpgGraph mpg_stats={this.state.mpg_stats}/>
      </div>
    )
  };
}

function ZeroToSixtySlider(props) {
  return (
    <div>
      <input type="range" name="zeroToSixy"
        min="4" max="9" value={props.zeroToSixty}
        step="0.1" onChange={props.handleChange} />
      {props.zeroToSixty}
    </div>
  )
}

function MpgGraph(props) {
  return (
    <div>
      Avg Mpg: {props.mpg_stats.mean}
      Stddev: {props.mpg_stats.stddev}
    </div>
  )
}

export default Visualization
