
export enum JobState {
    NotStarted = 0,
    Running = 1,
    Completed = 16,
}

// tslint:disable-next-line:interface-name
export interface JobOptions {
    JobName: string;
}

export class Job {
    // tslint:disable-next-line:no-empty
    private jobname: string= "";
    private state: JobState;
    constructor(options?: JobOptions) {
        this.state = JobState.NotStarted;
    }
    public get JobName(): string{
        return this.jobname;
    }
    public set JobName(value: string){
         this.jobname =  value;
    }
    public get JobState(): JobState{
        return this.state;
    }

    public get IsCompleted(): boolean{
        return this.state === JobState.Completed;
    }

}
