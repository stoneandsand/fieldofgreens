import React from 'react';

class stateDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    console.log('stateDropdown: ',this.props);
    return (
      <div className="stateDropdown">
        <form onChange={this.props.selectstate}>
          <select type="text" name="state" value={this.props.location} onChange={this.handleChange} >
            <option type="text" name="State">Select State</option>
            <option type="text" name="al">AL</option>
            <option type="text" name="ak">AK</option>
            <option type="text" name="az">AZ</option>
            <option type="text" name="ar">AR</option>
            <option type="text" name="ca">CA</option>
            <option type="text" name="co">CO</option>
            <option type="text" name="ct">CT</option>
            <option type="text" name="de">DE</option>
            <option type="text" name="fl">FL</option>
            <option type="text" name="ga">GA</option>
            <option type="text" name="hi">HI</option>
            <option type="text" name="id">ID</option>
            <option type="text" name="il">IL</option>
            <option type="text" name="in">IN</option>
            <option type="text" name="ia">IA</option>
            <option type="text" name="ks">KS</option>
            <option type="text" name="ky">KY</option>
            <option type="text" name="la">LA</option>
            <option type="text" name="me">ME</option>
            <option type="text" name="md">MD</option>
            <option type="text" name="ma">MA</option>
            <option type="text" name="mi">MI</option>
            <option type="text" name="mn">MN</option>
            <option type="text" name="ms">MS</option>
            <option type="text" name="mo">MO</option>
            <option type="text" name="mt">MT</option>
            <option type="text" name="ne">NE</option>
            <option type="text" name="nv">NV</option>
            <option type="text" name="nh">NH</option>
            <option type="text" name="nj">NJ</option>
            <option type="text" name="nm">NM</option>
            <option type="text" name="ny">NY</option>
            <option type="text" name="nc">NC</option>
            <option type="text" name="nd">ND</option>
            <option type="text" name="oh">OH</option>
            <option type="text" name="ok">OK</option>
            <option type="text" name="or">OR</option>
            <option type="text" name="pa">PA</option>
            <option type="text" name="ri">RI</option>
            <option type="text" name="sc">SC</option>
            <option type="text" name="sd">SD</option>
            <option type="text" name="tn">TN</option>
            <option type="text" name="tx">TX</option>
            <option type="text" name="ut">UT</option>
            <option type="text" name="vt">VT</option>
            <option type="text" name="va">VA</option>
            <option type="text" name="wa">WA</option>
            <option type="text" name="wv">WV</option>
            <option type="text" name="wi">WI</option>
            <option type="text" name="wy">WY</option>
          </select>
        </form>
      </div>
    )
  }
};

export default stateDropdown;
