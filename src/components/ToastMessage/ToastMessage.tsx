import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarOrigin,
  colors,
} from "@mui/material";
import React from "react";

export interface ToastMessageState {
  showMessage: boolean;
  message: string;
  alertType: AlertColor;
}

interface Props {
  showToastMessage: boolean;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageState>>;
  message: string;
  autoHideDuration?: number;
  placement?: SnackbarOrigin;
  alertType?: AlertColor;
}

export const ToastMessage = (props: Props) => {
  let {
    showToastMessage,
    setToastMessage,
    message,
    autoHideDuration,
    placement,
    alertType = "success",
  } = props;

  if (!placement) {
    placement = { vertical: "bottom", horizontal: "center" };
  }

  const text = { background: "", color: "" };
  switch (alertType) {
    case "success":
      text.background = colors.lightGreen[300];
      text.color = colors.lightGreen[900];
      break;
    case "info":
      text.background = colors.blue[300];
      text.color = colors.blue[900];
      break;
    case "warning":
      text.background = colors.orange[200];
      text.color = colors.orange[900];
      break;
    case "error":
      text.background = colors.red[300];
      text.color = colors.red[900];
      break;
  }

  return (
    <Snackbar
      open={showToastMessage}
      autoHideDuration={autoHideDuration}
      anchorOrigin={placement}
      onClose={() =>
        setToastMessage({
          showMessage: false,
          message,
          alertType,
        })
      }
    >
      <Alert
        variant="standard"
        onClose={() =>
          setToastMessage({
            showMessage: false,
            message: "",
            alertType: "success",
          })
        }
        severity={alertType}
        style={{
          backgroundColor: text.background,
          color: text.color,
          fontWeight: "600",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
