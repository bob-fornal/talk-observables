import { Component } from '@angular/core';
import { CodeService } from './core/services/code.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selected: number = -1;

  value: string = '';
  editorOptions = { theme: 'vs-dark', language: 'typescript', fontSize: 18, height: '900px' };

  outputContent: Array<string> = [];

  constructor(public codeService: CodeService) {
    this.codeService.init();
    this.codeService.output = this.output.bind(this);
  }

  selectOption = (option: number): void => {
    this.selected = option;
    this.value = this.codeService.code[option];
    this.clearOutput();
  };

  runCode = (): void => {
    this.clearOutput();
    this.codeService.runDemo(this.selected);
  };

  output = (content: string): void => {
    console.log(content);
    this.outputContent.push(content);
  };

  clearOutput = (): void => {
    this.outputContent = [];
  };
}
