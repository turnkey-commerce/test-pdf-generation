import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { ApiService } from './api.service';
import {Student} from "./student";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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
  getStudentsInformation() {
    this.studentApiService.getStudentsInformation()
      .subscribe((res)=>{
        //console.log(res);
        this.dataSource.data = res;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      })
  }

  generatePdf() {
    html2canvas(document.querySelector('#report')!).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('report.pdf');   
    }); 
  }
}
