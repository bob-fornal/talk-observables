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
`.trim()
    );
  };

  runDemo = (selected: number): void => {
    switch(true) {
      case selected === 0:
        this.runDemo0();
        break;
      default:
        console.log('invalid selection:', selected);
    }
  };

  demo0$ = new Observable((subscriber) => {
    this.output('Hello');
    subscriber.next(42);
    subscriber.next(100);
    subscriber.next(200);
    setTimeout(() => {
      subscriber.next(300);
    }, 1000);
  });
  
  runDemo0 = (): void => {
    this.output('before');
    this.demo0$.subscribe((x) => this.output('' + x));
    this.output('after');  
  };  
}
