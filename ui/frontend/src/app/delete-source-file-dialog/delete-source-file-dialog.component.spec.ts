import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSourceFileDialogComponent } from './delete-source-file-dialog.component';

describe('DeleteSourceFileDialogComponent', () => {
  let component: DeleteSourceFileDialogComponent;
  let fixture: ComponentFixture<DeleteSourceFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSourceFileDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSourceFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
