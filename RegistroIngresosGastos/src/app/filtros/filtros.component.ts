import { Component, OnInit } from '@angular/core';
import {RegistroComponent} from '../registro/registro.component'
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
 

@Component({
  providers:[RegistroComponent],
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  form = new FormGroup({
    Parametro: new FormControl('', Validators.required)
  });
  
  selectedParam:string=""

  constructor(private comp : RegistroComponent, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      valor:[''],
      Parametro:['']
    })
  }
  changeParam(e:any) {
    this.selectedParam = e.target.value;
  }

  filterData(){
    let param = this.selectedParam
    let value = document.getElementById('valueToFilter')
    this.comp.filterRecord(param,value)
  }

}
