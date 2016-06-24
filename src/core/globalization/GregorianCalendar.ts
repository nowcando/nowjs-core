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




import * as core from "../core";
import {Calendar, DayOfWeek} from "./Calendar";


/**
 * This File Created by Saeed on 01/06/2016.
 */

export class GregorianCalendar extends Calendar{


    // Number of days in a non-leap year
    protected static daysPerYear            = 365;
    // Number of days in 4 years
    protected static daysPer4Years          = GregorianCalendar.daysPerYear * 4 + 1;
    // Number of days in 100 years
    protected static daysPer100Years        = GregorianCalendar.daysPer4Years * 25 - 1;
    // Number of days in 400 years
    protected static daysPer400Years        = GregorianCalendar.daysPer100Years * 4 + 1;

    // Number of days from 1/1/0001 to 1/1/10000
    protected static daysTo10000            = GregorianCalendar.daysPer400Years * 25 - 366;

    protected static maxMillis             = GregorianCalendar.daysTo10000 * Calendar.ticksPerDay;
    
    protected static  daysToMonth365 =
[
    0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
]

    protected static daysToMonth366 =
[
    0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366
]

    protected  getEpoch():number{
        return 0;
    }
    protected  getTickPart(ticks:number,part:number):number{
        // n = number of days since 1/1/0001
        let n = Math.floor(ticks / Calendar.ticksPerDay);
        // y400 = number of whole 400-year periods since 1/1/0001
        let y400 = Math.floor(n / GregorianCalendar.daysPer400Years);
        // n = day number within 400-year period
        n -= y400 * GregorianCalendar.daysPer400Years;
        // y100 = number of whole 100-year periods within 400-year period
        let y100 = Math.floor(n / GregorianCalendar.daysPer100Years);
        // Last 100-year period has an extra day, so decrement result if 4
        if (y100 == 4) y100 = 3;
        // n = day number within 100-year period
        n -= y100 * GregorianCalendar.daysPer100Years;
        // y4 = number of whole 4-year periods within 100-year period
        let y4 = Math.floor(n / GregorianCalendar.daysPer4Years);
        // n = day number within 4-year period
        n -= y4 * GregorianCalendar.daysPer4Years;
        // y1 = number of whole years within 4-year period
        let y1 = Math.floor(n / GregorianCalendar.daysPerYear);
        // Last year has an extra day, so decrement result if 4
        if (y1 == 4) y1 = 3;
        // If year was requested, compute and return it
        if (part == GregorianCalendar.datePartYear)
        {
            return Math.floor(y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1);
        }
        // n = day number within year
        n -= y1 * GregorianCalendar.daysPerYear;
        // If day-of-year was requested, return it
        if (part == GregorianCalendar.datePartDayOfYear)
        {
            return Math.floor(n + 1);
        }
        // Leap year calculation looks different from IsLeapYear since y1, y4,
        // and y100 are relative to year 1, not year 0
        let leapYear = (y1 == 3 && (y4 != 24 || y100 == 3));
        let days = leapYear? GregorianCalendar.daysToMonth366: GregorianCalendar.daysToMonth365;
        // All months have less than 32 days, so n >> 5 is a good conservative
        // estimate for the month
        let m = n >> 5 + 1;
        // m = 1-based month number
        while (n >= days[m]) m++;
        // If month was requested, return it
        if (part == GregorianCalendar.datePartMonth) return (m);
        // Return 1-based day-of-month
        return Math.floor(n - days[m - 1] + 1);
    }


    protected getNumberOfDays(year:number,month:number,day:number):number{
        if (year >= 1 && year <= GregorianCalendar.maxYear && month >= 1 && month <= 12)
        {
            let days = ((year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))) ? GregorianCalendar.daysToMonth366: GregorianCalendar.daysToMonth365;
            if (day >= 1 && (day <= days[month] - days[month - 1])) {
                let y = year - 1;
                let absoluteDate = y * 365 + y / 4 - y / 100 + y / 400 + days[month - 1] + day - 1;
                return (absoluteDate);
            }
        }
    }

    protected  getTickOfDays(year:number,month:number,day:number):number{
        return (this.getNumberOfDays(year, month,  day)* GregorianCalendar.ticksPerDay);
    }

    protected getFirstDayWeekOfYear(dateTime:Date|core.DateTime,  firstDayOfWeek:number) {
    let dayOfYear = this.getDayOfYear(dateTime) - 1;   
    let dayForJan1 = this.getDayOfWeek(dateTime) - (dayOfYear % 7);
    let offset = Math.floor(dayForJan1 - firstDayOfWeek + 14) % 7;

    return Math.floor((dayOfYear + offset) / 7 + 1);
}

    getAlgorithm():string{return "SOLAR"}
    getEras():string[]{return ["BD","AD"];}
    getEra(dateTime:Date|core.DateTime):string{ 
        let eras =  this.getEras();
        return eras[1];
    }
    isLeapYear(year:number,era?:string):boolean{
        if (year >= 1 && year <= GregorianCalendar.maxYear) {
            return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        }
        return false;
    }
    isLeapMonth(year:number,month:number,era?:string):boolean{
        return false;
    }
    isLeapDay(year:number,month:number,day:number,era?:string):boolean{
        if (!this.isLeapYear(year)) {
            return false;
        }
        if (month == 2 && day == 29) {
            return true;
        }
        return false;
    }
    getLeapMonth(year:number):number{
        return 0;
    }
    getLeapDay(year:number):number{
        if(this.isLeapYear(year)) return this.getDaysInYear(year);
            return 0;
    }
    getMonthsInYear(year:number,era?:string):number{
        return 12;
    }
    getDaysInYear(year:number,era?:string):number{
        if (year >= 1 && year <= GregorianCalendar.maxYear) {
            return ((year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 366:365);
        }
    }
    getDaysInMonth(year:number,month:number,era?:string):number{
        let days = ((year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? GregorianCalendar.daysToMonth366: GregorianCalendar.daysToMonth365);
        return (days[month] - days[month - 1]);
    }
    getWeeksInYear(year:number,era?:string):number{
        return Math.floor(this.getDaysInYear(year,era) / 7);
    }
    getWeekOfYear(dateTime:Date|core.DateTime,firstDayOfWeek:DayOfWeek,era?:string):number{
        return (this.getFirstDayWeekOfYear(dateTime, firstDayOfWeek));
    }
    getYear(dateTime:Date|core.DateTime,era?:string):number{
        let ticks=  this.getTicks(dateTime);
        return (this.getTickPart(ticks,  Calendar.datePartYear));
    }
    getMonth(dateTime:Date|core.DateTime):number{
        let ticks=  this.getTicks(dateTime);
        return (this.getTickPart(ticks,  Calendar.datePartMonth));
    }
    getDayOfMonth(dateTime:Date|core.DateTime):number{
        let ticks=  this.getTicks(dateTime);
        return (this.getTickPart(ticks,  Calendar.datePartDay));
    }
    getDayOfYear(dateTime:Date|core.DateTime):number{
        let ticks=  this.getTicks(dateTime);
        return (this.getTickPart(ticks,  Calendar.datePartDayOfYear));
    }
    getHour(dateTime:Date|core.DateTime):number{
        return dateTime.getHours();
    }
    getMinute(dateTime:Date|core.DateTime):number{
        return dateTime.getMinutes();
    }
    getSecond(dateTime:Date|core.DateTime):number{
        return dateTime.getSeconds();
    }
    getDayOfWeek(dateTime:Date|core.DateTime):DayOfWeek{
        let ticks=  this.getTicks(dateTime);
        return (((ticks / Calendar.ticksPerDay + 1) % 7));
    }
    getFirstDayOfWeek(dateTime:Date|core.DateTime):DayOfWeek{
        return DayOfWeek.Monday;
    }
    addMiliSeconds(dateTime:Date|core.DateTime,value:number):core.DateTime{

        return new core.DateTime(this.getTicks(dateTime)-GregorianCalendar.epochTicks + value);
    }
    addSeconds(dateTime:Date|core.DateTime,value:number):core.DateTime{

        return new core.DateTime(this.getTicks(dateTime)-GregorianCalendar.epochTicks + (value * Calendar.ticksPerSecond ));
    }
    addMinutes(dateTime:Date|core.DateTime,value:number):core.DateTime{
        return new core.DateTime(this.getTicks(dateTime)-GregorianCalendar.epochTicks + (value * Calendar.ticksPerMinute ));
    }
    addHours(dateTime:Date|core.DateTime,value:number):core.DateTime{
        return new core.DateTime(this.getTicks(dateTime)-GregorianCalendar.epochTicks + (value * Calendar.ticksPerHour ));
    }
    addDays(dateTime:Date|core.DateTime,value:number):core.DateTime{
        return new core.DateTime(this.getTicks(dateTime) - GregorianCalendar.epochTicks + (value * Calendar.ticksPerDay ));
    }
    addWeeks(dateTime:Date|core.DateTime,value:number):core.DateTime{
        return (this.addDays(dateTime, value * 7));
    }
    addMonths(dateTime:Date|core.DateTime,value:number):core.DateTime{

        let time = this.getTicks(dateTime)-GregorianCalendar.epochTicks;
        let y = this.getTickPart(time, Calendar.datePartYear);
        let m = this.getTickPart(time, Calendar.datePartMonth);
        let d = this.getTickPart(time, Calendar.datePartDay);
        let i = m - 1 + value;
        if (i >= 0)
        {
            m = i % 12 + 1;
            y = y + i / 12;
        }
        else
        {
            m = 12 + (i + 1) % 12;
            y = y + (i - 11) / 12;
        }
        let daysArray = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)) ? GregorianCalendar.daysToMonth366: GregorianCalendar.daysToMonth365;
        let days = (daysArray[m] - daysArray[m - 1]);

        if (d > days)
        {
            d = days;
        }
        let ticks = this.getTickOfDays(y, m, d) + time % GregorianCalendar.ticksPerDay;
        return new core.DateTime(ticks);
    }
    addYears(dateTime:Date|core.DateTime,value:number):core.DateTime{
        return (this.addMonths(dateTime, value * 12));
    }

    isValidYear(year:number,era?:string):boolean{
        if((year >=1 && year<= GregorianCalendar.maxYear)) return true;
        return false;
    }
    isValidMonth(year:number,month:number,era?:string):boolean{
        if(this.isValidYear(year,era) && (month >=1 && month<=12)) return true;
        return false;
    }
    isValidDay(year:number,month:number,day:number,era?:string):boolean{
        if(this.isValidMonth(year,month,era) &&
            (day >=1 && day<= this.getDaysInMonth(year,month,era))) return true;
        return false;
    }
    toTicks(year:number,  month:number,   day:number,  hour?:number,
            minute?:number, second?:number, millisecond?:number):number{
        let ticks = this.getTickOfDays(year,month,day) + Calendar.epochTicks;
        if(hour) ticks =  ticks + (hour * Calendar.ticksPerHour);
        if(minute) ticks =  ticks + (hour * Calendar.ticksPerMinute);
        if(second) ticks =  ticks + (hour * Calendar.ticksPerSecond);
        if(millisecond) ticks =  ticks + (hour * Calendar.ticksPerMilisecond);
        
        return ticks;
    }
    

}