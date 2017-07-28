import { Job } from "./Job";

// tslint:disable-next-line:interface-name
export interface JobClientOptions {
    Host: string;
    Port: number;
    Token: string;
}

export class JobClient {
   private options: JobClientOptions;
   constructor(options: JobClientOptions) {
       this.options = options;
   }
   // tslint:disable-next-line:no-empty
   public runJob(job: Job): Promise<void> {
       return Promise.resolve();
   }
}
