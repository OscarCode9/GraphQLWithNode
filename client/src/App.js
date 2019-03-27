import React, { Component } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/purple';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})



const theme = createMuiTheme({
  palette: {
    primary: { main: '#212121' }, // Purple and green play nicely together.
    secondary: { main: '#e91e63' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={client} >
          <div className="App">
            <h1>
              GraphQL.
            </h1>
            <BookList />
            <AddBook />
          </div>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}


export default App;
