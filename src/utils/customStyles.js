const customStyles = {
  container: () => ({
    width: '95%'
  }),
  indicatorSeparator: (styles) => ({ display: 'none' }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid rgba(240,240,240,1)',
    width: '100%'
  }),
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    color: state.selectProps.menuColor,
    width: '100%',
    borderRadius: '0px',
    fontSize: '0.9em'
  }),
  control: (provider, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provider,
    width: 'calc(100%-5px)',
    borderRadius: '0px',
    fontSize: '0.8em',
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      border: state.isFocused ? 0 : 0
    },
    borderBottom: '1px solid rbga(204,204,204,1)'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
};

export default customStyles;
