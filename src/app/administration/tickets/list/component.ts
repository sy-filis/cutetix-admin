import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TicketService } from '../tickets.service';
import { Ticket } from '../tickets.types';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class TicketsListComponent implements OnInit, OnDestroy {
  public faPen = faPen;
  public faTrash = faTrash;
  public tickets: Ticket[] = [];
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
    private readonly ticketsService: TicketService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
    };

    this.ticketsService.get().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
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

    this.ticketsService.deleteAsObservable().subscribe(
      (ticket) => {
        this.tickets.splice(this.tickets.indexOf(ticket), 1);
      }
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the ticket
    this.dtTrigger.unsubscribe();
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
