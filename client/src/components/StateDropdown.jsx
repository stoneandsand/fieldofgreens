import React from 'react';

class StateDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className="dropdown">
        <button className="btn btn-warning dropdown-toggle text-center" type="button" id="savedLists" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.location || 'Select State'}
        </button>
        <div className="dropdown-menu" aria-labelledby="state">
          <a name="al" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>AL</a>
          <a name="ak" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>AK</a>
          <a name="az" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>AZ</a>
          <a name="ar" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>AR</a>
          <a name="ca" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>CA</a>
          <a name="co" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>CO</a>
          <a name="ct" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>CT</a>
          <a name="de" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>DE</a>
          <a name="fl" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>FL</a>
          <a name="ga" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>GA</a>
          <a name="hi" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>HI</a>
          <a name="id" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>ID</a>
          <a name="il" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>IL</a>
          <a name="in" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>IN</a>
          <a name="ia" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>IA</a>
          <a name="ks" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>KS</a>
          <a name="ky" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>KY</a>
          <a name="la" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>LA</a>
          <a name="me" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>ME</a>
          <a name="md" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>MD</a>
          <a name="ma" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>MA</a>
          <a name="mi" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>MI</a>
          <a name="mn" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>MN</a>
          <a name="ms" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>MS</a>
          <a name="mo" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>MO</a>
          <a name="mt" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>MT</a>
          <a name="ne" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>NE</a>
          <a name="nv" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>NV</a>
          <a name="nh" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>NH</a>
          <a name="nj" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>NJ</a>
          <a name="nm" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>NM</a>
          <a name="ny" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>NY</a>
          <a name="nc" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>NC</a>
          <a name="nd" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>ND</a>
          <a name="oh" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>OH</a>
          <a name="ok" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>OK</a>
          <a name="or" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>OR</a>
          <a name="pa" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>PA</a>
          <a name="ri" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>RI</a>
          <a name="sc" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>SC</a>
          <a name="sd" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>SD</a>
          <a name="tn" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>TN</a>
          <a name="tx" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>TX</a>
          <a name="ut" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>UT</a>
          <a name="vt" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>VT</a>
          <a name="va" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>VA</a>
          <a name="wa" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>WA</a>
          <a name="wv" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>WV</a>
          <a name="wi" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>WI</a>
          <a name="wy" className="dropdown-item" href="#" onClick={this.props.selectLocation.bind(null)}>WY</a>
        </div>
      </span>
    );
  }
};

export default StateDropdown;
