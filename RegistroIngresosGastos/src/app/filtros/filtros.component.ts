import { Component, OnInit } from '@angular/core';
import {RegistroComponent} from '../registro/registro.component'

@Component({
  providers:[RegistroComponent],
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  constructor(private comp : RegistroComponent) { }

  ngOnInit(): void {
  }

  filterData(){
    //this.comp.filterRecord(filter);
  }

}
