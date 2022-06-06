import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleIconComponent } from './google-icon.component';

describe('GoogleIconComponent', () => {
  let component: GoogleIconComponent;
  let fixture: ComponentFixture<GoogleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
