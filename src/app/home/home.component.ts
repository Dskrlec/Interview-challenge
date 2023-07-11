import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../services/meetings/meetings.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../models/user.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  users: UserData[] = [];
  selectedUser!: string;
  displayedColumns: string[] = ['user_name', 'working_hours','meetings', 'events']
  dataSource = new MatTableDataSource<any>()

  constructor( private meetingService: MeetingsService) {
    this.meetingService.getAllUsers().subscribe((data) => {
      this.users = data.map((user: any) => {
        let startWork = user.working_hours.start
        let endWork = user.working_hours.end
        let filteredEvents = user.events.filter((event: any) => {
          let startEvent = this.getTimeFromISOString(event.start)
          let endEvent = this.getTimeFromISOString(event.end)
          return startEvent >= startWork && endEvent <= endWork
         })
      
        return { ...user, events: filteredEvents }
       })
        this.dataSource = new MatTableDataSource(this.users)
    });
  }

 getTimeFromISOString(isoString: string): string {
    let date = isoString.substring(0, isoString.length-5);
    let time = date.split('T')[1]
    return time;
}

applyFilter(): void {
    this.dataSource.filter = this.selectedUser.trim().toLowerCase()
   }
   
   onClearFilter(): void {
    this.selectedUser = '';
    this.applyFilter();
   }
}
  