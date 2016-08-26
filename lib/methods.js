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
    }
});