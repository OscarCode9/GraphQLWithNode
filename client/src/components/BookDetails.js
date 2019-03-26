import React, { useEffect, useState } from 'react';

import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries';


function BookDetails({data}) {
    const [book, setBook] = useState(null)

    useEffect(
        () => {
            if(!data.loading){
                setBook(data.book)
            }
            
        }, [data]
    )

    const displayBookDetails = () => {
        if (book) {
            return (
                <div>
                    <h2> {book.name} </h2>
                    <p> {book.genre} </p>
                    <p> {book.author.name} </p>
                    <p> All books by this author </p>
                    <ul className='other-books' >
                        {
                            book.author.books.map((x, index) => {
                                return (
                                    <li key={index} >
                                        {x.name}
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    No book selected
                </div>
            )
        }

    }
    return (
        <div id='book-details' >
            <p>
                Output book details here
            </p>
            {
                displayBookDetails()
            }
        </div>
    )
}

export default graphql(getBookQuery, {
    options: ({ bookId }) => {
        return {
            variables: {
                id: bookId
            }
        }
    }
})(BookDetails);