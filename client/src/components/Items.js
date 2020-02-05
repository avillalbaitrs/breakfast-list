import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Items() {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '2%',
      overflowX: 'auto',
      marginRight: '15%',
    },
    title: {
      textAlign: 'center',
    },
    items: {
      width: '45%',
      float: 'right',
    },
    button: {
      margin: theme.spacing(1),
      textAlign: 'center',
    },
    input: {
      display: 'none',
    },
    button: {
      margin: theme.spacing(1),
      textAlign: 'center',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: 'white',
      width: 500,
      marginTop: '10%',
      marginLeft: '37%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      color: 'white',
    },
  }));
  useEffect(() => {
    getItems();
  }, []);

  const classes = useStyles();

  const [itemsFetched, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  // Fetch items from database
  const getItems = async () => {
    try {
      const itemsFetched = await axios.get(
        `https://fast-reaches-80611.herokuapp.com/items`,
      );
      //   if (itemsFetched.data.length > 0 || itemsFetched.data.length === 0) {
      //     setLoading(false);
      //   }
      console.log(itemsFetched);
      setItems([...itemsFetched.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle new item name
  const handleNewItemName = (e) => {
    setNewItemName(e.target.value);
  };

  // Save new item in the database.
  const save = async (e) => {
    e.preventDefault();
    const itemToSave = {
      name: newItemName,
    };
    try {
      await axios.post(`/item`, itemToSave);
    } catch (error) {
      console.error('aaaa', error);
    }
  };

  // Delete a Item from the database.
  const deleteItem = async (id) => {
    try {
      axios.delete(`/item/${id}`);
      getItems();
    } catch (error) {
      console.error(error);
    }
  };

  const { items, title, root, table, button, container, textField } = classes;
  return (
    <div className={items}>
      <h1 className={title}>
        Items into the fridge <span role="img">🍞</span>
      </h1>
      <Paper className={root}>
        <Table className={table}>
          <TableBody>
            {itemsFetched.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    // className={margin}
                    onClick={(e) => deleteItem(row._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          className={button}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </Paper>
      <Modal open={open}>
        <div>
          <form className={container} onSubmit={(e) => save(e)}>
            <TextField
              id="standard-name"
              label="Item"
              className={textField}
              onChange={(e) => handleNewItemName(e)}
              margin="normal"
              required
              autoFocus
            />
            <Button variant="contained" type="submit" className={button}>
              Save
            </Button>
            <Button
              variant="contained"
              className={button}
              onClick={() => {
                setOpen(false);
                getItems();
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

export default Items;
