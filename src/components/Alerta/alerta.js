import React, {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alerta = ({exibir}) => {
  const [open, setOpen] = useState(exibir);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(exibir);
  }, [exibir])

  return (
    <Stack spacing={2}>
      <button onClick={handleClick}>Abrir Alerta</button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={30000}
        onClose={handleClose}
      >
        <Alert
          onClose={() => setOpen(false)}
          style={{ width: "400px" }}
          severity="success"
        >
          <AlertTitle>Sucesso!</AlertTitle>
          <strong> Seu anúncio foi cadastrado.</strong>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Alerta;
