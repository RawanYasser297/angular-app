import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionContent } from './hero-section.content';

describe('HeroSectionContent', () => {
  let component: HeroSectionContent;
  let fixture: ComponentFixture<HeroSectionContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionContent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
