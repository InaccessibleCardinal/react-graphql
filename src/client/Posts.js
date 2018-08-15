import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Posts = () => (
    <Query  
    query={gql`{
            user(id: 4){
            posts {
                title,
                body
                }
            }
        }`
    }
    >
    {({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data) {
    console.log(data)
    const postsToList = data.user.posts.map((p, i) => {
        return (
            <div key={i}>
                <h4>Post # {i + 1}</h4>
                <p>{p.title}</p>
                <p>{p.body}</p>
            </div>
        );
    });
    return (
        <div>
            {postsToList}
        </div>
    );
}
  
}}
  </Query>
);
export default Posts;