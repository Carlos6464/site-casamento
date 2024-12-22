import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerimoniaComponent } from './cerimonia.component';

describe('CerimoniaComponent', () => {
  let component: CerimoniaComponent;
  let fixture: ComponentFixture<CerimoniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerimoniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerimoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
