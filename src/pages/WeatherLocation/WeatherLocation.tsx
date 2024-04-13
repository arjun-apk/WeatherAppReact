import {
  AlertColor,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import {
  CreateWeatherLocation,
  DeleteWeatherLocation,
  WeatherLocationList,
} from "../../Redux/Thunks/WeatherLocationThunk";
import {
  ToastMessage,
  ToastMessageState,
} from "../../components/ToastMessage/ToastMessage";
import { useState, useEffect } from "react";
import DataTable from "../../components/Table/DataTable";
import dayjs from "dayjs";
import CustomModel from "../../components/Model/Model";
import { unwrapResult } from "@reduxjs/toolkit";
import { Delete } from "@mui/icons-material";
import Connector from "../../signalrConnection";
import { WeatherLocationActions } from "../../Redux/Slices/WeatherLocationSlice";

const WeatherLocationPage = () => {
  const { isLoading, list } = useAppSelector((state) => state.weatherLocation);
  const dispatch = useAppDispatch();

  const [showModel, setShowModel] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [toastMessage, setToastMessage] = useState<ToastMessageState>({
    showMessage: false,
    message: "",
    alertType: "success",
  });

  const updateToastMessage = (
    showMessage: boolean,
    message: string,
    alertType: AlertColor
  ) => {
    setToastMessage({ showMessage, message, alertType });
  };

  const getWeatherLocationsList = async () => {
    const response = await dispatch(WeatherLocationList());
    if (!response.payload) {
      updateToastMessage(true, "Connection Refused", "error");
    }
  };

  useEffect(() => {
    const hubConnection = Connector.getInstance().getHubConnection();

    hubConnection.on("WeatherLocation", (data) => {
      console.log("🚀 ~ hubConnection.on ~ data:", data);
      dispatch(WeatherLocationActions.appendWeatherLocation(data));
    });

    getWeatherLocationsList();
  }, []);

  const onClickAddLocation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const response = await dispatch(CreateWeatherLocation(locationName));
    if (!response.payload) {
      updateToastMessage(true, "Connection Refused", "error");
    } else {
      const result = unwrapResult(response);
      if (result.status) {
        updateToastMessage(true, result.message, "success");
      } else {
        updateToastMessage(true, result.message, "info");
      }
      setShowModel(false);
    }
  };

  const onClickDeleteButton = async (id: string) => {
    const response = await dispatch(DeleteWeatherLocation(id));
    if (!response.payload) {
      updateToastMessage(true, "Connection Refused", "error");
    } else {
      const result = unwrapResult(response);
      if (result.status) {
        updateToastMessage(true, result.message, "success");
      } else {
        updateToastMessage(true, result.message, "info");
      }
      setShowModel(false);
    }
  };

  const WeatherIcon = (props: any) => (
    <Box
      title={props.data.conditionText}
      display="flex"
      flexDirection="row"
      sx={{ height: "100%" }}
    >
      <img
        src={props.data.conditionIcon}
        alt="Condition Icon"
        style={{ height: "100%" }}
      />
    </Box>
  );

  const DeleteIcon = (props: any) => (
    <Box
      title="Delete"
      display="flex"
      flexDirection="row"
      sx={{ height: "100%" }}
    >
      <IconButton onClick={() => onClickDeleteButton(props.data.id)}>
        <Delete color="error" />
      </IconButton>
    </Box>
  );

  const FormattedDateTime = (props: any) => {
    const inTime = dayjs(new Date(props.data.lastUpdated)).format(
      "DD MMM YYYY hh:mm A ddd"
    );
    return (
      <Box aria-label="Time" title="Time">
        {inTime}
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ height: "100vh" }}>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        sx={{ padding: "30px" }}
      >
        <Typography variant="h3" sx={{ margin: "0 0 10px 0" }}>
          Weather
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ margin: "10px 0" }}
        >
          <Button
            variant="contained"
            onClick={() => setShowModel(true)}
            sx={{ marginLeft: "auto", padding: "10px 20px" }}
          >
            Add
          </Button>
        </Box>
        <Box flexGrow={1}>
          <DataTable
            rows={list}
            columnDefs={[
              {
                headerName: "S.No.",
                valueGetter: "node.rowIndex + 1",
                minWidth: 70,
              },
              { field: "location", headerName: "Location" },
              {
                field: "region",
                headerName: "Region",
              },
              {
                field: "country",
                headerName: "Country",
              },
              {
                field: "tempC",
                headerName: "Temp C",
              },
              {
                field: "tempF",
                headerName: "Temp F",
              },
              {
                field: "conditionIcon",
                headerName: "Condition",
                cellRenderer: WeatherIcon,
              },
              {
                field: "Last Updated",
                headerName: "Updated On",
                cellRenderer: FormattedDateTime,
                minWidth: 300,
              },
              {
                field: "Action",
                headerName: "Action",
                cellRenderer: DeleteIcon,
              },
            ]}
          />
        </Box>
        <CustomModel open={showModel} setOpen={setShowModel}>
          <form
            onSubmit={(event) => onClickAddLocation(event)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              flexGrow: 1,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              flexGrow={1}
              justifyContent="space-evenly"
            >
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                onChange={(event) => setLocationName(event.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  margin: "10px 0",
                  alignSelf: "center",
                  padding: "10px 20px",
                }}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Box>
          </form>
        </CustomModel>
        <ToastMessage
          showToastMessage={toastMessage.showMessage}
          setToastMessage={setToastMessage}
          message={toastMessage.message}
          alertType={toastMessage.alertType}
          // placement={{ vertical: "top", horizontal: "left" }}
        />
      </Box>
    </Box>
  );
};

export default WeatherLocationPage;
