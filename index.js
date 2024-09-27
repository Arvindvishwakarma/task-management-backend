
const { typeDefs } = require('./schema/type-defs')
const { resolvers } = require('./schema/resolvers')
const { ApolloServer } = require("apollo-server")
const mongoose = require('mongoose')
const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect('mongodb+srv://arvind:arvind123@cluster0.maocg.mongodb.net/taskmanagement?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    UseUnifiedTopology: true

}).then(() => (
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`🚀 Server is running: ${url}`)
    })
)).catch(err => {
    console.log(err);
});
