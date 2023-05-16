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
} from "@mantine/core";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
const SectionTwoForm = () => {
  const [checked, setChecked] = useState(false);

  const [dateError, setDateError] = useState(null);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      dateReported: "",
      email: "",
      message: "",
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

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Center>
      <Card sx={{ width: 900, marginTop: -50, border: "1px solid black" }}>
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
                SECTION 1 - REQUIRED INFORMATION (Individual reporting the
                incident)
                <Divider my="sm" />
              </Title>
            </Box>

            <SimpleGrid
              cols={2}
              mt="xl"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <TextInput
                withAsterisk
                label="First Name"
                placeholder="First name"
                name="First name"
                variant="filled"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                withAsterisk
                label="Last Name"
                placeholder="Last name"
                name="Last name"
                variant="filled"
                {...form.getInputProps("lastName")}
              />
              <TextInput
                withAsterisk
                label="Email"
                placeholder="Your email"
                name="email"
                variant="filled"
                {...form.getInputProps("email")}
              />
              <TextInput
                withAsterisk
                label="Address (Home or Work)"
                placeholder="Home or Work"
                name="Address"
                variant="filled"
                {...form.getInputProps("address")}
              />
              <TextInput
                withAsterisk
                label="Phone"
                placeholder="Phone number"
                name="Phone"
                variant="filled"
                {...form.getInputProps("phone")}
              />
              <DateInput
                valueFormat="DD/MM/YYYY"
                error={dateError}
                maxDate={new Date()}
                minDate={new Date(1990, 1, 1)}
                label="Date Reported (MM/DD/YYYY)"
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
            </SimpleGrid>
            <Textarea
              mt="md"
              label="Message"
              placeholder="Your message"
              maxRows={10}
              minRows={5}
              autosize
              name="message"
              variant="filled"
              {...form.getInputProps("message")}
            />

            <Checkbox.Group label="Status:" withAsterisk>
              <Group mt="xs">
                <Checkbox
                  value="Student"
                  label="Student"
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                />
                <Checkbox value="Faculty" label="Faculty" />
                <Checkbox value="Staff" label="Staff" />
                <Checkbox value="Visitor" label="Visitor" />
                <Checkbox value="Contractor" label="Contractor" />
              </Group>
            </Checkbox.Group>

            <Group position="center" mt="xl">
              <Button type="submit" size="md">
                Send message
              </Button>
            </Group>
          </form>
        </ScrollArea>
      </Card>
    </Center>
  );
};
export default SectionTwoForm;
