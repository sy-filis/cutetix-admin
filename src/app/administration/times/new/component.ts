import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeService } from '../time.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EventService } from '../../events/event.service';
import { Event } from '../../events/event.types';

@Component({
  selector: 'app-times-new',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class TimesNewComponent {
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    eventId: new FormControl(1, Validators.required)
  });
  public events: Array<Event> = [];

  constructor(
    private router: Router,
    private timeService: TimeService,
    private eventService: EventService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.eventService.get().subscribe({
      next: (events) => {
        this.events = events;
      }
    })
  }

  public newTime() {
    this.timeService.create({
      name: this.form.value.name || '',
      capacity: this.form.value.capacity || 0,
      event_id: this.form.value.eventId || 0
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
