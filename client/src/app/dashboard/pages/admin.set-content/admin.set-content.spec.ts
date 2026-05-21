import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetContent } from './admin.set-content';

describe('AdminSetContent', () => {
  let component: AdminSetContent;
  let fixture: ComponentFixture<AdminSetContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSetContent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSetContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
