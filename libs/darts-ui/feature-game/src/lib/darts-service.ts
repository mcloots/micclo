import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Throw } from './throw';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DartsService {

  constructor(private httpClient: HttpClient) { }

  postThrow(throwArrow: Throw): Observable<Throw> {
    return this.httpClient.post<Throw>("https://darts-node-api.herokuapp.com/api/throws", throwArrow);
}
}