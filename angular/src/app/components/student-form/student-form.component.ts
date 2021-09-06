import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentHttpService } from 'src/app/service/student-http.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  reactForm: FormGroup;

  studentId: string;
  student: Student;

  constructor(
    private studentService: StudentHttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe( params => this.studentId = params.id );
    this.studentService.getById(this.studentId).subscribe(
      std => this.student = std,
      err => console.error(err)
    );
  }

  ngOnInit(): void {
  }

  saveStudent(form: NgForm) {
    this.studentService.update(form.value, this.studentId).subscribe(
      () => this.router.navigate(['/student-list']),
      err => console.error(err)
    )
  }

}
