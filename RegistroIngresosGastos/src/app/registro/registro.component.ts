import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms'
import { RegistoServiceService } from '../servicios/registo-service.service';
import { RegistroModel } from './registro-model';
import {Filtro} from './filtro-model'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    formValue !: FormGroup;
    registroObj: RegistroModel = new RegistroModel()
    registroData : any;
    form = new FormGroup({
      Parametro: new FormControl('', Validators.required)
    });
    
    selectedParam:string=""

    valorObj : Filtro =  new Filtro()

  constructor(private formBuilder : FormBuilder, private service : RegistoServiceService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Concepto : [''],
      Monto : [''],
      Fecha : [''],
      Tipo : [''],
      
    },
    this.form = this.formBuilder.group({
      valor:[''],
      Parametro:['']
    }))
    this.getAllRecords()
  }



  changeParam(e:any) {
    this.selectedParam = e.target.value;
  }

  filterData(){
    let param = this.selectedParam
    this.valorObj.Valor = this.form.value.valor
    this.service.getRecordFiltered(param,this.valorObj.Valor)
    .subscribe(res=>{
      this.registroData = res
    })
    
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

  editRecord(row:any){
    this.registroObj.id = row.id
    this.formValue.controls['Concepto'].setValue(row.Concepto)
    this.formValue.controls['Monto'].setValue(row.Monto)
    this.formValue.controls['Fecha'].setValue(row.Fecha)
    this.formValue.controls['Tipo'].setValue(row.Tipo)
  }
  
  updateRecord(){
    this.registroObj.Concepto = this.formValue.value.Concepto
    this.registroObj.Monto = this.formValue.value.Monto
    this.registroObj.Fecha = this.formValue.value.Fecha
    this.registroObj.Tipo = this.formValue.value.Tipo

    this.service.putRecord(this.registroObj, this.registroObj.id)
    .subscribe(res=>{
      alert("Registro actualizado")
      this.formValue.reset();
       this.getAllRecords();
    })
  }

}
