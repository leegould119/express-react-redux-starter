import React from 'react';
const CheckBox = (props) => {
  return (
    <React.Fragment>
      {props.options.map((option, index) => {
        return (
          <label key={option}>
            {props.title}
            <input
              id={props.name}
              name={props.name}
              //   onChange={props.handleChange}
              value={option}
              //   checked={props.selectedOptions.indexOf(option) > -1}
              type="checkbox"
            />
            {option}
          </label>
        );
      })}
    </React.Fragment>
  );
};

export default CheckBox;
