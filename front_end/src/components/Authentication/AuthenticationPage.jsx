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

const AuthenticationForm = (props) => {
  const { classes } = useStyles();
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

  const handleOnSumbit = (values) => {
    console.log(`email: ${values.email}, password: ${values.password}`);
    appDispatch({ type: "SET_USER_LOGGED", isUserLogged: true });
    navigate("/home");
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
