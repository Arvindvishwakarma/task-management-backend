const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Task = require("../models/task");

const resolvers = {

  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
    getAllTasks: async () => {
      return await Task.find();
    },
    getTaskById: async (_, { taskId }) => {
      return await Task.findOne({ _id: taskId });
    },
  },

  Mutation: {

    createUser: async (parent, args) => {
      const userr = await User.findOne({
        email: args.UserInput.email,
      });
      if (userr) {
        return Error("This Email is already Exits");
      }
      let date = new Date();

      return bcrypt.hash(args.UserInput.password, 12).then(hashpassword => {
        const newUser = new User({
          name: args.UserInput.name,
          email: args.UserInput.email,
          contact: args.UserInput.contact,
          password: hashpassword,
          createdDateTime: date,
          status: args.UserInput.status,
        });
        return newUser.save()
      })
    },


    userLogin: async (_, { email, password }) => {
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('User Not Found')

      }
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        throw new Error('Email & Password Not Match')
      }
      const token = jwt.sign({ userId: user.id }, 'UserLoginSecretKey', {
        expiresIn: '1h'
      })
      return {
        userId: user.id,
        userToken: token,
        userTokenExpire: '1h'
      }
    },

    createTask: async (parent, args) => {
      let date = new Date();
      const newTask = new Task({
        title: args.TaskInput.title,
        description: args.TaskInput.description,
        deadline: args.TaskInput.deadline,
        priority: args.TaskInput.priority,
        createdDateTime: date,
        status: args.TaskInput.status,
      });
      return newTask.save()
    },

    editTask: async (_, args) => {
      const filter = { _id: args.TaskEditInput.id }
      const update = {
        title: args.TaskEditInput.title,
        description: args.TaskEditInput.description,
        deadline: args.TaskEditInput.deadline,
        priority: args.TaskEditInput.priority,
        status: args.TaskEditInput.status,
      }
      return await Task.findOneAndUpdate(filter, update, { new: true })
    },

    deleteTask: async (_, { taskId }) => {
      return await Task.findByIdAndDelete({ _id: taskId });

    },

    changePriority: async (_, { taskId, priority }) => {
      const filter = { _id: taskId }
      const update = {
        priority: priority,
      }
      return await Task.findOneAndUpdate(filter, update, { new: true })
    },

    changeStatus: async (_, { taskId, status }) => {
      const filter = { _id: taskId }
      const update = {
        status: status,
      }
      return await Task.findOneAndUpdate(filter, update, { new: true })
    },

  }
};

module.exports = { resolvers };