import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableComponent } from './datatable.component';

interface TestDataType {
  index: number;
  value: string;
}

describe('DatatableComponent', () => {
  let component: DatatableComponent<TestDataType>;
  let fixture: ComponentFixture<DatatableComponent<TestDataType>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableComponent<TestDataType>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
