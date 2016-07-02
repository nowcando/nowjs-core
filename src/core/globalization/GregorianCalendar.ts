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
import DateTimeFormat = Intl.DateTimeFormat;

/**
 * This File Created by Saeed on 01/06/2016.
 */

export class GregorianCalendar extends Calendar{

    protected static persianEpochTicks = new Date(0, 1, 1).getTime();
    protected static persianEpoch = Math.floor(GregorianCalendar.persianEpochTicks / GregorianCalendar.ticksPerDay);
    // Number of days in a non-leap year
    protected static daysPerYear = 365;
    // Number of days in 4 years
    protected static daysPer4Years = GregorianCalendar.daysPerYear * 4 + 1;
    // Number of days in 100 years
    protected static daysPer100Years = GregorianCalendar.daysPer4Years * 25 - 1;
    // Number of days in 400 years
    protected static daysPer400Years = GregorianCalendar.daysPer100Years * 4 + 1;

    // Number of days from 1/1/0001 to 1/1/10000
    protected static daysTo10000 = GregorianCalendar.daysPer400Years * 25 - 366;

    protected static maxMillis = GregorianCalendar.daysTo10000 * Calendar.ticksPerDay;

    protected static maxCalendarYear = 9378;
    protected static maxCalendarMonth = 10;
    protected static maxCalendarDay = 13;

    protected static daysToMonth366 =
        [
            0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366
        ]
    protected static daysToMonth365 =
        [
            0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
        ]

    protected static minYear = 1;

    private monthFromOrdinalDay(ordinalDay:number,isleap:boolean):number {

        let index = 0;
        while (ordinalDay > (isleap ? GregorianCalendar.daysToMonth366[index] :GregorianCalendar.daysToMonth365[index]))
            index++;

        return index;
    }

    private   daysInPreviousMonths(month:number,isleap:boolean):number {
        --month;
        return isleap ? GregorianCalendar.daysToMonth366[month] :GregorianCalendar.daysToMonth365[month] ;
    }

    private   dayNumberInYear(month:number, day:number,isleap:boolean):number {
        return this.daysInPreviousMonths(month,isleap) + day;
    }


    protected  getEpoch():number {
        return GregorianCalendar.persianEpochTicks;
    }

    protected getTickParts(ticks:number):{era:number,year:number,
        month:number,day:number,ordinalDay:number,dayofweek:number,hour:number,
        minute:number,second:number} {
        let dt = new Date(ticks);

        let dtf = dt.toLocaleString('en-US-u-ca-gregory', {
            era: "short",hour12: false,
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: "short"
        });
        let dtrx = /^(Sat|Sun|Mon|Tue|Wed|Thu|Fri)\,\s(\d{1,2})\s(\d{1,2})\,\s(\-?\d{1,4})\s(\w{2})\,\s(\d{1,4})\:(\d{1,2})\:(\d{1,2})/ig;
        let dtparts = dtrx.exec(dtf);

        let wd = 0;
        switch (dtparts[1].toLowerCase()) {
            case "sat":
                wd = 6;
                break;
            case "sun":
                wd = 0;
                break;
            case "mon":
                wd = 1;
                break;
            case "tue":
                wd = 2;
                break;
            case "wed":
                wd = 3;
                break;
            case "thu":
                wd = 4;
                break;
            case "fri":
                wd = 5;
                break;
        }

        let e = dtparts[5] === "AD" ? 1 : 0;

        let y = parseInt(dtparts[4]);

        let m = parseInt(dtparts[2]);

        let d = parseInt(dtparts[3]);

        let n = Math.floor(ticks / GregorianCalendar.ticksPerDay);
        let y400 = Math.floor(n / GregorianCalendar.daysPer400Years);
        // n = day number within 400-year period
        n -= y400 * GregorianCalendar.daysPer400Years;
        // y100 = number of whole 100-year periods within 400-year period
        let  y100 = Math.floor( n / GregorianCalendar.daysPer100Years);
        // Last 100-year period has an extra day, so decrement result if 4
        if (y100 == 4) y100 = 3;
        // n = day number within 100-year period
        n -= y100 * GregorianCalendar.daysPer100Years;
        // y4 = number of whole 4-year periods within 100-year period
        let y4 = Math.floor( n / GregorianCalendar.daysPer4Years);
        // n = day number within 4-year period
        n -= y4 * GregorianCalendar.daysPer4Years;
        // y1 = number of whole years within 4-year period
        let y1 = Math.floor( n / GregorianCalendar.daysPerYear);
        // Last year has an extra day, so decrement result if 4
        if (y1 == 4) y1 = 3;


       let leapYear = (y1 == 3 && (y4 != 24 || y100 == 3));

        let od = this.dayNumberInYear(m, d,leapYear);

        let h = parseInt(dtparts[6]);

        let mi = parseInt(dtparts[7]);

        let se = parseInt(dtparts[8]);

        return {
            era: e, dayofweek: wd, year: y, month: m, day: d,
            ordinalDay: od, hour: h, minute: mi, second: se
        };

    }

    protected  getTickPart(ticks:number, part:number):number {
        let parts = this.getTickParts(ticks);


        if (part == GregorianCalendar.datePartDayofWeek) {
            return parts.dayofweek;
        }

        if (part == GregorianCalendar.datePartEra) {
            return parts.era;
        }

        if (part == GregorianCalendar.datePartYear) {
            return parts.year;
        }

        if (part == GregorianCalendar.datePartMonth) {
            return parts.month;
        }

        if (part == GregorianCalendar.datePartDay) {
            return parts.day;
        }


        if (part == GregorianCalendar.datePartDayOfYear) {
            return parts.ordinalDay;
        }

        if (part == GregorianCalendar.datePartHour) {
            return parts.hour;
        }

        if (part == GregorianCalendar.datePartMinute) {
            return parts.minute;
        }

        if (part == GregorianCalendar.datePartSecond) {
            return parts.second;
        }

        return 0;
    }

    private getStartOfYearTicks(year:number):number {
        let ep = new Date(year + 0, 0, 1).getTime();
        let prts = this.getTickParts(ep);
        if (prts.month === 12) {
            ep = this.addDays(new Date(ep), 1).getTime();
            prts = this.getTickParts(ep);
            if (prts.month === 12) {
                ep = this.addDays(new Date(ep), 1).getTime();
                prts = this.getTickParts(ep);
                if (prts.month === 12) {
                    ep = this.addDays(new Date(ep), 1).getTime();
                }
            }
        }

        return ep
    }

    // Absolute persian days for gregory year , month, day
    protected getNumberOfDays(year:number, month:number, day:number):number {
        if (year >= 1 && year <= GregorianCalendar.maxCalendarYear && month >= 1 && month <= 12) {
            return Math.floor(this.getStartOfYearTicks(year) / GregorianCalendar.ticksPerDay)
                + this.dayNumberInYear(month, day,false);
        }

        return 0;
    }

    protected  getTickOfDays(year:number, month:number, day:number):number {
        return (this.getNumberOfDays(year, month, day) * GregorianCalendar.ticksPerDay);
    }

    protected getFirstDayWeekOfYear(dateTime:Date|core.DateTime, firstDayOfWeek:number) {
        let dayOfYear = this.getDayOfYear(dateTime) - 1;
        let dayForJan1 = this.getDayOfWeek(dateTime) - (dayOfYear % 7);
        let offset = (dayForJan1 - firstDayOfWeek + 14) % 7;

        return Math.floor(Math.floor(dayOfYear + offset) / 7 + 1);
    }

    getAlgorithm():string {
        return "SOLAR"
    }

    getEras():string[] {
        return ["BD", "AD"];
    }

    getEra(dateTime:Date|core.DateTime):string {
        let eras = this.getEras();
        return eras[1];
    }

    isLeapYear(year:number, era?:string):boolean {
        if (year >= 1 && year <= GregorianCalendar.maxCalendarYear) {
            return (this.getNumberOfDays(year + 1, 1, 1) - this.getNumberOfDays(year, 1, 1)) === 366;
        }
        return false;
    }

    isLeapMonth(year:number, month:number, era?:string):boolean {
        return false;
    }

    isLeapDay(year:number, month:number, day:number, era?:string):boolean {
        let daysInMonth = this.getDaysInMonth(year, month, era);
        return (this.isLeapYear(year, era) && month == 12 && day == 30);
    }

    getLeapMonth(year:number):number {
        return 0;
    }

    getLeapDay(year:number):number {
        if (this.isLeapYear(year)) return this.getDaysInYear(year);
        return 0;
    }

    getMonthsInYear(year:number, era?:string):number {
        return 12;
    }

    getDaysInYear(year:number, era?:string):number {
        if (year === GregorianCalendar.maxCalendarYear) {
            let daysToMonth = this.isLeapYear(year, era) ? GregorianCalendar.daysToMonth366 :  GregorianCalendar.daysToMonth365;
            return daysToMonth[GregorianCalendar.maxCalendarMonth - 1] + GregorianCalendar.maxCalendarDay;
        }
        // Common years have 365 days.  Leap years have 366 days.
        return (this.isLeapYear(year, era) ? 366 : 365);
    }

    getDaysInMonth(year:number, month:number, era?:string):number {
        if ((month === GregorianCalendar.maxCalendarMonth) &&
            (year === GregorianCalendar.maxCalendarYear)) {
            return GregorianCalendar.maxCalendarDay;
        }
        let daysToMonths = this.isLeapYear(year, era) ? GregorianCalendar.daysToMonth366 :  GregorianCalendar.daysToMonth365;
        let daysInMonth = daysToMonths[month] - daysToMonths[month - 1];
        if ((month == this.getMonthsInYear(year, era)) && !this.isLeapYear(year)) {
            --daysInMonth;
        }
        return daysInMonth;
    }

    getWeeksInYear(year:number, era?:string):number {
        return Math.floor(this.getDaysInYear(year, era) / 7);
    }

    getWeekOfYear(dateTime:Date|core.DateTime, firstDayOfWeek:DayOfWeek, era?:string):number {
        return Math.floor(this.getFirstDayWeekOfYear(dateTime, firstDayOfWeek));
    }

    getYear(dateTime:Date|core.DateTime, era?:string):number {
        let ticks = this.getTicks(dateTime);
        return <number>this.getTickPart(ticks, Calendar.datePartYear);
    }

    getMonth(dateTime:Date|core.DateTime):number {
        let ticks = this.getTicks(dateTime);
        return <number>(this.getTickPart(ticks, Calendar.datePartMonth));
    }

    getDayOfMonth(dateTime:Date|core.DateTime):number {
        let ticks = this.getTicks(dateTime);
        return <number>(this.getTickPart(ticks, Calendar.datePartDay));
    }

    getDayOfYear(dateTime:Date|core.DateTime):number {
        let ticks = this.getTicks(dateTime);
        return <number>(this.getTickPart(ticks, Calendar.datePartDayOfYear));
    }

    getHour(dateTime:Date|core.DateTime):number {
        let ticks = this.getTicks(dateTime);
        return <number>(this.getTickPart(ticks, Calendar.datePartHour));
    }

    getMinute(dateTime:Date|core.DateTime):number {
        let ticks = this.getTicks(dateTime);
        return <number>(this.getTickPart(ticks, Calendar.datePartMinute));
    }

    getSecond(dateTime:Date|core.DateTime):number {
        let ticks = this.getTicks(dateTime);
        return <number>(this.getTickPart(ticks, Calendar.datePartSecond));
    }

    getDayOfWeek(dateTime:Date|core.DateTime):DayOfWeek {
        let ticks = this.getTicks(dateTime);
        return <number>(this.getTickPart(ticks, Calendar.datePartDayofWeek));
    }

    getFirstDayOfWeek(dateTime:Date|core.DateTime):DayOfWeek {
        return DayOfWeek.Monday;
    }

    addMiliSeconds(dateTime:Date|core.DateTime, value:number):core.DateTime {

        return new core.DateTime(this.getTicks(dateTime) + value);
    }

    addSeconds(dateTime:Date|core.DateTime, value:number):core.DateTime {

        return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerSecond ));
    }

    addMinutes(dateTime:Date|core.DateTime, value:number):core.DateTime {
        return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerMinute ));
    }

    addHours(dateTime:Date|core.DateTime, value:number):core.DateTime {
        return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerHour ));
    }

    addDays(dateTime:Date|core.DateTime, value:number):core.DateTime {
        return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerDay ));
    }

    addWeeks(dateTime:Date|core.DateTime, value:number):core.DateTime {
        return (this.addDays(dateTime, value * 7));
    }

    addMonths(dateTime:Date|core.DateTime, value:number):core.DateTime {

        let time = this.getTicks(dateTime);
        let tickparts = this.getTickParts(time);
        let y = tickparts.year;
        let m = tickparts.month;
        let d = tickparts.day;
        let i = m - 1 + value;
        if (i >= 0) {
            m = i % 12 + 1;
            y = y + i / 12;
        } else {
            m = 12 + (i + 1) % 12;
            y = y + (i - 11) / 12;
        }
        let days = this.getDaysInMonth(y, m);
        if (d > days) {
            d = days;
        }
        let ticks = this.getStartOfYearTicks(Math.floor(y)) +
            (this.dayNumberInYear(m, d) * GregorianCalendar.ticksPerDay);

        return (new core.DateTime(ticks));
    }

    addYears(dateTime:Date|core.DateTime, value:number):core.DateTime {
        return (this.addMonths(dateTime, value * 12));
    }

    isValidYear(year:number, era?:string):boolean {
        if ((year >= 1 && year <= GregorianCalendar.maxCalendarYear)) return true;
        return false;
    }

    isValidMonth(year:number, month:number, era?:string):boolean {
        if (this.isValidYear(year, era) && (month >= 1 && month <= 12)) return true;
        return false;
    }

    isValidDay(year:number, month:number, day:number, era?:string):boolean {
        if (this.isValidMonth(year, month, era) &&
            (day >= 1 && day <= this.getDaysInMonth(year, month, era))) return true;
        return false;
    }

    toTicks(year:number, month:number=1, day:number=1, hour?:number,
            minute?:number, second?:number, millisecond?:number):number {
        let ticks = this.getTickOfDays(year, month, day);
        if (hour) ticks = ticks + (hour * Calendar.ticksPerHour);
        if (minute) ticks = ticks + (hour * Calendar.ticksPerMinute);
        if (second) ticks = ticks + (hour * Calendar.ticksPerSecond);
        if (millisecond) ticks = ticks + (hour * Calendar.ticksPerMilisecond);

        return ticks;
    }

}