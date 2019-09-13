import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    width: "40%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    margin: "auto"
  },
  table: {
    minWidth: 650
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "white",
    width: 500,
    marginTop: "10%",
    marginLeft: "37%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    color: "white"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  schedule: {
    marginLeft: 0
  }
}));

export default function Schedule() {
  useEffect(() => {
    getWorkers();
  }, []);

  // React States
  const [workersFetched, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerDate, setNewWorkerDate] = useState(null);

  const classes = useStyles();

  // Fetch workers from database
  const getWorkers = async () => {
    try {
      const workersFetched = await axios.get(`/workers`);
      if (workersFetched.data.length > 0 || workersFetched.data.length === 0) {
        setLoading(false);
      }
      setWorkers([...workersFetched.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle new worker data
  const handleNewWorkerName = e => {
    setNewWorkerName(e.target.value);
  };

  const handleNewWorkerDate = e => {
    setNewWorkerDate(e.target.value);
  };

  // Save new worker in the database.
  const save = async e => {
    e.preventDefault();
    const workerToSave = {
      name: newWorkerName,
      date: newWorkerDate
    };
    try {
      await axios.post(`/worker`, workerToSave);
    } catch (error) {
      console.error("aaaa", error);
    }
  };

  // Delete a worker from the database.
  const deleteWorker = async id => {
    try {
      axios.delete(`/worker/${id}`);
      getWorkers();
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <Paper className={classes.root} xs="6">
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workersFetched.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Moment format="YYYY-MM-DD">{row.date}</Moment>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={e => deleteWorker(row._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          setOpen(true);
        }}
      >
        Add
      </Button>

      <Modal open={open}>
        <div>
          <form className={classes.container} onSubmit={e => save(e)}>
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              onChange={e => handleNewWorkerName(e)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              id="date"
              label=" "
              onChange={e => handleNewWorkerDate(e)}
              className={classes.textField}
              margin="normal"
              type="date"
              required
            />
            <Button
              variant="contained"
              type="submit"
              className={classes.button}
            >
              Save
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                setOpen(false);
                getWorkers();
              }}
            >
              Close
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
