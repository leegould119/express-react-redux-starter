import React from 'react';
const CheckBox = (props) => {
  return (
    <React.Fragment>
      {props.options.map((option, index) => {
        return (
          <label key={option}>
            {props.title}
            <input
              type="checkbox"
              checked={option.checked}
              onChange={option.handleChange}
              options={option.option}
              // {...props}
            />
            {option}
          </label>
        );
      })}
    </React.Fragment>
  );
};

export default CheckBox;
