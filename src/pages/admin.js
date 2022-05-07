import {
    AppBar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Paper,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Toolbar,
    Typography,
  } from "@mui/material";
  import bgi from "../img/bgi.jpg";
  import { ReactComponent as Logo } from "../img/logo.svg";
  
  import axios from "axios";
  import React, { createRef, useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { base } from "../components/baseUrl";
  import { useUserAuth } from "../context/UserAuthContext";
  // import { Header } from "../components/header";
  import AccountCircle from "@mui/icons-material/AccountCircle";
  export const Admin = () => {
    const { logOut, user, signUp } = useUserAuth();
  
    // eslint-disable-next-line prettier/prettier
    const navigate = useNavigate();
  
    const nameRef = createRef();
    const mobileRef = useRef(null);
    const emailRef = useRef(null);
    const add1Ref = useRef(null);
    const add2Ref = useRef(null);
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const detailsRef = useRef(null);
    const passRef = useRef(null);
  
    const [error, setError] = useState("");
  
    const saveHandler = () => {
      const name = nameRef.current?.value;
      const mobile = mobileRef.current?.value;
      const email = emailRef.current?.value;
      const add1 = add1Ref.current?.value;
      const add2 = add2Ref.current?.value;
      const pincode = pincodeRef.current?.value;
      const city = cityRef.current?.value;
      const details = detailsRef.current?.value;
      const pass = passRef.current?.value;
  
      if (
        !name ||
        !mobile ||
        !email ||
        !add1 ||
        !add2 ||
        !pincode ||
        !city ||
        !details ||
        !pass ||
        name.toString().trim().length === 0 ||
        mobile.toString().trim().length === 0 ||
        email.toString().trim().length === 0 ||
        add1.toString().trim().length === 0 ||
        add2.toString().trim().length === 0 ||
        pincode.toString().trim().length === 0 ||
        city.toString().trim().length === 0 ||
        details.toString().trim().length === 0 ||
        pass.toString().trim().length === 0
      ) {
        setError("Please enter a valid data.");
        return;
      }
      setError("");
  
      var data = JSON.stringify({
        address1: add1,
        address2: add2,
        city: city,
        pinCode: pincode,
        name: name,
        mobile: mobile,
        emailId: email,
        details: details,
      });
  
      var config = {
        method: "post",
        url: base + "/api/ngo/add",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
  
      axios(config)
        .then(function (response) {
          signUp(email, pass);
          console.log(JSON.stringify(response.data));
          setOpen(true);
        })
        .catch(function (error) {
          console.log(error);
        });
  
      // props.onSave(enteredTitle.toString(), new Date(selectedDate));
    };
    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      navigate("/admin");
      setOpen(false);
    };
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const logouthandleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = async () => {
      try {
        await logOut();
  
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };
  
    return (
      <div
        style={{
          backgroundImage: `url(${bgi})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppBar
          style={{
            background: "#1a237e",
          }}
        >
          <Toolbar>
            <SvgIcon sx={{ fontSize: 50 }}>
              <Logo />
            </SvgIcon>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, p: 2 }}>
              Helping Hands
            </Typography>
            {user && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={logouthandleClose}
                >
                  <MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
  
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            mx: "10%",
            pt: "40%",
            borderRadius: 1,
          }}
        >
          <Paper
            elevation={10}
            style={{
              textAlign: "left",
              color: "black",
              width: "100%",
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 6,
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, p: 2 }}>
              Add NGO
            </Typography>
            <Paper
              style={{
                textAlign: "left",
                color: "black",
                width: "100%",
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 6,
                borderRadius: 4,
                background: "#f3f3f3",
              }}
            >
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, p: 2 }}
                      >
                        Primary point of contact at NGO
                      </Typography>
                    </TableCell>
                  </TableRow>
  
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Full name*"
                          inputRef={nameRef}
                          inputProps={{ "aria-label": "Full name" }}
                        />
                      </Paper>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Mobile No*"
                          inputRef={mobileRef}
                          inputProps={{ "aria-label": "Full name" }}
                        />
                      </Paper>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Email id*"
                          inputRef={emailRef}
                          inputProps={{ "aria-label": "Full name" }}
                        />
                      </Paper>
                    </TableCell>
                  </TableRow>
  
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, p: 2 }}
                      >
                        Address details
                      </Typography>
                    </TableCell>
                  </TableRow>
  
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Address line 1*"
                          inputRef={add1Ref}
                          inputProps={{ "aria-label": "Full name" }}
                        />
                      </Paper>
                    </TableCell>
                  </TableRow>
  
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Address line 2*"
                          inputRef={add2Ref}
                          inputProps={{ "aria-label": "Full name" }}
                        />
                      </Paper>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="City*"
                          inputRef={cityRef}
                          inputProps={{ "aria-label": "Full name" }}
                        />
                      </Paper>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          type="number"
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Pincode*"
                          inputRef={pincodeRef}
                          inputProps={{
                            "aria-label": "Full name",
                          }}
                        />
                      </Paper>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Write details here*"
                          inputRef={detailsRef}
                          inputProps={{ "aria-label": "Write-details-here" }}
                          multiline
                          rows={2}
                        />
                      </Paper>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, p: 2 }}
                      >
                        Password details
                      </Typography>
                    </TableCell>
                  </TableRow>
  
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell colSpan={2} component="th" scope="row">
                      <Paper
                        component="form"
                        sx={{
                          border: "1px solid #d7d7d7",
                          m: 2,
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 4,
                        }}
                      >
                        <InputBase
                          sx={{ m: 1, ml: 4, flex: 1 }}
                          placeholder="Password*"
                          inputRef={passRef}
                          inputProps={{ "aria-label": "Password" }}
                        />
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {error && (
                <Typography variant="h6" component="div">
                  {error}
                </Typography>
              )}
              <Button
                onClick={saveHandler}
                variant="contained"
                sx={{ m: 1, background: "#1a237e", borderRadius: 4 }}
              >
                <Typography variant="h5" component="div">
                  Submit
                </Typography>
              </Button>
            </Paper>
          </Paper>
        </Box>
      </div>
    );
  };