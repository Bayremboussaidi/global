import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRepasComponent } from './show-rep.component';

describe('ShowRepComponent', () => {
  let component: ShowRepasComponent;
  let fixture: ComponentFixture<ShowRepasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRepasComponent]
    });
    fixture = TestBed.createComponent(ShowRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
