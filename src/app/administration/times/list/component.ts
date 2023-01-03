import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TimeService } from '../time.service';
import { Time } from '../time.types';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-times-list',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class TimesListComponent implements OnInit, OnDestroy {
  public faPen = faPen;
  public faTrash = faTrash;
  public times: Time[] = [];
  public loadingState = 1;
  public errorLoading = {
    enabled: false,
    text: '',
  };
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private readonly timeService: TimeService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
    };

    this.timeService.get().subscribe({
      next: (times) => {
        this.times = times;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(null);
        this.loadingState--;
      },
      error: (err) => {
        console.error(err);
        this.errorLoading.enabled = true;
        this.errorLoading.text = err.message;
        this.loadingState--;
      },
      complete: () => console.info('complete')
    });

    this.timeService.deleteAsObservable().subscribe(
      (time) => {
        this.times.splice(this.times.indexOf(time), 1);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  public edit(time: Time) {
    this.router.navigate(['/times/edit/' + time.id])
  }

  public delete(time: Time) {
    if (!time.id) {
      this.toastr.error(
        `<div><b>Time DIDN'T deleted!</b><br/>Can't delete! Didn't receive time id.</div>`,
        '',
        {
          enableHtml: true,
          progressBar: true,
        }
      );
      return;
    }
    this.timeService.delete(time.id).subscribe(
      (time) => {
        if (!time) {
          this.toastr.error(
            `<div><b>Time DIDN'T deleted!</b></div>`,
            '',
            {
              enableHtml: true,
              progressBar: true,
            }
          );
          return
        }
        this.times.splice(this.times.indexOf(time), 1);
        this.toastr.info(
          `<b>Time "${time.name}" deleted</b>`,
          '',
          {
            enableHtml: true,
            progressBar: true
          }
        );
      }
    )
  }
}
