import { Component } from '@angular/core';
import { faCoins, faPlus, faTicket, faTicketAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TimeService } from '../times/time.service';
import { TimeSum } from '../times/time.types';
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
   timeSum?: TimeSum;

  constructor(
    private readonly timeService: TimeService,
    private readonly toastr: ToastrService
  ) {
    this.timeService.getActiveSum().subscribe({
      // success
      next: (timeSum) => {
        this.timeSum = timeSum;
        this.toastr.info(
          'Loaded successfully',
          'Times summary',
          {
            progressBar: true,
          }
        );
      },
      // Error
      error: (err) => {
        this.toastr.error(
          err.message,
          'Cannot load times summary',
          {
            progressBar: true,
          }
        );
        return
      }
    })
  }

  get freeTickets() {
    return this.timeSum?.free
  }

  get reservedTickets() {
    return this.timeSum?.reserved
  }
  
  get cancelledTickets() {
    return this.timeSum?.cancelled
  }

  get totalTickets() {
    return this.timeSum?.total
  }

  get paidTickets() {
    return this.timeSum?.paid
  }
}
