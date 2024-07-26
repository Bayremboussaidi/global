import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTransComponent } from './show-trans.component';

describe('ShowTransComponent', () => {
  let component: ShowTransComponent;
  let fixture: ComponentFixture<ShowTransComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTransComponent]
    });
    fixture = TestBed.createComponent(ShowTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
