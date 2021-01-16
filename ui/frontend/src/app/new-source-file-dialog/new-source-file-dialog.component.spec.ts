import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSourceFileDialogComponent } from './new-source-file-dialog.component';

describe('NewSourceFileDialogComponent', () => {
  let component: NewSourceFileDialogComponent;
  let fixture: ComponentFixture<NewSourceFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSourceFileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSourceFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
