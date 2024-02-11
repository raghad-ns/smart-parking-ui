export namespace HistoryNS {
  export interface IHistoryRecord {
    cost?: number;
    duration: string;
    location: string;
    parking_id: number;
    park_At: string;
    leave_At?: string;
    status: "active" | "inactive";
  }
}
