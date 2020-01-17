import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragdropSnackbarComponent } from './dragdrop-snackbar.component';

describe('DragdropSnackbarComponent', () => {
  let component: DragdropSnackbarComponent;
  let fixture: ComponentFixture<DragdropSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragdropSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragdropSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
