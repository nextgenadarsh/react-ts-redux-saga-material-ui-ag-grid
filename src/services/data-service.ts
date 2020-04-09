import { BehaviorSubject } from "rxjs";

const status = new BehaviorSubject("Unknown");

const DataService = {
  next: newStatus => {
    status.next(newStatus);
  },

  getStatus: () => {
    return status.asObservable();
  }
};

setInterval(() => {
  const currentDate = Date.now();
  DataService.next(currentDate % 2 === 0 ? "Offline" : "Online");
}, 2000);

export default DataService;
