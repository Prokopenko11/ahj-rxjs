import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export default class MessageService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getMessages() {
    return ajax.getJSON(this.apiUrl).pipe(
      map((response) => response.messages),
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
    );
  }
}
