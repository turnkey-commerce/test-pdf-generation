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
  public dataSource1 = new MatTableDataSource<Student>();
  public dataSource2 = new MatTableDataSource<Student>();

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
        this.dataSource1.data = res;
        this.dataSource2.data = res;
      })
  }

  generatePdf() {
    // Put all of the tags that are reports in the following array...
    const reportIdTags = ['#report1','#report2'];
    let pdf = new jspdf('l', 'cm', 'letter'); //Generates PDF in landscape mode
    // Adjust the report image width and height (cm) to fit average report on page.
    var imgWidth = 28;
    var imgHeight = 20.;
    reportIdTags.forEach((tag, i) => {
      html2canvas(document.querySelector(tag)!)
      .then(canvas => {
          const img = canvas.toDataURL('image/png')
          pdf.addImage(img,'PNG', 1, 1, imgWidth, imgHeight);
          if (reportIdTags.length > (i+1)) {
              pdf.addPage()
          }
      })
      .then(() => {
          if ((i+1) === reportIdTags.length) {
              pdf.save('report.pdf')
          }
      })
    })
  }
}
