import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export default class MessageWidget {
  constructor(service) {
    this.service = service;

    this.table = document.querySelector('.table');
    this.interval = 5000;
  }

  formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}.${month}.${year}`;
  }

  shortenSubject(subject) {
    const maxLength = 15;
    if (subject.length > maxLength) {
      return `${subject.slice(0, maxLength)}...`;
    }

    return subject;
  }

  addMessagesToTable(messages) {
    messages.forEach((message) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${message.from}</td>
        <td>${this.shortenSubject(message.subject)}</td>
        <td>${this.formatDate(message.received)}</td>
      `;

      this.table.insertBefore(row, this.table.firstChild);
    });
  }

  start() {
    const messageStream$ = interval(this.interval)
      .pipe(
        switchMap(() => this.service.getMessages()),
      );

    messageStream$.subscribe({
      next: (messages) => {
        if (messages.length > 0) {
          this.addMessagesToTable(messages);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
