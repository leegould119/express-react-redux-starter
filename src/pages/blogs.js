import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateProfile, Toast, Header } from '../components';
function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

class blogs extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="section">
          <p style={{ marginTop: '70px' }}>blogs</p>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(blogs);
