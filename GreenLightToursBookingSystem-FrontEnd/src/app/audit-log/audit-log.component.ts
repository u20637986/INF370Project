import { DataService } from '../service/rentalDataService';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuditLog } from '../shared/auditLog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort , Sort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {
  auditLog: AuditLog[] =[];
   displayedColumns: string[]=['User','TimeStamp','AffectedDatabaseTable','Transaction'];
  auditLogDataSource = new MatTableDataSource(this.auditLog);

   constructor(private dataService:DataService,private router : Router, private snackBar:MatSnackBar){}

    ngOnInit(): void {
      this.GetAuditLogs();
      console.log(this.auditLog);
    }

  
  GetAuditLogs() {
    this.dataService.GetAuditLogs().subscribe((result: AuditLog[]) => {
      const auditLogList: AuditLog[] = result;
      this.auditLog = [];

      const observables: Observable<any>[] = [];

      auditLogList.forEach((element) => {
        observables.push(
          forkJoin([
            this.dataService.getUser(element.userID), 
          ]).pipe(
            map(([user]) => {
              const auditLogEntry: any = { ...element };

              if (user) {
                auditLogEntry.userName = `${user.name} ${user.surname}`;
              }

              return auditLogEntry;
            })
          )
        );
      });

      forkJoin(observables).subscribe(
        (auditLogEntries) => {
          // Update the dataSource with the fetched data
          this.auditLogDataSource.data = auditLogEntries;
        },
        (error) => {
          console.error('Error fetching audit log entries:', error);
        }
      );
    });
  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.auditLogDataSource.filter = filterValue.trim().toLowerCase();

      // Check if there are any filtered items after applying the filter
      const filteredData = this.auditLogDataSource.filteredData;
      if (filteredData.length === 0) {
        this.showNotFoundSnackbar();
      } else {
       
        this.snackBar.dismiss();
      }
    }

    showNotFoundSnackbar() {
      // Show a snackbar with the "Not found" message
      this.snackBar.open('Log not found', 'Dismiss', {
        duration: 3000, 
        panelClass: 'not-found-snackbar', 
      });
    }
    showSnackbar(message: string, panelClass: string) {
      this.snackBar.open(message, 'Close', {
        duration: 6000,
        panelClass: [panelClass],
      });
    }

}