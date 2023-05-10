import {
  Title,
  Text,
  Button,
  createStyles,
  rem,
  BackgroundImage,
} from "@mantine/core";
import ReportImages from "../images/ReportImage.jpg";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({

  wrapper:{
    height: '100vh'
  },

  inner: {
    position: 'relative',
    paddingTop: rem(180),
    paddingBottom: rem(130),

    [theme.fn.smallerThan('xs')]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },
  },

  title: {
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: rem(-1),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[5],
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    height: rem(42),
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },

}));
const IndexPage = () => {
  const { classes } = useStyles();
  const navigateTo = useNavigate();
  const handleOnClick = () => {
    navigateTo("/login");
  };
  return (
    <BackgroundImage
      src={ReportImages}
      radius="xs"
      size="xl"
      className={classes.wrapper}
    >
          <div className={classes.inner}>

          <Title order={3} className={classes.title}>
          Incident Reporting System
            <Text component="span" inherit className={classes.highlight}>
            used to report incidents
            </Text>
          </Title>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              variant="white"
              size="lg"
              onClick={handleOnClick}
            >
              Get started
            </Button>
          </div>
          </div>

    </BackgroundImage>
  );
};
export default IndexPage;
