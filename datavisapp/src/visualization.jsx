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
    const width = this.props.width,   // width of svg
      height = this.props.height,  // height of svg
      padding = 100; // space around the chart, not including labels
      padding = 100; // space around the chart, not including labels

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

    // now add titles to the axes
    svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .text("Average MPG");

    svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate("+ (width/2) +","+(height-(padding/3))+")")  // centre below axis
      .text("Average Mean of Vehicles");
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
