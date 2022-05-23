import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from './bottom-menu.component';

xdescribe('BottomMenuComponent', () => {
  let component: BottomMenuComponent;
  let fixture: ComponentFixture<BottomMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomMenuComponent],
      imports: [MatBottomSheet],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
