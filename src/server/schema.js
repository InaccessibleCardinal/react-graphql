const https = require('https');
const fetch = require('node-fetch');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

const UserToDoList = new GraphQLObjectType({
    name: 'Todos',
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: json => json.title
        },
        completed: {
            type: GraphQLBoolean,
            resolve: json => json.completed
        }
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString, 
            resolve: json => json.name
        },
        email: {
            type: GraphQLString,
            resolve: json => json.email
        },
        body: {
            type: GraphQLString,
            resolve: json => json.body
        }
    })
});

const UserPostsType = new GraphQLObjectType({
    name: 'Post',
    description: '...',
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: json => json.title
        },
        body: {
            type: GraphQLString,
            resolve: json => json.body
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: (json) => {
                let id = json.id;
                return fetch(`${postsUrl}/${id}/comments`)
                .then(response => response.json())
            } 
        }
    })
});

const UserAddressType = new GraphQLObjectType({
    name: 'address',
    description: '...',
    fields: () => ({
        street: {
            type: GraphQLString,
            resolve: json => json.street
        },
        suite: {
            type: GraphQLString,
            resolve: json => json.suite
        },
        city: {
            type: GraphQLString,
            resolve: json => json.city
        },
        zipcode: {
            type: GraphQLString,
            resolve: json => json.zipcode
        }

    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '...',
    fields: () => ({
        _id: {
            type: GraphQLInt,
            resolve: json => json.id
        },
        name: {
            type: GraphQLString,
            resolve: json => json.name
        },
        email: {
            type: GraphQLString,
            resolve: json => json.email
        },
        address: {
            type: UserAddressType,
            resolve: json => json.address
        },
        posts: {
            type: new GraphQLList(UserPostsType),
            resolve: (json) => {
                let id = json.id;
                return fetch(`${postsUrl}?userId=${id}`)
                .then(response => response.json())
            }
        },
        todos: {
            type: new GraphQLList(UserToDoList),
            resolve: (json) => {
                let id = json.id;
                return fetch(`${usersUrl}/${id}/todos`)
                .then(response => response.json())
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'Some description.',
        fields: () => ({
            user: {
                type: UserType,
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (root, args) => fetch(
                    `${usersUrl}/${args.id}`
                )
                .then(response => response.json())
            }
            
        })
    })
});