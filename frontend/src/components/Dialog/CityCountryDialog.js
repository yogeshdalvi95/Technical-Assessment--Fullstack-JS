import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Grid } from "@mui/material";
import { hasError, setErrors, checkEmpty } from "../../utils";
import validationForm from "./validationForm.json";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { providerForPost } from "../../api";
import { createNewCity } from "../../urls";
import { SnackBarComponent } from "../SnackbarComponent";

const styles = {
  backdrop: {
    zIndex: 1000,
    color: "#fff"
  }
};

const useStyles = makeStyles(styles);
export default function CityCountryDialog(props) {
  const classes = useStyles();
  const [formState, setFormState] = React.useState({
    city_name: ""
  });
  const [snackBar, setSnackBar] = React.useState({
    show: false,
    severity: "",
    message: ""
  });
  const [openBackDrop, setBackDrop] = React.useState(false);

  const [error, setError] = React.useState({});

  const onChange = e => {
    delete error[e.target.name];
    setFormState(formState => ({
      ...formState,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckValidation = event => {
    event.preventDefault();
    setBackDrop(true);
    let isValid = false;
    let error = {};
    /** This will set errors as per validations defined in form */
    error = setErrors(formState, validationForm);
    /** If no errors then isValid is set true */
    if (checkEmpty(error)) {
      setBackDrop(false);
      setError({});
      isValid = true;
    } else {
      setBackDrop(false);
      setError(error);
    }
    if (isValid) {
      submit();
    }
  };

  const submit = async () => {
    await providerForPost(createNewCity, formState)
      .then(res => {
        setSnackBar(snackBar => ({
          ...snackBar,
          show: true,
          severity: "success",
          message: "City added"
        }));
        props.handleClose();
        setBackDrop(false);
      })
      .catch(err => {
        setBackDrop(false);
        setSnackBar(snackBar => ({
          ...snackBar,
          show: true,
          severity: "error",
          message: "Error adding new city"
        }));
      });
  };

  const snackBarHandleClose = () => {
    setSnackBar(snackBar => ({
      ...snackBar,
      show: false,
      severity: "",
      message: ""
    }));
  };

  return (
    <div>
      <SnackBarComponent
        open={snackBar.show}
        severity={snackBar.severity}
        message={snackBar.message}
        handleClose={snackBarHandleClose}
      />
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogContent>
          <DialogContentText>Add new city</DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                autoFocus
                onChange={event => {
                  onChange(event);
                }}
                margin="dense"
                id="city_name"
                name="city_name"
                label="City Name"
                type="text"
                value={formState.city_name || ""}
                fullWidth
                variant="standard"
                error={hasError("city_name", error)}
                helperText={
                  hasError("city_name", error)
                    ? error["city_name"].map(error => {
                        return error + " ";
                      })
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {/* <Autocomplete
                id="country-select"
                variant="standard"
                fullWidth
                options={countries}
                autoHighlight
                getOptionLabel={option => option.label}
                onChange={(event, value) => {
                  delete error["country_name"];
                  setError(error => ({
                    ...error
                  }));
                  if (value === null) {
                    setFormState(formState => ({
                      ...formState,
                      country_name: ""
                    }));
                  } else {
                    setFormState(formState => ({
                      ...formState,
                      country_name: value.label
                    }));
                  }
                }}
                value={
                  countries[
                    countries.findIndex(function (item, i) {
                      return item.label === formState.country_name;
                    })
                  ] || null
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password" // disable autocomplete and autofill
                    }}
                    error={hasError("country_name", error)}
                    helperText={
                      hasError("country_name", error)
                        ? error["country_name"].map(error => {
                            return error + " ";
                          })
                        : null
                    }
                  />
                )}
              /> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={e => handleCheckValidation(e)}>Add</Button>
        </DialogActions>
      </Dialog>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
