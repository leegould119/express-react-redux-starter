import React from 'react';
const Input = (props) => {
  return (
    <input
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      autoComplete={props.autoComplete}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

export default Input;
