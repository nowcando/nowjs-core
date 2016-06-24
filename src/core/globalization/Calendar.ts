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
import * as core  from "../core";

export enum DayOfWeek{
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export abstract class Calendar{

    protected static  epochTicks = 62135596800000; // 1970-01-01 means
    protected static  ticksPerMilisecond=1;
    protected static  ticksPerSecond=Calendar.ticksPerMilisecond*1000;
    protected static  ticksPerMinute=Calendar.ticksPerSecond*60;
    protected static  ticksPerHour=Calendar.ticksPerMinute*60;
    protected static  ticksPerDay=Calendar.ticksPerHour*24;

    protected static  milisecondsPerTicks=1/Calendar.ticksPerMilisecond;
    protected static  secondsPerTicks=1/Calendar.ticksPerSecond;
    protected static  minutesPerTicks=1/Calendar.ticksPerMinute;
    protected static  hoursPerTicks=1/Calendar.ticksPerHour;
    protected static  daysPerTicks=1/Calendar.ticksPerDay;

    protected static  datePartYear = 0;
    protected static  datePartDayOfYear = 1;
    protected static  datePartMonth = 2;
    protected static  datePartDay = 3;
    protected static  maxYear = 9999;
    protected static fullCircleOfArc = 360.0; 
    protected static meanTropicalYearInDays = 365.242189;
    protected static meanSpeedOfSun = Calendar.meanTropicalYearInDays / Calendar.fullCircleOfArc;
    protected static longitudeSpring = 0.0;
    protected static twoDegreesAfterSpring = 2.0;

    protected getTicks(dateTime:Date|core.DateTime):number{
        let milis = 0;
        if(dateTime instanceof  core.DateTime){
            milis = dateTime.Ticks ;
        }
        else if(dateTime instanceof  Date){
            milis =dateTime.getTime() ;
        }
        return milis + Calendar.epochTicks +  this.getEpoch() ;
    }
   protected  getDays(dateTime:Date|core.DateTime):number{
      return  Math.floor((this.getTicks(dateTime)) / Calendar.ticksPerDay);
   }

    protected abstract getTickPart(ticks:number,part:number):number;
    protected abstract getEpoch():number;
    abstract getAlgorithm():string;
    abstract getEras():string[];
    abstract getEra(dateTime:Date|core.DateTime):string;
    abstract isLeapYear(year:number,era?:string):boolean;
    abstract isLeapMonth(year:number,month:number,era?:string):boolean;
    abstract isLeapDay(year:number,month:number,day:number,era?:string):boolean;
    abstract getLeapMonth(year:number):number;
    abstract getLeapDay(year:number):number;
    abstract getMonthsInYear(year:number,era?:string):number;
    abstract getDaysInYear(year:number,era?:string):number;
    abstract getDaysInMonth(year:number,month:number,era?:string):number;
    abstract getWeeksInYear(year:number,era?:string):number;
    abstract getWeekOfYear(dateTime:Date|core.DateTime,firstDayOfWeek:DayOfWeek,era?:string):number;
    abstract getYear(dateTime:Date|core.DateTime,era?:string):number;
    abstract getMonth(dateTime:Date|core.DateTime):number;
    abstract getDayOfMonth(dateTime:Date|core.DateTime):number;
    abstract getDayOfYear(dateTime:Date|core.DateTime):number;
    abstract getHour(dateTime:Date|core.DateTime):number;
    abstract getMinute(dateTime:Date|core.DateTime):number;
    abstract getSecond(dateTime:Date|core.DateTime):number;
    abstract getDayOfWeek(dateTime:Date|core.DateTime):DayOfWeek;
    abstract getFirstDayOfWeek(dateTime:Date|core.DateTime):DayOfWeek;
    abstract addMiliSeconds(dateTime:Date|core.DateTime,value:number):core.DateTime;
    abstract addSeconds(dateTime:Date|core.DateTime,value:number):core.DateTime;
    abstract addMinutes(dateTime:Date|core.DateTime,value:number):core.DateTime;
    abstract addHours(dateTime:Date|core.DateTime,value:number):core.DateTime;
    abstract addDays(dateTime:Date|core.DateTime,value:number):core.DateTime;
    abstract addWeeks(dateTime:Date|core.DateTime,value:number):core.DateTime;
    abstract addMonths(dateTime:Date|core.DateTime,value:number):core.DateTime;
    abstract addYears(dateTime:Date|core.DateTime,value:number):core.DateTime;

    abstract isValidYear(year:number,era?:string):boolean;
    abstract isValidMonth(year:number,month:number,era?:string):boolean;
    abstract isValidDay(year:number,month:number,day:number,era?:string):boolean;
    abstract toTicks(year:number,  month:number,   day:number,  hour?:number,
                     minute?:number, second?:number, millisecond?:number):number;
    public toDateTime(year:number,  month:number,   day:number,  hour?:number,
               minute?:number, second?:number, millisecond?:number):core.DateTime{
        let ticks = this.toTicks(year,month,day,hour,minute,second,millisecond);
        return new core.DateTime(ticks);
    }
    public toDate(year:number,  month:number,   day:number,  hour?:number,
           minute?:number, second?:number, millisecond?:number):Date{
        let ticks = this.toTicks(year,month,day,hour,minute,second,millisecond);
        return new Date(ticks);
    }
}