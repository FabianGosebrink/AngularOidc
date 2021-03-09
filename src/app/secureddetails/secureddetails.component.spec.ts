import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureddetailsComponent } from './secureddetails.component';

describe('SecureddetailsComponent', () => {
  let component: SecureddetailsComponent;
  let fixture: ComponentFixture<SecureddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecureddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
