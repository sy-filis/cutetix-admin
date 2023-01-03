import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time, TimeSum, TimeUpdate } from './time.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private API_PATH: string = 'time';

  private timeSource = new Subject<Time>();

  public asObservable() {
    return this.timeSource.asObservable();
  }

  public register(time: Time) {
    this.timeSource.next(time);
  }

  private deleteSource = new Subject<Time>();

  public deleteAsObservable() {
    return this.deleteSource.asObservable();
  }

  public ticketDelete(time: Time) {
    this.deleteSource.next(time);
  }

  constructor(
    private readonly httpClient: HttpClient
  ) {

  }

  public get(): Observable<Time[]> {
    return this.httpClient.get(`${environment.backend.api}/${this.API_PATH}`).pipe(
      map(
        (res: any) => {
          return res.map(
            (result: any) => <Time[]>result
          );
        }
      )
    );
  }

  public getById(
    id: string
  ): Observable<Time> {
    console.log(`${environment.backend.api}/${this.API_PATH}/${id}`)
    return this.httpClient.get(
      `${environment.backend.api}/${this.API_PATH}/${id}`
    ).pipe(
      map(
        (res: any) => {
          return <Time>res;
        }
      )
    )
  }

  public create(time: Time): Observable<Time> {
    return this.httpClient.post(
      `${environment.backend.api}/${this.API_PATH}`,
      time
    ).pipe(
      map(
        (res: any) => {
          return <Time>res;
        }
      )
    )
  }

  public update(
    id: string,
    body: TimeUpdate
  ): Observable<Time> {
    return this.httpClient.patch(
      `${environment.backend.api}/${this.API_PATH}/${id}`,
      body
    ).pipe(
      map(
        (res: any) => {
          return <Time>res;
        }
      )
    )
  }

  public delete(id: string): Observable<Time> {
    return this.httpClient.delete(`${environment.backend.api}/${this.API_PATH}/${id}`).pipe(
      map(
        (res: any) => {
          return <Time>res;
        }
      )
    )
  }

  public getActiveSum(): Observable<TimeSum> {
    return this.httpClient.get(`${environment.backend.api}/${this.API_PATH}/active/sum`).pipe(
      map(
        (timeSum: any) => <TimeSum>timeSum
      )
    );
  }
}
