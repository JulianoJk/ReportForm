import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  formContainer: {
    borderWidth: '2px !important',
    borderRadius: 5,
    boxShadow: 'none',
    padding: 10,
    width: '100%',
    backgroundColor:  theme.colors.gray[0],
    marginTop: 100,
    border: `11px solid indigo`,
  },
  form: {
    padding: 10,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButton: {
    display: 'inline-block',
    width: '100%',
    marginTop: 10,
  },
  inputLabels: {
    fontWeight: 700,
  },
  switchAuthLinks: {
    alignItems: 'center',
    padding: 10,
  },
}));