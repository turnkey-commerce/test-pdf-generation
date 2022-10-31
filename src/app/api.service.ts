import { Injectable } from '@angular/core';
import { Student } from './student';
//import this to make http requests
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
//we've defined our base url here in the env
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * This method returns students details
   */
  getStudentsInformation(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${environment.baseURL}students.json`);
  }
  
}
