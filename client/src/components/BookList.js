import React, { useEffect, useState } from 'react';

import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';
import BookDetail from './BookDetails';

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
            <div>
                <ul>
                    {
                        books.map(book => {
                            return (
                                <li
                                    id={book.id}
                                    key={book.id}
                                    onClick={handleSelected} >
                                    Book name: {book.name}
                                </li>
                            )
                        })
                    }

                </ul>

                <BookDetail bookId={selected} />
            </div>
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
