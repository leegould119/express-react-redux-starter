import React from 'react';

function Select(props) {
  return (
    // <select value={props.value} onChange={handleChange}>
    <select defaultValue={'please select an option'}>
      {props.options.map((option, index) => {
        return (
          <option id={index} key={index} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
