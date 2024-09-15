import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../events.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events-edit',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class EventsFormComponent {
  public id: string | null;
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    ticketsSalesStart: new FormControl(new Date().toISOString().substring(0, 16), Validators.required),
    ticketsSalesEnd: new FormControl(new Date(new Date().getDate() + 14).toISOString().substring(0, 16), Validators.required),
  });
  public title: string = 'New event';
  public editButtonEnabled: boolean = true;
  public editButtonText: string = 'Create';
  public formMethod: Function = this.createEvent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private toastr: ToastrService
  ) {
    // Check detail view
    if (this.router.url.includes('edit')) {
      this.title = 'Event edit'
      this.editButtonText = 'Edit';
    } else if (this.router.url.includes('detail')) {
      this.title = 'Event detail';
      this.editButtonEnabled = false;
      this.form.get('name')?.disable();
      this.form.get('ticketsSalesStart')?.disable();
      this.form.get('ticketsSalesEnd')?.disable();
    }

    // Get ID from query
    this.id = this.route.snapshot.paramMap.get('id');
    
    // Editing event
    if (this.id != null) {
      // Update form submit method
      this.formMethod = this.editEvent;

      // Load event object from database
      this.eventService.getById(this.id).subscribe({
        // Success
        next: (event) => {
          this.toastr.info(
            'Loaded successfully.',
            'Event',
            {
              progressBar: true
            }
          )
          console.log(event)
          this.form.setValue({
            name: event.name,
            ticketsSalesStart: event.tickets_sales_start,
            ticketsSalesEnd: event.tickets_sales_end,
          });
        },
        // Error
        error: (err) => {
          this.form.get('name')?.disable();
          this.form.get('ticketsSalesStart')?.disable();
          this.form.get('ticketsSalesEnd')?.disable();
          this.toastr.error(
            err.message,
            'Cannot load ticket group',
            {
              progressBar: true,
            }
          );
          return
        }
      });
    }
  }

  ngOnInit(): void {}

  public createEvent() {
    this.eventService.create(
      {
        name: this.form.value.name || '',
        tickets_sales_start: this.form.value.ticketsSalesStart || new Date().toISOString().substring(0, 16),
        tickets_sales_end: this.form.value.ticketsSalesEnd || new Date(new Date().getDate() + 14).toISOString().substring(0, 16),
      }
    ).subscribe({
      next: (event) => {
        this.toastr.info(
          'Successfully created.',
          `Event called '${event.name}'`,
          {
            progressBar: true
          }
        );
        this.router.navigate(['/events/detail/' + event.id]);
      },
      error: (err) => {
        this.toastr.error(
          `NOT CREATED! Error: ${err.message}`,
          'Event',
          {
            progressBar: true
          }
        )
      }
    })
  }

  public editEvent() {
    this.eventService.update(
      this.id || '',
      {
        name: this.form.value.name || '',
        tickets_sales_start: this.form.value.ticketsSalesStart || new Date().toISOString().substring(0, 16),
        tickets_sales_end: this.form.value.ticketsSalesEnd || new Date(new Date().getDate() + 14).toISOString().substring(0, 16),
      }
    ).subscribe({
      next: (event) => {
        this.toastr.info(
          'Successfully edited.',
          `Event called '${event.name}'`,
          {
            progressBar: true
          }
        );
        this.router.navigate(['/events/list']);
      },
      error: (err) => {
        this.toastr.error(
          `NOT EDITED! Error: ${err.message}`,
          'Event',
          {
            progressBar: true
          }
        )
      }
    })
  }
}
