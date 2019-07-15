import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Clipboard from "react-clipboard.js";
import load from "./loading.gif";
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://github.com/EhsaanIqbal/minifyurl">
        Minify and personalize your links
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Main() {
  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [minurl, setMinurl] = useState({ _url: "", _rec: false });
  const [loading, setLoading] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    const new_url = {
      longUrl: url
    };
    axios.post("http://localhost:3000/api/minify", new_url).then(res => {
      setLoading(false);
      setMinurl({ _url: res.data.shortUrl, _rec: true });
     
    });
  };

  const Bt = () => {
    return (
      <Clipboard component="a" data-clipboard-text={minurl._url}>
        <Button variant="contained" color="primary">
          {minurl._url}
        </Button>
      </Clipboard>
    );
  };
  const content = loading ? (
    <img
      src={load}
      style={{ display: "block", margin: "auto" }}
      alt="Loading.."
    />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          minifyURL{" "}
          <span aria-label="" role="img">
            🚀
          </span>
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Enter URL"
            name="url"
            autoFocus
            required
            onChange={e => setUrl(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            GO
          </Button>
        </form>
        {minurl._rec ? <Bt /> : null}
      </div>

      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );

  return <div>{content}</div>;
}
