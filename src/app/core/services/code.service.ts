import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  code: Array<string> = [];
  output: any;

  constructor(private http: HttpClient) { }

  init = async (): Promise<void> => {
    const fileCount: number = 8;

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
      case selected === 4:
        this.runDemo4();
        break;
      case selected === 5:
        this.runDemo5();
        break;
      case selected === 6:
        this.runDemo6();
        break;
      case selected === 7:
        this.runDemo7();
        break;
      default:
        console.log('invalid selection:', selected);
    }
  };

  runDemo0 = (): void => {
    const demo0$ = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
   
    const next0 = (x: any) => this.output('got value ' + x);
    const error0 = (err: any) => this.output('something wrong occurred: ' + err);
    const done0 = () => this.output('done');
  
    this.output('just before subscribe');
    demo0$.subscribe({
      next: next0.bind(this),
      error: error0.bind(this),
      complete: done0.bind(this),
    });
    this.output('just after subscribe');
  };
  
  runDemo1 = (): void => {
    const demo1$ = new Observable((subscriber) => {
      this.output('Hello');
      subscriber.next(42);
      subscriber.next(100);
      subscriber.next(200);
      setTimeout(() => {
        subscriber.next(300);
        subscriber.complete();
      }, 1000);
    });

    this.output('before');
    demo1$.subscribe((x) => this.output('' + x));
    this.output('after');  
  };
 
  runDemo2 = (): void => {
    const demo2$ = new Subject<number>();

    demo2$.subscribe({
      next: (v) => this.output(`observerA: ${v}`),
    });
    demo2$.subscribe({
      next: (v) => this.output(`observerB: ${v}`),
    });
    
    demo2$.next(1);
    demo2$.next(2);  
    demo2$.complete();
  };

  runDemo3 = (): void => {
    const demo3$ = new BehaviorSubject(0);

    demo3$.subscribe({
      next: (v) => this.output(`observerA: ${v}`),
    });
     
    demo3$.next(1);
    demo3$.next(2);
     
    demo3$.subscribe({
      next: (v) => this.output(`observerB: ${v}`),
    });
     
    demo3$.next(3);
    demo3$.complete();
  };

  runDemo4 = (): void => {
    const demo4$ = new ReplaySubject(3);

    demo4$.subscribe({
      next: (v) => this.output(`observerA: ${v}`),
    });
     
    demo4$.next(1);
    demo4$.next(2);
    demo4$.next(3);
    demo4$.next(4);
     
    demo4$.subscribe({
      next: (v) => this.output(`observerB: ${v}`),
    });
     
    demo4$.next(5);
    demo4$.complete();
  };

  runDemo5 = (): void => {
    const demo5$ = new ReplaySubject(100, 500);

    demo5$.subscribe({
      next: (v) => this.output(`observerA: ${v}`),
    });
     
    let i = 1;
    let interval = setInterval(() => {
      demo5$.next(i++);
      if (i === 10) {
        clearInterval(interval);
        demo5$.complete();
      }
    }, 200);
     
    setTimeout(() => {
      demo5$.subscribe({
        next: (v) => this.output(`observerB: ${v}`),
      });
    }, 1000);
  };

  runDemo6 = (): void => {
    const demo6$ = new AsyncSubject();

    demo6$.subscribe({
      next: (v) => this.output(`observerA: ${v}`),
    });
     
    demo6$.next(1);
    demo6$.next(2);
    demo6$.next(3);
    demo6$.next(4);
     
    demo6$.subscribe({
      next: (v) => this.output(`observerB: ${v}`),
    });
     
    demo6$.next(5);
    demo6$.complete();
  };


  runDemo7 = (): void => {
    const demo7$ = new Subject();
    
    demo7$.subscribe({
      next: () => this.output('One second has passed'),
    });
    
    setTimeout(() => {
      demo7$.next(undefined);
      demo7$.complete();
    }, 1000);
  };
}
