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

const customStyles = {
  control: (base) => ({
    ...base,
    height: 40,
    minHeight: 40,
    width: 200,
  }),
};

const MobbFilter = ({
  valorLabel,
  name,
  onChange,
  focus,
  id,
  dataOptions,  
}) => {
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
      getOptionLabel={(e) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {e.icon}
          <span style={{ marginLeft: 5 }}>{e.text}</span>
        </div>
      )}
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
        control: (base) => ({
          ...base,
          height: 40,
          minHeight: 40,
          width: 220,
        }),
      }}
    />
  );
};

export default MobbFilter;
