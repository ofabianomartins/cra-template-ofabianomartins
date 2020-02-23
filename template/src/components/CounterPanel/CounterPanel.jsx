import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import counterDuck from '../../ducks/CounterDuck';

import './CounterPanel.scss'

import logo from '../../../public/images/logo.png'

class CounterPanel extends React.Component {

  render() {
    return(<div className="container counterpanel">
            <div className="row">
        <div className="col">
          <div className="title">
            <img src={logo} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="text-counter">
            {this.props.count}
          </div>
        </div>
      </div>
      <div className="row pb-3">
        <div className="col" >
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-success" onClick={this.props.increment} > Increment</button>
            <button className="btn btn-danger ml-3" onClick={this.props.decrement} > Decrement</button>
          </div>
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return { count: state.counter.count }
}

function mapDispatchToProps(dispatch) {
  return { 
    increment: bindActionCreators(counterDuck.creators.increment, dispatch),
    decrement: bindActionCreators(counterDuck.creators.decrement, dispatch) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterPanel);