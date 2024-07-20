import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProfilComponent } from './profil.component';
import { By } from '@angular/platform-browser';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update profile picture preview on file input change', (done) => {
    const file = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = fixture.debugElement.query(By.css('#profilePic')).nativeElement as HTMLInputElement;

    // Create a mock FileReader
    const reader = {
      result: '',
      readAsDataURL: (blob: Blob) => {
       // reader.result = 'data:image/jpeg;base64,';
        setTimeout(() => {
          if (reader.onload) {
            reader.onload({} as ProgressEvent<FileReader>);
          }
        }, 100);
      },
      onload: null as ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
    } as FileReader;

    spyOn(window as any, 'FileReader').and.returnValue(reader);

    const event = new Event('change', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: { files: [file] } });

    fileInput.dispatchEvent(event);
    fixture.detectChanges();

    setTimeout(() => {
      expect(reader.readAsDataURL).toHaveBeenCalledWith(file);
      expect(component.profilePicUrl).toBe('data:image/jpeg;base64,');
      done();
    }, 150);
  });
});
