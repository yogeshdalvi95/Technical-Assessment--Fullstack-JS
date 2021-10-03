import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Stack } from "@mui/material";
import React from "react";
import { CityCountryDialog } from "../../components";
import { getCityList, getWeatherData } from "../../urls";
import { providerForPublicGet } from "../../api";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const styles = {
  backdrop: {
    zIndex: 1000,
    color: "#fff"
  }
};

const useStyles = makeStyles(styles);
const WeatherScreen = props => {
  const classes = useStyles();
  const [openBackDrop, setBackDrop] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [cityData, setCityData] = React.useState([]);
  const [cityName, setCityName] = React.useState("");
  const [weatherData, setWeatherData] = React.useState(null);
  React.useEffect(() => {}, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getCityListAPI();
  }, [open]);

  const getCityListAPI = async () => {
    await providerForPublicGet(getCityList)
      .then(res => {
        setCityData(res.data);
      })
      .catch(err => {});
  };

  const getWeatherDataAPI = async () => {
    setWeatherData(null);
    setBackDrop(true);
    await providerForPublicGet(getWeatherData, { q: cityName })
      .then(res => {
        setBackDrop(false);
        setWeatherData(res.data);
      })
      .catch(err => {
        setBackDrop(false);
      });
  };

  console.log("weatherData ", weatherData ? weatherData.response : "");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Autocomplete
          id="country-select"
          variant="standard"
          fullWidth
          options={cityData}
          autoHighlight
          getOptionLabel={option => option.city_name}
          onChange={(event, value) => {
            if (value === null) {
              setCityName("");
            } else {
              setCityName(value.city_name);
            }
          }}
          value={
            cityData[
              cityData.findIndex(function (item, i) {
                console.log(item);
                return item.city_name === cityName;
              })
            ] || null
          }
          renderInput={params => (
            <TextField {...params} label="Choose a city" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            disabled={cityName === ""}
            onClick={getWeatherDataAPI}
          >
            Search
          </Button>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add New City
          </Button>
        </Stack>
      </Grid>
      {weatherData ? (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            Temp : {weatherData.response.main.temp} Celcius
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            Feels Like : {weatherData.response.main.feels_like} Celcius
          </Grid>
        </>
      ) : null}

      <CityCountryDialog open={open} handleClose={handleClose} />
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default WeatherScreen;
