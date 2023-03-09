const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, arg, context) => {if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('thoughts');
          }
          throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = User.findOne( { email: email } );
            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong password');
            }
            const token = signToken(user);
            return ({ token, user });
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
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const book = await Book.create({
                    description: book.description,
                    title: book.title,
                });
            }
            await User.findOneAndUpdate(
                { _id: context.user.id },
                { $addToSet: { savedBooks: book.id } },
                { new: true, runValidators: true }
            );
            return book;
        },
        removeBook: async (parent, {bookId, userId}) => {
            await Book.findOneAndDelete({
                _id: bookId,
            })
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            return user;
        },
    }
}

module.exports = resolvers;