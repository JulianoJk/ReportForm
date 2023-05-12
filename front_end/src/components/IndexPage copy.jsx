import { createStyles, Overlay, Container, Title, Button, Text, rem } from '@mantine/core';
import ReportImages from '../images/ReportImage.jpg';
import { useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage: `url(${ReportImages})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  },
  container: {
    height: rem(700),
    display: 'flex',
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

const IndexPage = () => {
  const { classes } = useStyles();
  const navigateTo = useNavigate();
  const handleOnClick = () => {
    navigateTo('/login')
  }
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Incident Report Form</Title>
        <Text className={classes.description} size="xl" mt="xl">
            This is a simple incident report form that can be used to report incidents.
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control} onClick={handleOnClick}>
          Get started
        </Button>
      </Container>
    </div>
  );
}
export default IndexPage;