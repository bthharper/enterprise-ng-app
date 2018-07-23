/// <reference path="soho-lookup.d.ts" />

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import {
  FormsModule,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { SohoLookupModule } from './soho-lookup.module';
import { SohoLookupComponent } from './soho-lookup.component';
import { ReactiveFormsModule } from '@angular/forms';

export const productsData = [
  {
    id: 1,
    productId: 2142201,
    productName: 'Compressor',
    activity:  'Assemble Paint',
    quantity: 1,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2014, 12, 8),
    action: 'Action',
  }, {
    id: 2,
    productId: 2241202,
    productName: 'Different Compressor',
    activity:  'Inspect and Repair',
    quantity: 2,
    price: 210.99,
    status: '',
    orderDate: new Date(2015, 7, 3),
    action: 'On Hold',
  }, {
    id: 3,
    productId: 2342203,
    productName: 'Compressor',
    activity:  'Inspect and Repair',
    quantity: 1,
    price: 120.99,
    status: null as any,
    orderDate: new Date(2014, 6, 3),
    action: 'Action',
  }, {
    id: 4,
    productId: 2445204,
    productName: 'Another Compressor',
    activity:  'Assemble Paint',
    quantity: 3,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2015, 3, 3),
    action: 'Action',
  }, {
    id: 5,
    productId: 2542205,
    productName: 'I Love Compressors',
    activity:  'Inspect and Repair',
    quantity: 4,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2015, 5, 5),
    action: 'On Hold',
  }, {
    id: 5,
    productId: 2642205,
    productName: 'Air Compressors',
    activity:  'Inspect and Repair',
    quantity: 41,
    price: 120.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'On Hold',
  }, {
    id: 6,
    productId: 2642206,
    productName: 'Some Compressor',
    activity:  'inspect and Repair',
    quantity: 41,
    price: 123.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'On Hold',
  },
];

export const productsColumns = [
  {
    id: 'productId',
    name: 'Product Id',
    field: 'productId',
    width: 140,
    formatter: Soho.Formatters.Readonly
  },
  {
    id: 'productName',
    name: 'Product Name',
    sortable: false,
    field: 'productName',
    width: 250,
    formatter: Soho.Formatters.Hyperlink
  },
  {
    id: 'activity',
    hidden: true,
    name: 'Activity',
    field: 'activity',
    width: 125,
  },
  {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity',
    width: 125,
  },
  {
    id: 'price',
    name: 'Price',
    field: 'price',
    width: 125,
    formatter: Soho.Formatters.Decimal
  },
  {
    id: 'orderDate',
    name: 'Order Date',
    field: 'orderDate',
    formatter: Soho.Formatters.Date,
    dateFormat: 'M/d/yyyy'
  },
];

export const checkboxColumn = {
  id: 'selectionCheckbox',
  sortable: false,
  resizable: false,
  width: 50,
  formatter: Soho.Formatters.SelectionCheckbox,
  align: 'center',
};

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-lookup formControlName="lookup" [columns]="lookupColumns" [dataset]="lookupData" field="productId" name="lookup" />
  </form>`
})
class SohoLookupReactiveFormTestComponent {
  @ViewChild(SohoLookupComponent) dropdown: SohoLookupComponent;

  formGroup: FormGroup;

  public lookupColumns = productsColumns;

  public lookupData = productsData;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      lookup: '2542205'
    });
  }
}

describe('SohoLookupComponent on ReactiveForm', () => {
  let dropdown: SohoLookupComponent;
  let component: SohoLookupReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoLookupReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoLookupReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoLookupModule]
    });

    fixture = TestBed.createComponent(SohoLookupReactiveFormTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-lookup]')).nativeElement;

    fixture.detectChanges();
  });

  it('is disabled by default.', () => {
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');

    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is enabkled after call to enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is disabled after call to disable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');
  });

  it('initial value is set.', () => {
    component.formGroup.enable();

    fixture.detectChanges();

    expect(el.value).toEqual('2542205');
  });

  it('control updated when model updated.', () => {
    // Enable te control.
    component.formGroup.enable();
    fixture.detectChanges();

    component.formGroup.controls['lookup'].setValue(2642205);
    fixture.detectChanges();

    expect(el.value).toEqual('2642205');
  });
});
