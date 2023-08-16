import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  code: Array<string> = [];
  output: any;

  constructor() { }

  init = (): void => {
    this.code.push(
`
import { Observable } from 'rxjs';
 
const demo0 = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
 
console.log('just before subscribe');
demo0.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
`
    );

    this.code.push(
`
import { Observable } from 'rxjs';

const demo1 = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => {
    subscriber.next(300);
  }, 1000);
});

console.log('before');
demo1.subscribe((x) => console.log(x));
console.log('after');
`
    );
  };

  runDemo = (selected: number): void => {
    switch(true) {
      case selected === 0:
        this.runDemo0();
        break;
      case selected === 1:
        this.runDemo1();
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
}
