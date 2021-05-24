import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { connect } from "react-redux";
import {alertHide} from '../../redux/auth/actions'

function Alert({show, msg, hideAlert}) {
  let css = "alert-container";
  if(show){
    css += ' alert-show'
    if( msg === 'Something wrong. Please try again..' ) {
      css += " alert-danger"
    }
  }
  return (
    <div className={css}>
      <div className="alert">
        <p>{show && msg}</p>
        <button className="alert-close" onClick={hideAlert}>
          <FaWindowClose/>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    show: state.authReducer.show,
    msg: state.authReducer.msg,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideAlert: () => dispatch(alertHide())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
