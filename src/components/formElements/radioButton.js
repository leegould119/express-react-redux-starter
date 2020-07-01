import React from 'react';

const radioButton = (props) => {
  console.log(props.data);
  return (
    <div onChange={props.handleChange}>
      {props.options.map((option, index) => {
        return (
          <label key={index} className="inputContainer">
            {option}
            {(() => {
              if (props.data === option) {
                return (
                  <input
                    type="radio"
                    id={option}
                    value={option}
                    name={props.id}
                    checked
                  />
                );
              } else {
                return (
                  <input
                    type="radio"
                    id={option}
                    value={option}
                    name={props.id}
                  />
                );
              }
            })()}
            <span className="checkmark" />
          </label>
        );
      })}
    </div>
  );
};

export default radioButton;
