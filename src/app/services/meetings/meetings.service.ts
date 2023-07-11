import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserData } from "../../models/user.interface"






@Injectable({
	providedIn: 'root'
})
export class MeetingsService {

    constructor(private readonly http: HttpClient) {}

    public getAllUsers(): Observable<UserData[]> {
      return this.http.get<UserData[]>('assets/data.json');
    }
      
}  








