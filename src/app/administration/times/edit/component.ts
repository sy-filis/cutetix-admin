import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../time.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-times-edit',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class TimesEditComponent {
  public id: string | null;
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required)
  });
  public showDetail: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private timeService: TimeService,
    private toastr: ToastrService
  ) {
    // Check detail view
    if (this.router.url.includes('detail')) {
      this.showDetail = true;
      this.form.get('name')?.disable();
      this.form.get('maxCountOftickets')?.disable();
      // this.form.get('sumbit')?.disable();
    }

    // Get ID from query
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == null) {
      this.form.get('name')?.disable();
      this.form.get('maxCountOftickets')?.disable();
      this.toastr.error(
        'Cannot load',
        'Time',
        {
          progressBar: true,
        }
      );
      return
    }

    // Load time object from database
    this.timeService.getById(this.id).subscribe({
      // Success
      next: (time) => {
        this.toastr.info(
          'Loaded successfully.',
          'Time',
          {
            progressBar: true
          }
        )
        this.form.setValue({
          name: time.name,
          capacity: time.capacity
        });
      },
      // Error
      error: (err) => {
        this.form.get('name')?.disable();
        this.form.get('maxCountOftickets')?.disable();
        this.toastr.error(
          err.message,
          'Cannot load time',
          {
            progressBar: true,
          }
        );
        return
      }
    });
  }

  public editTime() {
    this.timeService.update(
      this.id || '',
      {
        name: this.form.value.name || '',
        capacity: this.form.value.capacity || 0
      }
    ).subscribe({
      next: (time) => {
        this.toastr.info(
          'Successfully edited.',
          `Time called '${time.name}'`,
          {
            progressBar: true
          }
        );
        this.router.navigate(['/times/list']);
      },
      error: (err) => {
        this.toastr.error(
          `NOT EDITED! Error: ${err.message}`,
          'Time',
          {
            progressBar: true
          }
        )
      }
    })
  }
}
