import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecComponent } from './show-rec.component';

describe('ShowRecComponent', () => {
  let component: ShowRecComponent;
  let fixture: ComponentFixture<ShowRecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRecComponent]
    });
    fixture = TestBed.createComponent(ShowRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
