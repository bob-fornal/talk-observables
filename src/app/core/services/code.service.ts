import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  code: Array<string> = [];
  output: any;

  constructor(private http: HttpClient) { }

  init = async (): Promise<void> => {
    const fileCount: number = 4;

    for (let i = 0, len = fileCount; i < len; i++) {
      const filenum: string = ('' + (i + 1)).padStart(3, '0');
      const filename: string = `code-${ filenum }.ts`;
      const code: string = await firstValueFrom(this.http.get(`/assets/code/${ filename }`, { responseType: 'text'}));
      this.code.push(code);
    }
  };

  runDemo = (selected: number): void => {
    switch(true) {
      case selected === 0:
        this.runDemo0();
        break;
      case selected === 1:
        this.runDemo1();
        break;
      case selected === 2:
        this.runDemo2();
        break;
      case selected === 3:
        this.runDemo3();
        break;
      default:
        console.log('invalid selection:', selected);
    }
  };

  demo0$ = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });
 
  next0 = (x: any) => this.output('got value ' + x);
  error0 = (err: any) => this.output('something wrong occurred: ' + err);
  done0 = () => this.output('done');

  runDemo0 = (): void => {
    this.output('just before subscribe');
    this.demo0$.subscribe({
      next: this.next0.bind(this),
      error: this.error0.bind(this),
      complete: this.done0.bind(this),
    });
    this.output('just after subscribe');
  };

  demo1$ = new Observable((subscriber) => {
    this.output('Hello');
    subscriber.next(42);
    subscriber.next(100);
    subscriber.next(200);
    setTimeout(() => {
      subscriber.next(300);
    }, 1000);
  });
  
  runDemo1 = (): void => {
    this.output('before');
    this.demo1$.subscribe((x) => this.output('' + x));
    this.output('after');  
  };

  demo2$ = new Subject<number>();
 
  runDemo2 = (): void => {
    this.demo2$.subscribe({
      next: (v) => this.output(`observerA: ${v}`),
    });
    this.demo2$.subscribe({
      next: (v) => this.output(`observerB: ${v}`),
    });
    
    this.demo2$.next(1);
    this.demo2$.next(2);  
  };

  demo3$ = new BehaviorSubject(0);

  runDemo3 = (): void => {
    this.demo3$.subscribe({
      next: (v) => this.output(`observerA: ${v}`),
    });
     
    this.demo3$.next(1);
    this.demo3$.next(2);
     
    this.demo3$.subscribe({
      next: (v) => this.output(`observerB: ${v}`),
    });
     
    this.demo3$.next(3);
  };
}
