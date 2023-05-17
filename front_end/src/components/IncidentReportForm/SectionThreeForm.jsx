import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Divider,
  Card,
  Box,
  Center,
  ScrollArea,
  Checkbox,
  Collapse,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { DateInput, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

const SectionTwoForm = () => {

  const [value, setValue] = useState([]);
  const [isOtherClicked, { toggle }] = useDisclosure(false);

  const [dateError, setDateError] = useState(null);
  const form = useForm({
    initialValues: {
      dateReported: "",
      time: "",
      campusLocation: "",

      type: {
        // TODO!: For this
        injuryOrIllness: false,
        unsafeCondition: false,
        environmentalSpill: false,
        fire: false,
        laboratorySpillORIncident: false,
        // TODO!: And for this
        nonVehicularAccident: false,
        other: false,
      },
      otherType: "",
    },
    validate: {
      firstName: (value) =>
        value.trim().length < 2 ? "First name is too short" : null,
      lastName: (value) =>
        value.trim().length < 2 ? "Last name is too short" : null,
      address: (value) =>
        value.trim().length < 2 ? "Address is too short" : null,
      phone: (value) =>
        !/^\d+$/.test(value) || value.length < 8
          ? "Phone number is invalid"
          : null,
      email: (value) =>
        !/^\S+@\S+$/.test(value) ? "Email address is invalid" : null,
      dateReported: (value) => {
        if (!value) {
          setDateError("Date is required");
        } else if (new Date(value) > new Date()) {
          setDateError("Date can't be in the future");
        } else {
          setDateError(null);
        }
      },
    },
  });

  useEffect(() => {
    console.log(value);
  }, [value]);
  // const { mutate: login, isLoading } = useMutation(loginAPI, {
  //   onSuccess: (data) => {
  //     if (data.status === "error") {
  //       setErrorResponse(data.message);
  //       return;
  //     }
  //     const userInfo = parseJwt(data.token);

  //     appDispatch({ type: "SET_USER_LOGGED", isUserLogged: true });
  //     appDispatch({ type: "SET_USER_INFO", userInfo: userInfo });
  //     appDispatch({ type: "SET_USER_TOKEN", userToken: data.token });

  //     navigate(navigateByRole(userInfo.role));
  //   },
  //   onError: (error) => {
  //     console.log("error", error);
  //   },
  // });
  // const handleOnSumbit = (values) => {
  //   login({ email: values.email, password: values.password });
  // };
  const handleSubmit = (values) => {
    console.log(values);
  };
  const onCheckboxChange = (event) => {
    // console.log(event.target.value);
    // q: how to change the value of the status object?

    form.setFieldValue(event.target.value, event.target.checked);
  };
  return (
    <Center>
      <Card sx={{ width: 1100, marginTop: -100, border: "1px solid black" }}>
        <ScrollArea h={600}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Box>
              <Title
                size="md"
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                })}
                weight={900}
                align="center"
              >
                SECTION 1 - INCIDENT INFORMATION
                <Divider my="sm" />
              </Title>
            </Box>

            <SimpleGrid
              cols={2}
              mt="xl"
              breakpoints={[{ maxWidth: "md", cols: 2 }]}
            >
              <DateInput
                valueFormat="DD/MM/YYYY"
                error={dateError}
                maxDate={new Date()}
                minDate={new Date(1990, 1, 1)}
                label="Date of the Incident (MM/DD/YYYY)"
                placeholder="Pick date"
                variant="filled"
                maw={500}
                mx="auto"
                sx={{ width: "100%" }}
                onChange={(value) => {
                  form.setFieldValue("dateReported", value.toString());
                  setDateError(null);
                }}
                withAsterisk
              />
              <TimeInput
                label="Time (HH:MM)"
                variant="filled"
                description="Press space for more options"
                withAsterisk
                onChange={(event) => {
                  console.log(event.target.value.toString());
                  form.setFieldValue("time", event.target.value.toString());
                }}
              />
              <TextInput
                withAsterisk
                label="Campus Location"
                placeholder="Campus Location"
                name="Campus Location"
                variant="filled"
                {...form.getInputProps("campusLocation")}
              />

              <Checkbox.Group
                label="Status:"
                withAsterisk
                value={value}
                onChange={setValue}
              >
                <Group mt="md">
                  <Checkbox
                    value="injuryOrIllness"
                    label="Injury/Illness"
                    // onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="unsafeCondition"
                    label="Unsafe Condition"
                    // onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="environmentalSpill"
                    label="Environmental Spill"
                    // onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="Fire"
                    label="Fire"
                    // onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="laboratorySpillORIncident"
                    label="Laboratory Spill/Incident"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="nonVehicularAccident"
                    label="Non-Vehicular Accident"
                    // onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox value="other" label="Other" onClick={toggle} />
                </Group>
              </Checkbox.Group>
            </SimpleGrid>
            <Collapse in={isOtherClicked}>
              <TextInput
                withAsterisk
                label="Please specify"
                placeholder="Please specify the other type"
                name="otherType"
                variant="filled"
                {...form.getInputProps("otherType")}
              />
            </Collapse>
            <Textarea
              mt="md"
              label="Description and cause of the incident"
              description="Indicate conditions such as weather, construction, cleaning, etc. with
                your explanation. Visitors should include their purpose for being on campus."
              placeholder="Your message"
              maxRows={10}
              minRows={5}
              autosize
              name="message"
              variant="filled"
              {...form.getInputProps("message")}
            />

            <Group position="center" mt="xl">
              <Button type="submit" size="md">
                Submit Report
              </Button>
            </Group>
          </form>
        </ScrollArea>
      </Card>
    </Center>
  );
};
export default SectionTwoForm;
