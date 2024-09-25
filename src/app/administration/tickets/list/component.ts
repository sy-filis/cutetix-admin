import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TicketService } from '../tickets.service';
import { Ticket } from '../tickets.types';
import { faBan, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class TicketsListComponent implements OnInit, OnDestroy {
  public faPen = faPen;
  public faTrash = faTrash;
  public cancelIcon = faBan;
  public tickets: Ticket[] = [];
  public loadingState = 1;
  public errorLoading = {
    enabled: false,
    text: '',
  };
  private startup = true;

  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 25,
  };

  constructor(
    private readonly ticketsService: TicketService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  private updateTickets() {
    this.loadingState = 1;
    this.errorLoading = {
      enabled: false,
      text: '',
    }
    this.ticketsService.get().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        if (this.startup) {
          this.startup = false;
          // Render it without destroy
          this.dtTrigger.next(null);
        } else {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(null);
          });
        }
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
  }

  ngOnInit(): void {
    this.updateTickets();

    this.ticketsService.deleteAsObservable().subscribe(
      (ticket) => {
        this.tickets.splice(this.tickets.indexOf(ticket), 1);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the table trigger
    this.dtTrigger.unsubscribe();
  }

  private notCancelledTicketToastr() {
    this.toastr.error(
      `<div><b>Ticket DIDN'T cancelled!</b></div>`,
      '',
      {
        enableHtml: true,
        progressBar: true,
      }
    );
  }

  public cancel(ticket: Ticket) {
    if (!confirm(
      "Are you sure to cancel?"
    )) {
      this.notCancelledTicketToastr()
      return
    }
    this.ticketsService.cancel(ticket).subscribe(
      (ticket) => {
        if (!ticket) {
          this.notCancelledTicketToastr()
          return
        }
        this.updateTickets();
        this.toastr.info(
          `<b>Ticket "${ticket.firstname} ${ticket.lastname}" cancelled</b>`,
          '',
          {
            enableHtml: true,
            progressBar: true
          }
        );
      }
    )
  }

  public edit(ticket: Ticket) {
    this.router.navigate(['/tickets/edit/' + ticket.id])
  }

  public delete(ticket: Ticket) {
    if (!ticket.id) {
      this.toastr.error(
        `<div><b>Ticket DIDN'T deleted!</b><br/>Can't delete! Didn't receive ticket id.</div>`,
        '',
        {
          enableHtml: true,
          progressBar: true,
        }
      );
      return;
    }
    // this.ticketsService.delete(ticket.id).subscribe(
    //   (ticket) => {
    //     if (!ticket) {
    //       this.toastr.error(
    //         `<div><b>Ticket DIDN'T deleted!</b></div>`,
    //         '',
    //         {
    //           enableHtml: true,
    //           progressBar: true,
    //         }
    //       );
    //       return
    //     }
    //     this.tickets.splice(this.tickets.indexOf(ticket), 1);
    //     this.toastr.info(
    //       `<b>Ticket "${ticket.name}" deleted</b>`,
    //       '',
    //       {
    //         enableHtml: true,
    //         progressBar: true
    //       }
    //     );
    //   }
    // )
  }
}
