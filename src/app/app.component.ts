import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  entityForm: any;
  initPointGeo = [
    {latitude: 36.745143, longitude: 10.248656},
    {latitude: 36.742529, longitude: 10.244966},
    {latitude: 36.739022, longitude: 10.250287},
    {latitude: 36.744180, longitude: 10.255952}
  ];

  get f() { return this.entityForm.controls; }
  get t() { return this.f.pointGeo as FormArray; }

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.getUpdateFormArray();
  }

  createForm() {
    this.entityForm = this.fb.group({
      pointGeo: new FormArray([]),
    });

    this.createDyPointGeos();
  }

  createDyPointGeos() {
    if (this.t.length < 4) {
      for (let i = this.t.length; i < 4; i++) {
          this.t.push(this.fb.group({
            latitude: [{value: '', disabled: true}],
            longitude: [{value: '', disabled: true}]
          }));
      }
    }
  }

  getUpdateFormArray() {

    this.entityForm.patchValue({
      pointGeo: this.initPointGeo
    });

  }

  receiveDataLocation(data: any) {
    this.entityForm.patchValue({
      pointGeo: data
    });
  }


}
