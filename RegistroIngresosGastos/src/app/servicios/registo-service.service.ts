import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistoServiceService {

  constructor(private http : HttpClient) { }

  postRecord(data:any){

    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getRecord(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res
    }))
  }

  putRecord(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  deleteRecord(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getRecordFiltered(field:any,value:any){
    return this.http.get<any>("http://localhost:3000/posts?"+field+'='+value)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}

