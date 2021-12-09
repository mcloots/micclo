import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Throw } from '@micclo/util-interface'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DartsService {

  constructor(private httpClient: HttpClient) { }

  postThrow(throwArrow: Throw): Observable<Throw> {
    return this.httpClient.post<Throw>("https://darts-node-api.herokuapp.com/api/throws", throwArrow);
}
}
