import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const MobbPassword = ({name, id, onChange, onBlur}) => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });    
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <FormControl style={{ width: "100%" }} variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{ left: 5, m: -0.6 }}
        >
          Senha
        </InputLabel>
        <OutlinedInput
          name={name}
          id={id}
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          size="small"
          inputProps={{ maxLength: 20 }}
          onChange={handleChange("password")}
          onKeyDown={onChange}
          onBlur={onBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
      </FormControl>
    </div>
  );
}

export default MobbPassword;