import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  template: `
        
    <div class="col-xs-12">
      <div class="row">
        <div class="col-xs-12 col-xs-4 col-md-3">
          <div class="form-group">
            <select name="sorting" id="sorting" class="form-control">
              <option value=""></option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
