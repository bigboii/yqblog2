import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatcardComponent } from './featcard.component';

describe('FeatcardComponent', () => {
  let component: FeatcardComponent;
  let fixture: ComponentFixture<FeatcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
