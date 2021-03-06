// Libs
import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';
import { Meteor } from 'meteor/meteor';

// Modules
import ChatsCtrl from '../controllers/chats';
import ChatCtrl from '../controllers/chat';
import ConfirmationCtrl from '../controllers/confirmation';
import LoginCtrl from '../controllers/login';
import NewChatCtrl from '../controllers/new-chat';
import ProfileCtrl from '../controllers/profile';
import SettingsCtrl from '../controllers/settings';
import InputDirective from '../directives/input';
import CalendarFilter from '../filters/calendar';
import ChatNameFilter from '../filters/chat-name';
import ChatPictureFilter from '../filters/chat-picrute';
import NewChatService from '../services/new-chat';
import Routes from './routes';

const App = 'Whatsapp';

// App
Angular.module(App, [
    'angular-meteor',
    'angular-meteor.auth',
    'angularMoment',
    'ionic'
]);

new Loader(App)
    .load(ChatsCtrl)
    .load(ChatCtrl)
    .load(ConfirmationCtrl)
    .load(LoginCtrl)
    .load(NewChatCtrl)
    .load(ProfileCtrl)
    .load(SettingsCtrl)
    .load(InputDirective)
    .load(CalendarFilter)
    .load(ChatNameFilter)
    .load(ChatPictureFilter)
    .load(NewChatService)
    .load(Routes);

// Startup
if (Meteor.isCordova) {
    Angular.element(document).on('deviceready', onReady);
}
else {
    Angular.element(document).ready(onReady);
}

function onReady() {
    Angular.bootstrap(document, [App]);
}