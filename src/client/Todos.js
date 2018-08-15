import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Todos = () => (
    <Query  
    query={gql`{
            user(id: 4){
            todos {
                title,
                completed
                }
            }
        }`
    }
    >
    {({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data) {
    console.log(data.user.todos)
    const todosToList = data.user.todos.map((t, i) => {
        return (
            <div key={i}>
                <h4>Todo # {i + 1}</h4>
                <p>{t.title}: {t.completed}</p>
            </div>
        );
    });
    return (
        <div>
            {todosToList}
        </div>
    );
}
  
}}
  </Query>
);
export default Todos;