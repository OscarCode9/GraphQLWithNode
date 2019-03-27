import React, { useEffect, useState } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorQuery, addBookMutation, getBooksQuery } from '../queries'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
}));



function AddBook({ getAuthorQuery, addBookMutation }) {
    const classes = useStyles();
    const [form, setForm] = useState({
        name: '',
        genre: '',
        author: ''
    })

    const [data, setData] = useState({ loading: true });

    useEffect(
        () => {
            setData(getAuthorQuery);
        }
    )


    const handleChangeData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(form => {
            return {
                ...form,
                [name]: value
            }
        })

    }

    const displayAuthors = () => {
        if (data.loading) {
            return (
                <MenuItem disabled > Loading Authors </MenuItem>
            )
        } else {
            if (data.authors) {
                return data.authors.map(author => {
                    return (
                        <MenuItem
                            value={author.id}
                            key={author.id}>
                            {author.name}
                        </MenuItem>
                    )
                })
            }
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        addBookMutation({
            variables: {
                name: form.name,
                genre: form.genre,
                authorId: form.author
            },
            refetchQueries: [{ query: getBooksQuery }]
        });

        setForm({
            name: '',
            genre: '',
            author: ''
        })
    }

    return (

        <div>
            <Paper style={{
                padding: '3%',
                width: '30%'
            }} elevation={10}>
                <form id="add-book"  >
                    <div className="field">

                        <TextField
                            id="standard-name"
                            label="Book name:"
                            className={classes.textField}
                            name='name'
                            onChange={handleChangeData}
                            value={form.name}
                            margin="normal"
                        />
                    </div>
                    <div className="field">
                        <TextField
                            id="standard-name"
                            label="Genre:"
                            className={classes.textField}
                            onChange={handleChangeData}
                            name='genre'
                            value={form.genre}
                            margin="normal"
                        />

                    </div>
                    <div className="field">
                        <InputLabel htmlFor="author">Author: </InputLabel>
                        <Select
                            onChange={handleChangeData}
                            value={form.author}
                            name='author'
                            inputProps={{
                                name: 'author',
                                id: 'author',
                            }}
                        >
                            {displayAuthors()}

                        </Select>
                    </div>
                    <Fab
                        style={{
                            float: 'right'
                        }}
                        color="primary"
                        aria-label="Add"
                        onClick={submitForm}
                    >
                        <AddIcon />
                    </Fab>
                </form>

            </Paper>
        </div>

    )
}

export default compose(
    graphql(getAuthorQuery, { name: 'getAuthorQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' }),

)(AddBook);
