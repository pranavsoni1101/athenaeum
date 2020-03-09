import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Grid from "@material-ui/core/Grid";
import {
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider
} from "@material-ui/core";
const axios = require("axios").default;

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    margin: theme.spacing(2)
  },
  field: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  },
  modalDescription: {
    paddingTop: theme.spacing(1)
  },
  bookPicture: {
    margin: "auto"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewBookModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [book, setBook] = React.useState({});
  const [isbn, setISBN] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLoaded(false);
    setBook({});
    setISBN(0);
    setOpen(false);
  };

  const searchBook = evt => {
    axios.get("http://localhost:9000/api/voting/search/" + isbn).then(resp => {
      if (resp.data.totalItems === 1) {
        console.log(resp.data);
        let result = resp.data.items[0];
        setBook(result);
        setLoaded(true);
      }
    });
  };

  if (loaded == true) {
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddBoxIcon></AddBoxIcon>}
          onClick={handleClickOpen}
        >
          New Request
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          maxWidth="md"
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Book Request
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item md={8}>
                <TextField
                  className={classes.field}
                  id="outlined-basic"
                  value={isbn}
                  onChange={evt => setISBN(evt.target.value)}
                  label="ISBN"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <Button
                  className={classes.field}
                  color="secondary"
                  variant="contained"
                  onClick={searchBook}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          <Divider></Divider>
          <DialogContent dividers>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{book.volumeInfo.title}</TableCell>
                  <TableCell align="center" rowSpan={6}>
                    <img src={book.volumeInfo.imageLinks.thumbnail}></img>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell>{book.volumeInfo.authors.join(", ")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Publisher</TableCell>
                  <TableCell>{book.volumeInfo.publisher}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Edition</TableCell>
                  <TableCell>{book.volumeInfo.edition}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{book.volumeInfo.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ISBN</TableCell>
                  <TableCell>
                    {book.volumeInfo.industryIdentifiers[0].identifier +
                      ", " +
                      book.volumeInfo.industryIdentifiers[1].identifier}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography className={classes.modalDescription} variant="h5">
              Description
            </Typography>
            <Typography variant="subtitle2">
              {book.volumeInfo.description}
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddBoxIcon></AddBoxIcon>}
          onClick={handleClickOpen}
        >
          New Request
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          maxWidth="md"
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Book Voting
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item md={8}>
                <TextField
                  className={classes.field}
                  id="outlined-basic"
                  value={isbn}
                  onChange={evt => setISBN(evt.target.value)}
                  label="ISBN"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <Button
                  className={classes.field}
                  color="secondary"
                  variant="contained"
                  onClick={searchBook}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Dialog>
      </div>
    );
  }
}
