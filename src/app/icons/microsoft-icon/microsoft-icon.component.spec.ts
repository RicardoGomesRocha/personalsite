import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrosoftIconComponent } from './microsoft-icon.component';

describe('MicrosoftIconComponent', () => {
  let component: MicrosoftIconComponent;
  let fixture: ComponentFixture<MicrosoftIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrosoftIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrosoftIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
