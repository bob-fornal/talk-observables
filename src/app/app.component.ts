import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selected: number = -1;

  value: string = '';

  editorOptions = { theme: 'vs-dark', language: 'typescript', fontSize: 18, height: '900px' };

  code: Array<string> = [
`const a: number = 1;`,
`const b: number = 2;`,
  ];

  selectOption = (option: number): void => {
    this.selected = option;
    this.value = this.code[option];
  };
}
