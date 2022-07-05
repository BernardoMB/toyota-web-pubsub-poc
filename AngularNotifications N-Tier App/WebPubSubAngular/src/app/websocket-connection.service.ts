import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket'; // Can be any other library for connecting through web sockets
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {
  private wssLink: string = 'wss://toyota-poc.webpubsub.azure.com:443/client/hubs/PricingHub?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NTQ2MjMxNTcsImV4cCI6MTY1NDYyNjc1NywiaWF0IjoxNjU0NjIzMTU3LCJhdWQiOiJodHRwczovL3RveW90YS1wb2Mud2VicHVic3ViLmF6dXJlLmNvbS9jbGllbnQvaHVicy9QcmljaW5nSHViIn0.USdNIfF5FJ3IRhPTBZE6Z2rIDSZ6v-bB-kEkMIHuR8g';

  constructor(private http: HttpClient) { }

  public connect(uri: string): Observable<any> {
    const obs: Observable<any> = new Observable<any>((subscriber) => {
      var subject = webSocket(uri);
      subject.subscribe((msg) => {
        //console.log(msg);
        subscriber.next(msg);
      }, (err) => { 
        console.error(err); 
      }, () => { 
        console.log('Complete'); 
      });
    });
    return obs;
  }

  public getConnectionLink(): Observable<any> {
    const connectionLink = this.http.get<any>('http://localhost:5124/WebPubSub');
    return connectionLink;
  }
}
