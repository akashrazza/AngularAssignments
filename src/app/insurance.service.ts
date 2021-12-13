import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insurance } from './Insurance';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http : HttpClient) { }

  url = "http://localhost:3000/insurance";

  //GET all insurance
  Get_Insurance () : Observable<any>{
    return this.http.get(this.url);
  }

  //Create Insurance
  Post_Insurance(insurance:Insurance): Observable<any>{
    var header = {'content-type' : 'application/json'}
    
    var body  = JSON.stringify(insurance);
    
    return this.http.post(this.url,body,{'headers':header})
  }

  //Delete Insurance
  Delete_Insurance(id:any):Observable<any>{
    let custom_url = this.url + "/" +id
    return this.http.delete(custom_url)
  }

  //Edit /update Insurance
  Edit_Insurance(id:number|string,insurance:Insurance):Observable<any>{
    let custom_url = this.url + "/" +id
    var header = {'content-type' : 'application/json'}
    var body  = JSON.stringify(insurance);
    return this.http.put(custom_url,body,{'headers':header})
  }
  
  //Get Insurance by id
  get_product_by_id(id:string|number):Observable<any>{
    var custom_url = this.url+"/"+id;
    return this.http.get(custom_url)
  }
}
