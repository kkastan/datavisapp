import React from 'react';
import data from './data'
const d3 = require('d3')

class BarChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(before, after) {
    // console.log('did update')
    d3.select("svg").remove();
    this.drawChart();
  }

  drawChart() {
    const data = this.props.gaussian;

    const svg = d3.select("body")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
      // .style("margin-left", 100);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 1)
      .attr("y", (d, i) => 100 * d)
      .attr("width", 1)
      .attr("height", (d, i) => 500 - (5000 * d))
      .attr("fill", "green")
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

class Visualization extends React.Component {
  constructor(props) {
    super(props)
    data.loadData();

    this.state = {
      zeroToSixty: 5,
      mpg_stats: data.getStats(5),
      gaussian: data.getGaussian(5, [10,50], 0.1)
    }
  }

  handleZeroToSixtyChange = (e) => {
    console.log(e.target.value)
    this.setState({
      zeroToSixty: e.target.value,
      mpg_stats: data.getStats(e.target.value),
      gaussian: data.getGaussian(e.target.value, [10,50], 0.1)
    });
  }

  render() {
    return (
      <div>
        The visualization stuff
        <ZeroToSixtySlider zeroToSixty={this.state.zeroToSixty} handleChange={this.handleZeroToSixtyChange}/>
        <MpgGraph mpg_stats={this.state.mpg_stats} gaussian={this.state.gaussian}/>
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
      <BarChart gaussian={props.gaussian} width="700" height="500" />
    </div>
  )
}

export default Visualization
