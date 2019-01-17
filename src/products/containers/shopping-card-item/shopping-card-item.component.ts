import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardModel} from '../../../app/store/models/CardModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shopping-card-item',
  template: `
      <li class="list-group-item">
        <div class="row">
          <div class="col-xs-2">
              <img [src]="card.product.image" alt="" width="50">
          </div>
          <div class="col-xs-2">
            <h4>{{card.product.title}}</h4>
            <p>{{card.product.description}}</p>
            <p><b>Price: {{card.product.price}}$</b></p>
          </div>
          <div class="col-xs-4">
            <form [formGroup]="form" >
              <div class="form-group">
                <label for="" class="control-label">Quantity</label>
                <input type="number" class="form-control" formControlName="quantity" (input)="onChangeQuantity()">
              </div>
            </form>
          </div>

          <div class="col-xs-4">
            
            <div class="form-group">
              <label for="" class="control-label">Remove</label>
              <button (click)="onRemoveCard($event)" class="btn btn-danger form-control"><i class="glyphicon glyphicon-trash"></i></button>
            </div>
          </div>
        </div>
      </li>
  `,
  styleUrls: ['./shopping-card-item.component.css']
})
export class ShoppingCardItemComponent implements OnInit {

  @Input() public card: CardModel;

  @Output() public change_quantity: EventEmitter<{id: number, quantity: number}> = new EventEmitter();
  @Output() public remove: EventEmitter<CardModel> = new EventEmitter();

  public form: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  onChangeQuantity(): void {
    if (this.form.valid) {

      this.change_quantity.emit({
        id: this.card.id,
        quantity: this.form.get('quantity').value
      })

    }
  }

  onRemoveCard($event): void {
    this.remove.emit(this.card);
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      quantity: [this.card.quantity, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]]
    })

  }

}
