import React, { useEffect, useState } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorQuery, addBookMutation, getBooksQuery } from '../queries'


function AddBook({ getAuthorQuery, addBookMutation }) {

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
                <option disabled > Loading Authors </option>
            )
        } else {
            return data.authors.map(author => {
                return (
                    <option
                        value={author.id}
                        key={author.id}

                    >
                        {
                            author.name
                        }
                    </option>
                )

            })
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
    }

    return (
        <div>
            <form id="add-book" onSubmit={submitForm} >
                <div className="field">
                    <label>Book name:</label>
                    <input
                        name='name'
                        onChange={handleChangeData}
                        value={form.name}
                        type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input
                        onChange={handleChangeData}
                        name='genre'
                        value={form.genre}
                        type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select
                        onChange={handleChangeData}
                        value={form.author}
                        name='author' >
                        <option>Select author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
    )
}
export default compose(
    graphql(getAuthorQuery, { name: 'getAuthorQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' }),

)(AddBook);
