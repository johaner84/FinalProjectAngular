import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { RegistoServiceService } from '../servicios/registo-service.service';
import { RegistroModel } from './registro-model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    formValue !: FormGroup;
    registroObj: RegistroModel = new RegistroModel()
    registroData : any;

  constructor(private formBuilder : FormBuilder, private service : RegistoServiceService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Concepto : [''],
      Monto : [''],
      Fecha : [''],
      Tipo : [''],
    })
    this.getAllRecords()
  }


  postNewRecord(){
    this.registroObj.Concepto = this.formValue.value.Concepto
    this.registroObj.Monto = this.formValue.value.Monto
    this.registroObj.Fecha = this.formValue.value.Fecha
    this.registroObj.Tipo = this.formValue.value.Tipo

    this.service.postRecord(this.registroObj)
    .subscribe(res=>{
       alert("Registro insertado correctamente")
      //  let ref = document.getElementById('cancel')
      //  ref?.click();
        this.formValue.reset();
       this.getAllRecords();
    },
    err=>{
      alert("Hubo un error")
    })
  }

  getAllRecords(){
    this.service.getRecord()
    .subscribe(res=>{
      this.registroData = res;
    })
  }

  deleteRecord(row:any){
    this.service.deleteRecord(row.id)
    .subscribe(res=>{
      alert("Registro eliminado");
      this.getAllRecords();
    },
    err=>{
      alert("Hubo un error...");
    })
  }

  filterRecord(valor:any){
    console.log(valor)
  }
  

}
