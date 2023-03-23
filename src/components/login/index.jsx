import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import treeshop from "../../../src/assets/treeshop.jpeg";
import { BackgroundImage } from "./login.styled";
import { Container, FormBox } from "./login.styled";

const Login = () => {
  const navigate = useNavigate();
  let users = [
    { id: "1", name: "stalin", password: "1223" },
    { id: "1", name: "stalin", password: "1223" },
  ];
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passError, setPassError] = useState(false);

  const loginHandler = () => {
    if (!users.map((val) => val.name).includes(userName)) {
      setNameError(true);
    }
    if (!users.map((val) => val.password).includes(userPassword)) {
      setPassError(true);
    }

    if (
      users.map((val) => val.password).includes(userPassword) &&
      users.map((val) => val.password).includes(userPassword)
    ) {
      navigate("/dashboard");
    }
  };
  return (
    <Container>
      {/* <BackgroundImage src={treeshop} alt="treeshop" /> */}
      <FormBox>
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          label="User Name"
        />
        <TextField
          onChange={(e) => setUserPassword(e.target.value)}
          label="Password"
        />
        <Button onClick={loginHandler} variant="contained">
          Login
        </Button>
      </FormBox>
    </Container>
  );
};

export default Login;
