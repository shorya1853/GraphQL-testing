const graphql = require('graphql')
const _  = require('lodash')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Document for User",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}, 


        post: {
            type: GraphQLList(PostType),
            resolve(parent, args){
                return _.filter(postData, {userId: parent.id})
            }
        },

        comment: {
            type: GraphQLList(CommetType),
            resolve(parent, args){
                return _.filter(comment, {userId: parent.id})
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Post Description",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user:{
            type: UserType,
            resolve(parent, args){
                return
            }
        }
    })
});

const CommetType = new GraphQLObjectType({
    name: "comment",
    description: "Comment Description",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return 
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: () => ({
        user:{
            type: UserType,
            args: {id:{type: GraphQLString}},

            resolve(parent, args){
                let user ={
                    id: "212",
                    age: 20,
                    name: "jojo"
                }
                return user;
            }
        },
        post:{
            type: PostType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args){
                return 
            }
        },
        comment:{
            type: CommetType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args){
                return 
            }
        },
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation to types",
    fields: {
        createUser:{
            type: UserType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent,args){
                let user = {
                    name: args.name,
                    age: args.age,
                }
                return user
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})
