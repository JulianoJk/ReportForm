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

const SectionForm = () => {
  const [isOtherClicked, toogleIsOtherClicked] = useDisclosure(false);
  const [openSectionTwo, toggleSectionTwo] = useDisclosure(false);

  const [dateError, setDateError] = useState(null);
  const form = useForm({
    initialValues: {
      // Section 1
      dateReported: "",
      time: "",
      campusLocation: "",
      status: {
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
      // Section 2
      sectionTwoType: {
        none: false,
        physicalInjury: false,
        occupationalIllness: false,
        potentialHarmfulExposure: false,
      },
      treatment: {
        none: false,
        firstAid: false,
        emergencyMedicalServices: false,
        personalPhysician: false,
        studentHealthServices: false,
        hospitalOutpatient: false,
        hospitalAdmitted: false,
      },
    },
  });

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
    console.log(form.values);
  };
  // a: this is a function that is called when a checkbox is clicked and it updates the form values to reflect the new checkbox state (checked or unchecked)
  const onCheckboxChange = (event) => {
    form.setFieldValue("status", {
      ...form.values.status,
      // this line is updating the value of the type object in the form values
      [event.target.value]: event.target.checked,
    });
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

              <Checkbox.Group label="Status:" withAsterisk>
                <Group mt="md">
                  <Checkbox
                    value="injuryOrIllness"
                    label="Injury/Illness"
                    onClick={(value) => {
                      onCheckboxChange(value);
                      toggleSectionTwo.toggle();
                    }}
                  />
                  <Checkbox
                    value="unsafeCondition"
                    label="Unsafe Condition"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="environmentalSpill"
                    label="Environmental Spill"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="fire"
                    label="Fire"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="laboratorySpillORIncident"
                    label="Laboratory Spill/Incident"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="nonVehicularAccident"
                    label="Non-Vehicular Accident"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="other"
                    label="Other"
                    onClick={(value) => {
                      onCheckboxChange(value);
                      toogleIsOtherClicked.toggle();
                    }}
                  />
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
            <Collapse in={openSectionTwo}>
              <Box sx={{ marginTop: "1rem" }}>
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
              </Box>
              <Checkbox.Group label="Type:" withAsterisk>
                <Group mt="md">
                  <Checkbox
                    value="none"
                    label="None"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="physicalInjury"
                    label="Physical Injury"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="occupationalIllness"
                    label="Occupational Illness"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="potentialHarmfulExposure"
                    label="Potential Harmful Exposure"
                    onClick={(value) => onCheckboxChange(value)}
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
                {...form.getInputProps("descriptionAndCauseOfTheIncident")}
              />
              <Checkbox.Group label="Type:" withAsterisk>
                <Group mt="md">
                  <Checkbox value="none" label="None" />
                  <Checkbox value="firstAid" label="1st Aid" />
                  <Checkbox
                    value="emergencyMedicalServices"
                    label="Emergency Medical Services"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="personalPhysician"
                    label="Personal Physician"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="studentHealthServices"
                    label="Student Health Services"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="hospitalOutpatient"
                    label="Hospital (Outpatient)"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                  <Checkbox
                    value="hospitalAdmitted"
                    label="Hospital (Admitted)"
                    onClick={(value) => onCheckboxChange(value)}
                  />
                </Group>
              </Checkbox.Group>
            </Collapse>

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
export default SectionForm;
