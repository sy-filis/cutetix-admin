import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../time.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-times-new',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class TimesNewComponent {
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    maxCountOfTickets: new FormControl(0, Validators.required)
  });

  constructor(
    private router: Router,
    private timeService: TimeService,
    private toastr: ToastrService
  ) { }

  public newTime() {
    this.timeService.create({
      name: this.form.value.name || '',
      maxCountOfTickets: this.form.value.maxCountOfTickets || 0
    }).subscribe({
      next: (time) => {
        this.toastr.info(
          'Successfully created.',
          `Time called '${time.name}'`,
          {
            progressBar: true
          }
        );
        this.router.navigate(['/times/list']);
      },
      error: (err) => {
        this.toastr.error(
          `NOT CREATED! Error: ${err.message}`,
          'Time',
          {
            progressBar: true
          }
        )
      }
    })
  }
}
