import { Component } from '@angular/core';
import { faCoins, faPlus, faTicket, faTicketAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TicketGroupService } from '../ticket_groups/ticket_groups.service';
import { TicketGroupSum } from '../ticket_groups/ticket_groups.types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
   paidTicketsIcon = faCoins;
   reservedTicketsIcon = faTicket;
   totalTicketsIcon = faTicketAlt;
   freeTicketsIcon = faPlus;
   cancelledTicketsIcon = faTimes;
   ticketGroupSum?: TicketGroupSum;

  constructor(
    private readonly ticket_groupService: TicketGroupService,
    private readonly toastr: ToastrService
  ) {
    // this.ticket_groupService.getActiveSum().subscribe({
    //   // success
    //   next: (ticket_groupSum) => {
    //     this.ticket_groupSum = ticket_groupSum;
    //     this.toastr.info(
    //       'Loaded successfully',
    //       'TicketGroups summary',
    //       {
    //         progressBar: true,
    //       }
    //     );
    //   },
    //   // Error
    //   error: (err) => {
    //     this.toastr.error(
    //       err.message,
    //       'Cannot load ticket_groups summary',
    //       {
    //         progressBar: true,
    //       }
    //     );
    //     return
    //   }
    // })
  }

  get freeTickets() {
    return 0; //this.ticket_groupSum?.free
  }

  get reservedTickets() {
    return 0; //this.ticket_groupSum?.reserved
  }
  
  get cancelledTickets() {
    return 0; //this.ticket_groupSum?.cancelled
  }

  get totalTickets() {
    return 0; //this.ticket_groupSum?.total
  }

  get paidTickets() {
    return 0; //this.ticket_groupSum?.paid
  }
}
