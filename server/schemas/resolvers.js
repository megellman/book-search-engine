const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, arg, context) => {
            if (context.user) {
                const userData = User.findOne({ _id: context.user._id }).populate('books');
                return userData;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = User.findOne({ email: email });
            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong password');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({
                username,
                email,
                password,
            })
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_parent, { userId, bookData }, context) => {
            if (context.user) {
              return User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: { book: bookData } } },
                { new: true, runValidators: true }
              );
            }
            throw new AuthenticationError("Please login or register");
          },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                await Book.findOneAndDelete({
                    _id: bookId,
                })
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return user;
            }
            throw new AuthenticationError('Wrong password');
        },
    }
}

module.exports = resolvers;