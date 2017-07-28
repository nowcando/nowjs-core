
export interface IPerformanceTime {
    StartedAt: Date; FinishedAt?: Date; ElapsedTime: number; Name: string|symbol;
}

export class PerformanceCounter {
    private static timers = new Map<string|symbol, IPerformanceTime>();
    // tslint:disable-next-line:member-ordering
    public static start(id: string|symbol): IPerformanceTime {
        // tslint:disable-next-line:new-parens
        const pt = {StartedAt: new Date, Name: id, ElapsedTime: 0};
        PerformanceCounter.timers.set(id, pt);
        return pt;
    }
    // tslint:disable-next-line:member-ordering
    public static finish(id: string|symbol): IPerformanceTime {
       const pt =  PerformanceCounter.timers.get(id);
       if (pt) {
            pt.FinishedAt = new Date();
            pt.ElapsedTime = pt.FinishedAt.getTime() - pt.StartedAt.getTime();
            PerformanceCounter.timers.delete(id);
        }
       return pt;
    }
}
