import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password fields', () => {
    const email = component.loginForm.get('email');
    const password = component.loginForm.get('password');

    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.loginForm.get('email');
    expect(email!.valid).toBeFalsy();

    let errors = email!.errors || {};
    expect(errors['required']).toBeTruthy();

    email!.setValue('test');
    errors = email!.errors || {};
    expect(errors['email']).toBeTruthy();

    email!.setValue('test@example.com');
    errors = email!.errors || {};
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let password = component.loginForm.get('password');
    expect(password!.valid).toBeFalsy();

    let errors = password!.errors || {};
    expect(errors['required']).toBeTruthy();

    password!.setValue('123');
    errors = password!.errors || {};
    expect(errors['minlength']).toBeTruthy();

    password!.setValue('123456');
    errors = password!.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });

  it('form should be valid when filled correctly', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: '123456' });
    expect(component.loginForm.valid).toBeTruthy();
  });
});
