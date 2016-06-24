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

export class PersianCalendar extends Calendar{
     protected static  persianEpochTicks = new Date(622, 2, 21).getTime()   ;
     protected static  persianEpoch = Math.floor(PersianCalendar.persianEpochTicks / PersianCalendar.ticksPerDay);
     // Number of days in a non-leap year
     protected static daysPerYear            = 365;
     // Number of days in 4 years
     protected static daysPer4Years          = PersianCalendar.daysPerYear * 4 + 1;
     // Number of days in 100 years
     protected static daysPer100Years        = PersianCalendar.daysPer4Years * 25 - 1;
     // Number of days in 400 years
     protected static daysPer400Years        = PersianCalendar.daysPer100Years * 4 + 1;

     // Number of days from 1/1/0001 to 1/1/10000
     protected static daysTo10000            = PersianCalendar.daysPer400Years * 25 - 366;

     protected static maxMillis             = PersianCalendar.daysTo10000 * Calendar.ticksPerDay;

     protected static maxCalendarYear = 9378;
     protected static maxCalendarMonth = 10;
     protected static maxCalendarDay = 13;

     protected static  daysToMonth =
         [
              0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 366
         ]



     protected static  minYear = 622;

     private monthFromOrdinalDay(ordinalDay:number) : number
     {
         let xx = new DateTimeFormat();
       
          let index = 0;
          while (ordinalDay > PersianCalendar.daysToMonth[index])
          index++;

          return index;
     }

    private   daysInPreviousMonths(month:number) :  number
     {
          --month;
       return PersianCalendar.daysToMonth[month];
     }
     private   persianNewYearOnOrBefore(numDays:number) :  number
     {
          // TODO must be implement a fast algorithm
          return numDays - 226895 ;
     }


    protected  getEpoch():number{
        return PersianCalendar.persianEpochTicks;
    }
     protected  getTickPart(ticks:number,part:number):number{
         let numDays =  Math.abs( Math.floor(ticks /  PersianCalendar.ticksPerDay) + 1);

          let yearStartTicks = this.persianNewYearOnOrBefore(numDays);
          let y = Math.floor(Math.floor(((yearStartTicks - PersianCalendar.persianEpoch) / PersianCalendar.meanTropicalYearInDays) + 0.5)) + 1;

          if (part == PersianCalendar.datePartYear)
          {
               return y;
          }

          let ordinalDay = Math.abs( Math.floor(numDays - this.getDays(this.toDateTime(y, 1, 1, 0, 0, 0, 0))));

          if (part == PersianCalendar.datePartDayOfYear)
          {
               return ordinalDay;
          }

          let m = this.monthFromOrdinalDay(ordinalDay);

          if (part == PersianCalendar.datePartMonth)
          {
               return m;
          }

           let d = ordinalDay - this.daysInPreviousMonths(m);

          if (part == PersianCalendar.datePartDay)
          {
               return (d);
          }
          
         return 0;
     }

     // Absolute persian days for persian year , month, day
     protected getNumberOfDays(year:number,month:number,day:number):number{
          if (year >= 1 && year <= PersianCalendar.maxCalendarYear && month >= 1 && month <= 12)
          {
               let ordinalDay = this.daysInPreviousMonths(month) + day - 1; // day is one based, make 0 based since this will be the number of days we add to beginning of year below
               let approximateDaysFromEpochForYearStart = Math.floor(PersianCalendar.meanTropicalYearInDays * (year - 1));
               let yearStartTicks = this.persianNewYearOnOrBefore(PersianCalendar.persianEpoch + approximateDaysFromEpochForYearStart + 180);
               yearStartTicks += ordinalDay;
               return yearStartTicks;
          }
          return 0;
     }

     protected  getTickOfDays(year:number,month:number,day:number):number{
          return (this.getNumberOfDays(year, month,  day)* PersianCalendar.ticksPerDay);
     }

     protected getFirstDayWeekOfYear(dateTime:Date|core.DateTime,  firstDayOfWeek:number) {
          let dayOfYear = this.getDayOfYear(dateTime) - 1;
          let dayForJan1 = this.getDayOfWeek(dateTime) - (dayOfYear % 7);
          let offset = (dayForJan1 - firstDayOfWeek + 14) % 7;

          return Math.floor(Math.floor(dayOfYear + offset) / 7 + 1);
     }

     getAlgorithm():string{return "SOLAR"}
     getEras():string[]{return ["BD","AD"];}
     getEra(dateTime:Date|core.DateTime):string{
          let eras =  this.getEras();
          return eras[1];
     }
     isLeapYear(year:number,era?:string):boolean{
          if (year >= 1 && year <= PersianCalendar.maxCalendarYear) {
               return (this.getNumberOfDays(year + 1, 1, 1) - this.getNumberOfDays(year, 1, 1)) === 366;
          }
          return false;
     }
     isLeapMonth(year:number,month:number,era?:string):boolean{
          return false;
     }
     isLeapDay(year:number,month:number,day:number,era?:string):boolean{
          let daysInMonth = this.getDaysInMonth(year, month, era);
          return (this.isLeapYear(year, era) && month == 12 && day == 30);
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
          if (year === PersianCalendar.maxCalendarYear) {
               return PersianCalendar.daysToMonth[PersianCalendar.maxCalendarMonth-1] + PersianCalendar.maxCalendarDay;
          }
          // Common years have 365 days.  Leap years have 366 days.
          return (this.isLeapYear(year, era) ? 366: 365);
     }
     getDaysInMonth(year:number,month:number,era?:string):number{
          if ((month=== PersianCalendar.maxCalendarMonth) &&
                  (year===PersianCalendar.maxCalendarYear)) {
               return PersianCalendar.maxCalendarDay;
          }

          let daysInMonth = PersianCalendar.daysToMonth[month] - PersianCalendar.daysToMonth[month - 1];
          if ((month == this.getMonthsInYear(year,era)) && !this.isLeapYear(year))
          {
               --daysInMonth;
          }
          return daysInMonth;
     }
     getWeeksInYear(year:number,era?:string):number{
          return Math.floor(this.getDaysInYear(year,era) / 7);
     }
     getWeekOfYear(dateTime:Date|core.DateTime,firstDayOfWeek:DayOfWeek,era?:string):number{
          return Math.floor(this.getFirstDayWeekOfYear(dateTime, firstDayOfWeek));
     }
     getYear(dateTime:Date|core.DateTime,era?:string):number{
          let ticks=  this.getTicks(dateTime) ;
          return Math.floor(this.getTickPart(ticks,  Calendar.datePartYear));
     }
     getMonth(dateTime:Date|core.DateTime):number{
          let ticks=  this.getTicks(dateTime) ;
          return Math.floor(this.getTickPart(ticks,  Calendar.datePartMonth));
     }
     getDayOfMonth(dateTime:Date|core.DateTime):number{
          let ticks=  this.getTicks(dateTime) ;
          return (this.getTickPart(ticks,  Calendar.datePartDay));
     }
     getDayOfYear(dateTime:Date|core.DateTime):number{
          let ticks=  this.getTicks(dateTime) ;
          return Math.floor(this.getTickPart(ticks,  Calendar.datePartDayOfYear));
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
          let ticks=  this.getTicks(dateTime) ;
          return ((Math.floor(ticks / Calendar.ticksPerDay + 1) % 7));
     }
     getFirstDayOfWeek(dateTime:Date|core.DateTime):DayOfWeek{
          return DayOfWeek.Monday;
     }
     addMiliSeconds(dateTime:Date|core.DateTime,value:number):core.DateTime{

          return new core.DateTime(this.getTicks(dateTime) + value);
     }
     addSeconds(dateTime:Date|core.DateTime,value:number):core.DateTime{

          return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerSecond ));
     }
     addMinutes(dateTime:Date|core.DateTime,value:number):core.DateTime{
          return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerMinute ));
     }
     addHours(dateTime:Date|core.DateTime,value:number):core.DateTime{
          return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerHour ));
     }
     addDays(dateTime:Date|core.DateTime,value:number):core.DateTime{
          return new core.DateTime(this.getTicks(dateTime) + (value * Calendar.ticksPerDay ));
     }
     addWeeks(dateTime:Date|core.DateTime,value:number):core.DateTime{
          return (this.addDays(dateTime, value * 7));
     }
     addMonths(dateTime:Date|core.DateTime,value:number):core.DateTime{

          let time = this.getTicks(dateTime);
          let y = this.getTickPart(time, PersianCalendar.datePartYear);
          let m = this.getTickPart(time, PersianCalendar.datePartMonth);
          let d = this.getTickPart(time, PersianCalendar.datePartDay);
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
          let ticks = this.getNumberOfDays(y, m, d) * PersianCalendar.ticksPerDay + time % PersianCalendar.ticksPerDay;

          return (new core.DateTime(ticks));
     }
     addYears(dateTime:Date|core.DateTime,value:number):core.DateTime{
          return (this.addMonths(dateTime, value * 12));
     }

     isValidYear(year:number,era?:string):boolean{
          if((year >=1 && year<= PersianCalendar.maxCalendarYear)) return true;
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
          let ticks = this.getTickOfDays(year,month,day) + Calendar.epochTicks + this.getEpoch();
          if(hour) ticks =  ticks + (hour * Calendar.ticksPerHour);
          if(minute) ticks =  ticks + (hour * Calendar.ticksPerMinute);
          if(second) ticks =  ticks + (hour * Calendar.ticksPerSecond);
          if(millisecond) ticks =  ticks + (hour * Calendar.ticksPerMilisecond);

          return ticks;
     }

    
}