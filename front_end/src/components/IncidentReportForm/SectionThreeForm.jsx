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

const SectionThreeForm = () => {
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
      <Card>
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
              SECTION 2 - INJURY OR ILLNESS
              <Divider my="sm" />
            </Title>
            <Checkbox.Group
              label="Type:"
              withAsterisk
              value={value}
              onChange={setValue}
            >
              <Group mt="md">
                <Checkbox
                  value="none"
                  label="None"
                  // onClick={(value) => onCheckboxChange(value)}
                />
                <Checkbox
                  value="physicalInjury"
                  label="Physical Injury"
                  // onClick={(value) => onCheckboxChange(value)}
                />
                <Checkbox
                  value="occupationalIllness"
                  label="Occupational Illness"
                  // onClick={(value) => onCheckboxChange(value)}
                />
                <Checkbox
                  value="potentialHarmfulExposure"
                  label="Potential Harmful Exposure"
                  // onClick={(value) => onCheckboxChange(value)}
                />
              </Group>
            </Checkbox.Group>

            <Textarea
              mt="md"
              label="Injured Persons and Description of Injuries:"
              placeholder="Your message"
              maxRows={10}
              minRows={5}
              autosize
              name="DescriptionAndCauseOfTheIncident"
              variant="filled"
              {...form.getInputProps("DescriptionAndCauseOfTheIncident")}
            />
          </Box>
        </form>
      </Card>
    </Center>
  );
};
export default SectionThreeForm;
