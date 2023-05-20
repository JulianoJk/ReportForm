import React from "react";
import { HeaderMegaMenu } from "../Header/Header.jsx";
import { useAppState } from "../../context/AppContext.jsx";
import { NotFound } from "../NotFound/NotFound.jsx";
import { useForm } from "@mantine/form";
import { useStyles } from "./AdminPage.styles.js";
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
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../api/api.js";
import { Alert } from "@mantine/core";
import { useState } from "react";

const AdminPage = () => {
  const { isUserLogged, userInfo } = useAppState();
  const { classes } = useStyles();
  const [errorResponse, setErrorResponse] = useState("");

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      role: "",
      site: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      username: (val) => (/[a-zA-Z0-9]/.test(val) ? null : "Invalid username"),
      name: (val) => (/[a-zA-Z0-9]/.test(val) ? null : "Invalid name"),
      site: (val) => (/[a-zA-Z0-9]/.test(val) ? null : "Invalid site"),
      role: (val) =>
        val === "admin" || val === "user" || val === "manager"
          ? null
          : "Invalid role",
    },
  });
  const {
    mutate: login,
    isLoading,
    isSuccess,
  } = useMutation(registerAPI, {
    onSuccess: (data) => {
      if (data.status === "error") {
        setErrorResponse(data.message);
        return;
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleOnSumbit = (values) => {
    login(values);
  };
  return (
    <>
      {isUserLogged ? (
        <>
          <HeaderMegaMenu></HeaderMegaMenu>

          <Center maw={600} mx="auto">
            <Paper
              radius="md"
              p="xl"
              withBorder
              className={classes.formContainer}
            >
              <Text size="lg" weight={500}>
                Welcome back {userInfo.username}!
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
                  <TextInput
                    label="Username"
                    placeholder="myusername"
                    value={form.values.username}
                    onChange={(event) =>
                      form.setFieldValue("username", event.currentTarget.value)
                    }
                    error={form.errors.username && "Invalid username"}
                    radius="md"
                  />
                  <TextInput
                    label="Role"
                    placeholder="myrole"
                    value={form.values.role}
                    onChange={(event) =>
                      form.setFieldValue("role", event.currentTarget.value)
                    }
                    error={form.errors.role && "Invalid role"}
                    radius="md"
                  />
                  <TextInput
                    label="Name"
                    placeholder="myname"
                    value={form.values.name}
                    onChange={(event) =>
                      form.setFieldValue("name", event.currentTarget.value)
                    }
                    error={form.errors.name && "Invalid name"}
                    radius="md"
                  />
                  <TextInput
                    label="Site"
                    placeholder="mysite"
                    value={form.values.site}
                    onChange={(event) =>
                      form.setFieldValue("site", event.currentTarget.value)
                    }
                    error={form.errors.site && "Invalid site"}
                    radius="md"
                  />

                  {errorResponse && (
                    <Alert
                      icon={""}
                      title="Bummer!"
                      color="red"
                      variant="filled"
                    >
                      {errorResponse}
                    </Alert>
                  )}
                  {isSuccess && (
                    <Alert title="Success!" color="green">
                      User registered successfully!
                    </Alert>
                  )}
                </Stack>
                <Box>
                  <Button
                    type="submit"
                    radius="xl"
                    className={classes.submitButton}
                    color="green"
                    loading={isLoading}
                  >
                    Register user
                  </Button>
                </Box>
              </form>
            </Paper>
          </Center>
        </>
      ) : (
        <>
          <HeaderMegaMenu></HeaderMegaMenu>
          <NotFound></NotFound>
        </>
      )}
    </>
  );
};
export default AdminPage;
