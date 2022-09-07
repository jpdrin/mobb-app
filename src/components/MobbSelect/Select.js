import { red } from "@mui/material/colors";
import React, { Component } from "react";
import Select, { components } from "react-select";

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const MobbSelect = ({valorLabel, name, onChange, focus, id, dataOptions}) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      name={name}      
      id={id}      
      options={dataOptions}      
      onChange={onChange}      
      onFocus={focus}      
      noOptionsMessage={() => "Opção não encontrada!"}
      components={{
        ValueContainer: CustomValueContainer,
      }}
      placeholder={valorLabel}      
      styles={{
        container: (provided, state) => ({
          ...provided,
          marginTop: 0,          
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          overflow: "visible",
        }),
        placeholder: (provided, state) => ({
          ...provided,
          position: "absolute",
          top: state.hasValue || state.selectProps.inputValue ? -13 : "10%",
          backgroundColor:
            state.hasValue || state.selectProps.inputValue
              ? "white"
              : "transparent",
          transition: "top 0.1s, font-size 0.1s",
          fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
        }),
      }}
    />
  );
};

export default MobbSelect;
