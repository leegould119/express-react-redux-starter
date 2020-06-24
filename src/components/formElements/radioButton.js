import React from 'react';

const radioButton = (props) => {
  return (
    <div onChange={props.handleChange}>
      {props.options.map((option, index) => {
        return (
          <label key={index} className="inputContainer">
            {option}
            <input type="radio" id={option} value={option} name={props.id} />
            <span className="checkmark" />
          </label>
        );
      })}
    </div>
  );
};

export default radioButton;
