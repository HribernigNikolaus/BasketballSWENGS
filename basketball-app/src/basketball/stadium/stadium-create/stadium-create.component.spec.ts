import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumCreateComponent } from './stadium-create.component';

describe('StadiumCreateComponent', () => {
  let component: StadiumCreateComponent;
  let fixture: ComponentFixture<StadiumCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StadiumCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
