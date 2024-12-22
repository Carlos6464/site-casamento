import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasalComponent } from './casal.component';

describe('CasalComponent', () => {
  let component: CasalComponent;
  let fixture: ComponentFixture<CasalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
