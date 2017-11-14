import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import {
  IPoll
} from '../../models';


@Injectable()
export class PollsApi {
  constructor(private http: HttpClient) { }
  all(): Observable<IPoll[]> {
    return this.http
      .get('/api/polls/');
  }
}
