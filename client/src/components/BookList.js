import React, { useEffect, useState } from 'react';

import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';
import BookDetail from './BookDetails';
import Grid from '@material-ui/core/Grid';

const styleNav = {
    left: '62%',
    width: '38vw',
    padding: '4%',
    height: '100vh',
    position: 'fixed',
    top: '1px',
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'white'
}
function BookList({ data }) {

    const [books, setBooks] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(
        () => {
            if (!data.loading) {
                setBooks(data.books)
            }
        }, [data]
    )

    const handleSelected = (e) => {
        setSelected(e.target.id)
    }

    if (!data.loading) {
        return (
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div>
                        <ul>
                            {
                                Array.isArray(books) ? books.map(book => {
                                    return (
                                        <li
                                            className='itemBook'
                                            id={book.id}
                                            key={book.id}
                                            onClick={handleSelected} >
                                            Book name: {book.name}
                                        </li>
                                    )
                                }) : null
                            }

                        </ul>


                    </div>
                </Grid>

                <Grid style={styleNav} item xs={6}>
                    <BookDetail bookId={selected} />
                </Grid>
            </Grid>

        )
    } else {
        return (
            <h3>
                Loading data ...
            </h3>
        )
    }

}

export default graphql(getBooksQuery)(BookList);
