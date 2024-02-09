import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(@Inject('apiUrl') private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(this.url).pipe(
        map(response => response),
        catchError(this.handleError)
    );
  }

  create(resource: any) {
    return this.http.post(this.url, JSON.stringify(resource)).pipe(
        map(response => response),
        catchError(this.handleError)
    );
  }

  update(resource: any) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true })).pipe(
        map(response => response),
        catchError(this.handleError)
    )
  }

  delete(id: any) {
    return this.http.delete(this.url + '/' + id).pipe(
        map(response => response),
        catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput());
    }

    if (error.status === 404) {
      return throwError(new NotFoundError());
    }
  
    return throwError(new AppError(error));
  }
}
