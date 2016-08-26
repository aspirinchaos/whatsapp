import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../lib/collections';

export default class ChatsCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.helpers({
            messages() {
                return Messages.find({ chatId: this.chatId });
            },
            data() {
                return Chats.find();
            }
        });
    }

    remove(chat) {
        this.data.remove(chat);
    }
}