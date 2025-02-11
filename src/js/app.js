import MessageService from './messageService';
import MessageWidget from './messageWidget';

const apiUrl = 'https://ahj-rxjs-server-nllm.onrender.com/messages/unread';
const messageService = new MessageService(apiUrl);

const messageWidget = new MessageWidget(messageService);
messageWidget.start();
