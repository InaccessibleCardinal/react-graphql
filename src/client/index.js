import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import Posts from './Posts';
import Todos from './Todos';
//probably NOT the pattern to use, just putting all this in index.js
//but the "client" is your connection to graphQL
const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql/'
});
import { Query } from "react-apollo"; //Query is a special component that...makes queries
import gql from "graphql-tag"; 
//gql is a special function for use inside Query with this kind of signature:
//gql`{...some graphQL style query...}`
//Query seems to hide the asyncronous nature of what's going on.
//Usually you'd have something like makeAjaxCall(url).then(...do something...).catch(...any...errors)
//Query wraps all that for you  
const User = () => (
    <Query  
    query={gql`{
        user(id: 2){
          name,
          address {
            street,
            city
          }
        }
      }`
    }
      >
      {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (data) {
        
        return (
            <div>
                <h2>Name: {data.user.name}</h2>
                <h2>Address:</h2>
                <p>Street: {data.user.address.street}</p>
                <p>City: {data.user.address.city}</p>
            </div>
        )
    }
      
    }}
      </Query>
)
//def NOT the pattern to make this component inside index.js
//but it does look like you could just import your child
//components into SomeApp.jsx, and just use them as is
class SomeApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.toggleValue = this.toggleValue.bind(this);
    }
    toggleValue() {
        let newValue = (this.state.value + 1) % 2;
        this.setState({value: newValue});
    }
    render () {
        return (
            <div>
                <User />
                <button onClick={this.toggleValue}>Toggle Posts and Todos</button>
                <div>
                    {
                        this.state.value === 0 ?
                        <Todos /> :
                        <Posts />
                    }
                </div>
            </div>
        );
    }
}
//main idea seems to be to create an ApolloClient
//wrap your app in ApolloProvider and pass the provider the client
//it acts like the Provider from redux, but the use seems simpler
ReactDOM.render(
    <ApolloProvider client={client}>
        <div>
            <SomeApp />
        </div>
    </ApolloProvider>
    , 
    document.getElementById('root')
);