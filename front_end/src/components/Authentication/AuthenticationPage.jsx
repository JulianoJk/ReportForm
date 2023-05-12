import { useForm } from "@mantine/form";
import { useStyles } from "./AuthenticationPage.styles";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Stack,
  Center,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HeaderMegaMenu } from "../Header/Header.jsx";
import { useAppDispatch } from "../../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../api/api.js";
import { Alert } from "@mantine/core";
import { useState } from "react";

const AuthenticationForm = (props) => {
  const { classes } = useStyles();
  const [errorResponse, setErrorResponse] = useState("");
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const { mutate: login } = useMutation(loginAPI, {
    onSuccess: (data) => {
      if (data.status === "error") {
        setErrorResponse(data.message);
        return;
      }

      appDispatch({ type: "SET_USER_LOGGED", isUserLogged: true });
      navigate("/home");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const handleOnSumbit = (values) => {
    login({ email: values.email, password: values.password });
  };
  return (
    <>
      <HeaderMegaMenu></HeaderMegaMenu>

      <Center maw={600} mx="auto">
        <Paper
          radius="md"
          p="xl"
          withBorder
          {...props}
          className={classes.formContainer}
        >
          <Text size="lg" weight={500}>
            Welcome to Incident Reports
          </Text>

          <form
            onSubmit={form.onSubmit((values) => {
              handleOnSumbit(values);
            })}
            className={classes.form}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="hello@info.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />
              {errorResponse && (
                <Alert icon={""} title="Bummer!" color="red" variant="filled">
                  {errorResponse}
                </Alert>
              )}
            </Stack>
            <Box>
              <Button
                type="submit"
                radius="xl"
                className={classes.submitButton}
                color="green"
              >
                Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Center>
    </>
  );
};
export default AuthenticationForm;
