import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { ApiService } from './api.service';
import {Student} from "./student";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  student: Student[] = [];
  // columns we will show on the table
  public displayedColumns = ['firstName', 'lastName', 'studentEmail', 'yearOfStudy', 'registrationNumber', 'course' ];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<Student>();

  //dependency injection
  constructor(private studentApiService: ApiService) {
  }

  ngOnInit(){
    //call this method on component load
    this.getStudentsInformation();
  }
  /**
   * This method returns students details
   */
  getStudentsInformation(){
    this.studentApiService.getStudentsInformation()
      .subscribe((res)=>{
        //console.log(res);
        this.dataSource.data = res;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      })
  }
}
