const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            return User.findOne({
                where: {
                    _id: args.id
                }
            })
        }
    },
    Mutation: {
        loginUser: async (parent, { username, password }) => {
            const user = User.findOne({ $or: [{ username: username }, { email: email }] });
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
        addUser: async (parent, { username, email }) => {
            const user = await User.create({
                username,
                email
            })
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { userId, book }, context) => {
            if (context.user) {
                const book = await Book.create({
                    description: context.book.description,
                    title: context.book.title,
                });
            }
            await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: book.id } },
                { new: true, runValidators: true }
            );
            return book;
        },
        removeBook: async (parent, { userId, bookId }) => {
            const book = await Book.findOneAndDelete({
                _id: bookId,
                description: context.user.description,
                // title: context.title,
            })
            await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            return book
        },
    }
}

module.exports = resolvers;