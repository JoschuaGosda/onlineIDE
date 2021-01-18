import {Component, OnInit} from '@angular/core';
import {SourceFile} from "../sourceFile";
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {SourceCode} from "../sourceCode";
import {CompilationResult} from "../compilationResult";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public theme = 'vs-dark';
  public editorOptions = {theme: this.theme, language: 'javascript'};
  public sourceFile : SourceFile;
  public compilationResult: CompilationResult;

  constructor(private httpService: HttpService, private router: Router) {
    // passed by SourceFileListComponent via router.navigateByUrl
    this.sourceFile = this.router.getCurrentNavigation().extras.state.sourceFile;
    this.compilationResult = new CompilationResult();
    this.compilationResult.stderr = '';
    this.compilationResult.stdout = '';
    this.compilationResult.compilable = true;
  }

  ngOnInit(): void {}

  public saveSourceFile(): void {
    this.httpService.updateSourceFileCode(this.sourceFile.id, this.sourceFile.sourceCode).subscribe(
      response => {},
      error => {
        console.log(error);
      }
    );
  }

  public saveAndCompileSourceFile(): void {
    this.saveSourceFile();
    this.compileSourceFile();
  }

  private compileSourceFile():void {
    let sourceCode = new SourceCode();
    sourceCode.fileName = this.sourceFile.name;
    sourceCode.code = this.sourceFile.sourceCode;

    this.httpService.compile(sourceCode).subscribe(
      (result: CompilationResult) => {
        this.compilationResult = result;
        // compiler service returns no output if compilation is successful, make success obvious
        if (this.compilationResult.compilable === true &&
            this.compilationResult.stdout.length === 0 && this.compilationResult.stderr.length === 0) {
          this.compilationResult.stdout += 'Compilation successful'
        }
      },
      error => {
        this.compilationResult.compilable = false;
        this.compilationResult.stderr = 'Error: Could not get compilation result from compiler service.\n';
      }
    );
  }
}
