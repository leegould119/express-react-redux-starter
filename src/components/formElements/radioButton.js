import React from 'react';

const radioButton = (props) => {
  console.log(props.data);
  return (
    <div>
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
                    checked={true}
                    onChange={props.handleChange}
                  />
                );
              } else {
                return (
                  <input
                    type="radio"
                    id={option}
                    value={option}
                    name={props.id}
                    checked={false}
                    onChange={props.handleChange}
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
