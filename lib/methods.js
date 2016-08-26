import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';

Meteor.methods({
    newMessage(message) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Для отправки сообщений вы должны быть авторизованы.');
        }

        check(message, {
            text: String,
            chatId: String,
            type: String
        });

        message.timestamp = new Date();
        message.userId = this.userId;

        const messageId = Messages.insert(message);
        Chats.update(message.chatId, { $set: { lastMessage: message } });

        return messageId;
    },
    updateName(name) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Для обновления имени вы должны быть авторизованы.');
        }

        check(name, String);

        if (name.length === 0) {
            throw Meteor.Error('name-required', 'Пожалуйста введите имя');
        }

        return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
    },
    newChat(otherId) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Что бы создать чат вы должны быть авторизованы');
        }

        check(otherId, String);
        const otherUser = Meteor.users.findOne(otherId);

        if (!otherUser) {
            throw new Meteor.Error('user-not-exists',
                'Такого пользователя не существует');
        }

        const chat = {
            userIds: [this.userId, otherId],
            createdAt: new Date()
        };

        const chatId = Chats.insert(chat);

        return chatId;
    },
    removeChat(chatId) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Что бы удалить чат вы должны быть авторизованы');
        }

        check(chatId, String);

        const chat = Chats.findOne(chatId);

        if (!chat || !_.include(chat.userIds, this.userId)) {
            throw new Meteor.Error('chat-not-exists',
                'Такого чата не существует');
        }

        Messages.remove({ chatId: chatId });

        return Chats.remove({ _id: chatId });
    }
});