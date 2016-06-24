/*
 *
 *  *  Copyright 2016 Now Can DO LTD (info(at)nowcando.com)
 *  *
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  *  you may not use this file except in compliance with the License.
 *  *  You may obtain a copy of the License at
 *  *
 *  *       http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  *  distributed under the License is distributed on an "AS IS" BASIS,
 *  *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  *  See the License for the specific language governing permissions and
 *  *  limitations under the License.
 *  *
 *  * For more information: http://www.nowcando.com
 *
 */

/**
 * This File Created by Saeed on 01/06/2016.
 */

import * as core  from "./core";
export class TimeSpan implements core.IComparable<TimeSpan>{

    private static  ticksPerMilisecond=1;
    private static  ticksPerSecond=TimeSpan.ticksPerMilisecond*1000;
    private static  ticksPerMinute=TimeSpan.ticksPerSecond*60;
    private static  ticksPerHour=TimeSpan.ticksPerMinute*60;
    private static  ticksPerDay=TimeSpan.ticksPerHour*24;

    private static  milisecondsPerTicks=1/TimeSpan.ticksPerMilisecond;
    private static  secondsPerTicks=1/TimeSpan.ticksPerSecond;
    private static  minutesPerTicks=1/TimeSpan.ticksPerMinute;
    private static  hoursPerTicks=1/TimeSpan.ticksPerHour;
    private static  daysPerTicks=1/TimeSpan.ticksPerDay;

    private _timespan:number;
    constructor(timespan:TimeSpan);
    constructor(timespan:number);
    constructor(fromDate:core.DateTime,toDate:core.DateTime);
    constructor(fromDate:Date,toDate:Date);
    constructor(fromDate:number|TimeSpan|core.DateTime|Date,toDate?:number|TimeSpan|core.DateTime|Date){
        if(typeof fromDate ==="number" && !toDate){
            this._timespan = fromDate;
        }
        else if(fromDate instanceof TimeSpan && !toDate){
            this._timespan = fromDate.Ticks;
        }
        else if(fromDate instanceof TimeSpan && !toDate){
            this._timespan = fromDate.Ticks;
        }
        else if(fromDate instanceof TimeSpan && toDate instanceof  TimeSpan){
            this._timespan = toDate.Ticks - fromDate.Ticks;
        }
        else if(fromDate instanceof Date && toDate instanceof  Date){
            this._timespan = toDate.getTime() - fromDate.getTime();
        }
        else{

        }
    }
    
    get Ticks():number{return this._timespan;}

    get MiliSeconds():number{return Math.floor(this._timespan/TimeSpan.ticksPerMilisecond)%1000;}
    get Seconds():number{return Math.floor(this._timespan/TimeSpan.ticksPerSecond)%60;}
    get Minutes():number{return Math.floor(this._timespan/TimeSpan.ticksPerMinute)%60;}
    get Hours():number{return Math.floor(this._timespan/TimeSpan.ticksPerHour)%24;}
    get Days():number{return Math.floor(this._timespan/TimeSpan.ticksPerDay);}


    get TotalMiliSeconds():number{return Math.floor( this._timespan*TimeSpan.milisecondsPerTicks);}
    get TotalSeconds():number{return Math.floor(this._timespan*TimeSpan.secondsPerTicks);}
    get TotalMinutes():number{return Math.floor(this._timespan*TimeSpan.minutesPerTicks);}
    get TotalHours():number{return Math.floor(this._timespan*TimeSpan.hoursPerTicks);}
    get TotalDays():number{return Math.floor(this._timespan*TimeSpan.daysPerTicks);}


    compareTo(a: TimeSpan): core.IComparator<TimeSpan>{
        if(this.Ticks>a.Ticks)return 1;
        else if(this.Ticks<a.Ticks)return -1;
        else 0;
    }
}