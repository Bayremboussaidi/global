import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRepComponent } from './show-rep.component';

describe('ShowRepComponent', () => {
  let component: ShowRepComponent;
  let fixture: ComponentFixture<ShowRepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRepComponent]
    });
    fixture = TestBed.createComponent(ShowRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
