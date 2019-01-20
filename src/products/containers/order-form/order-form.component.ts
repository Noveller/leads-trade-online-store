import {Component, EventEmitter, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/*
import {patternValidator} from '../../../shared/validators';
*/


@Component({
  selector: 'app-order-form',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      
      <div class="form" [formGroup]="form">
        <div class="form-group">
          <label for="name" class="control-label">Name</label>
          <input type="text" class="form-control" id="name" formControlName="name">

          <ng-container *ngIf="form.controls['name'].errors && !form.controls['name'].pristine">
            <small class="text-danger" [hidden]="!form.controls['name'].errors.required"><b>Name</b> is required.</small>
          </ng-container>          
          
        </div>

        <div class="form-group">
          <label for="last_name" class="control-label">Lastname</label>
          <input type="text" class="form-control" id="last_name" formControlName="last_name">
          
          <ng-container *ngIf="form.controls['last_name'].errors && !form.controls['last_name'].pristine">
            <small class="text-danger" [hidden]="!form.controls['last_name'].errors.required"><b>Lastname</b> is required.</small>
          </ng-container>
        </div>

        <div class="form-group">
          <label for="email" class="control-label">Email</label>
          <input type="text" class="form-control" id="name" formControlName="email">

          <ng-container *ngIf="form.controls['email'].errors && !form.controls['email'].pristine">
            <small class="text-danger" [hidden]="!form.controls['email'].errors.required"><b>Email</b> is required.</small>
            <small class="text-danger" [hidden]="!form.controls['email'].errors.required"><b>Email</b> is incorrect.</small>
          </ng-container>          
        </div>        
      </div>

    </div>
    <div class="modal-footer">
      <!--<button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>-->
      
      <button class="btn btn-primary btn-md" [disabled]="!form.valid" (click)="onSubmit($event)">Checkout</button>
      
    </div>
  `,
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public form: FormGroup;
  public title: string;

  public readonly submit: EventEmitter<any> = new EventEmitter();


  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder) { }

  public onSubmit($event) {

    if (this.form.valid) {
      this.submit.emit(this.form.value);
    }

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'last_name': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    })

  }

}
