import { WorkingHours } from "./working-hours.interface";

export interface UserData {
    user_id: number;
    user_name: string;
    working_hours: WorkingHours;
    events: Event[];
  }