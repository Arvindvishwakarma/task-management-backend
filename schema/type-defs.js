const { gql } = require('apollo-server');

const typeDefs = gql`

#User ---------------------------------------------------------        
        type user {
            id:ID!
            name: String
            email: String
            contact: String
            password: String
            createdDateTime: String
            status: String
        }

        input userInput {
            name: String
            email: String
            contact: String
            password: String
            status: String  
        }

        type userAuth{
            userId:ID
            userToken:String
            userTokenExpire:String
        }

#Task ---------------------------------------------------------     

        type task {
            id:ID!
            title: String
            description: String
            deadline: String
            priority: String
            createdDateTime: String
            status: String
        }

        input taskInput {
            title: String
            description: String
            deadline: String
            priority: String
            status: String
        }

        input taskEditInput{
            id:ID!
            title: String
            description: String
            deadline: String
            priority: String
            status: String
        }

type admin{
    id:ID
    fname:String
    lname:String
    contact:String
    email:String
    username:String
    password:String
    createdDateTime:String
    status:String
 }

 input adminInput{
    fname:String
    lname:String
    contact:String
    email:String
    username:String
    password:String
 }
 type adminAuth{
   adminId:ID
   adminToken:String
   adminTokenExpire:String
 }

#Query ---------------------------------------------------------
    type Query {
        getAllUsers:[user]
        getAllTasks:[task]
        getTaskById(taskId:ID):task
    }

#Mutation ---------------------------------------------------------
    type Mutation {
        createUser(UserInput:userInput):user
        userLogin(email:String,password:String):userAuth
        createTask(TaskInput:taskInput):task
        editTask(TaskEditInput:taskEditInput):task
        deleteTask(taskId:ID):task
        changePriority(taskId:ID, priority:String):task
        changeStatus(taskId:ID, status:String):task
    }
`;

module.exports = { typeDefs }
