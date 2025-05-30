import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencaComponent } from './presenca.component';

describe('PresencaComponent', () => {
  let component: PresencaComponent;
  let fixture: ComponentFixture<PresencaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresencaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
