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

export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export abstract class CalendarBase {
    protected static epochTicks = 62135596800000; // 1970-01-01 means
    protected static ticksPerMilisecond = 1;
    protected static ticksPerSecond = CalendarBase.ticksPerMilisecond * 1000;
    protected static ticksPerMinute = CalendarBase.ticksPerSecond * 60;
    protected static ticksPerHour = CalendarBase.ticksPerMinute * 60;
    protected static ticksPerDay = CalendarBase.ticksPerHour * 24;

    protected static milisecondsPerTicks = 1 / CalendarBase.ticksPerMilisecond;
    protected static secondsPerTicks = 1 / CalendarBase.ticksPerSecond;
    protected static minutesPerTicks = 1 / CalendarBase.ticksPerMinute;
    protected static hoursPerTicks = 1 / CalendarBase.ticksPerHour;
    protected static daysPerTicks = 1 / CalendarBase.ticksPerDay;

    protected static datePartYear = 0;
    protected static datePartDayOfYear = 1;
    protected static datePartMonth = 2;
    protected static datePartDay = 3;
    protected static datePartEra = 4;
    protected static datePartDayofWeek = 5;
    protected static datePartHour = 6;
    protected static datePartMinute = 7;
    protected static datePartSecond = 8;
    protected static datePartFullArray = 9;
    protected static maxYear = 9999;
    protected static fullCircleOfArc = 360.0;
    protected static meanTropicalYearInDays = 365.242189;
    protected static meanSpeedOfSun = CalendarBase.meanTropicalYearInDays / CalendarBase.fullCircleOfArc;
    protected static longitudeSpring = 0.0;
    protected static twoDegreesAfterSpring = 2.0;

    protected getTicks(dateTime: Date): number {
        return dateTime.getTime();
    }
    protected getDays(dateTime: Date): number {
        return Math.floor(this.getTicks(dateTime) / CalendarBase.ticksPerDay);
    }

    protected abstract getTickPart(ticks: number, part: number): number;
    protected abstract getEpoch(): number;
    // tslint:disable:member-ordering
    public abstract getAlgorithm(): string;
    public abstract getEras(): string[];
    public abstract getEra(dateTime: Date): string;
    public abstract isLeapYear(year: number, era?: string): boolean;
    public abstract isLeapMonth(year: number, month: number, era?: string): boolean;
    public abstract isLeapDay(year: number, month: number, day: number, era?: string): boolean;
    public abstract getLeapMonth(year: number): number;
    public abstract getLeapDay(year: number): number;
    public abstract getMonthsInYear(year: number, era?: string): number;
    public abstract getDaysInYear(year: number, era?: string): number;
    public abstract getDaysInMonth(year: number, month: number, era?: string): number;
    public abstract getWeeksInYear(year: number, era?: string): number;
    public abstract getWeekOfYear(dateTime: Date, firstDayOfWeek: DayOfWeek, era?: string): number;
    public abstract getYear(dateTime: Date, era?: string): number;
    public abstract getMonth(dateTime: Date): number;
    public abstract getDayOfMonth(dateTime: Date): number;
    public abstract getDayOfYear(dateTime: Date): number;
    public abstract getHour(dateTime: Date): number;
    public abstract getMinute(dateTime: Date): number;
    public abstract getSecond(dateTime: Date): number;
    public abstract getDayOfWeek(dateTime: Date): DayOfWeek;
    public abstract getFirstDayOfWeek(dateTime: Date): DayOfWeek;
    public abstract addMiliSeconds(dateTime: Date, value: number): Date;
    public abstract addSeconds(dateTime: Date, value: number): Date;
    public abstract addMinutes(dateTime: Date, value: number): Date;
    public abstract addHours(dateTime: Date, value: number): Date;
    public abstract addDays(dateTime: Date, value: number): Date;
    public abstract addWeeks(dateTime: Date, value: number): Date;
    public abstract addMonths(dateTime: Date, value: number): Date;
    public abstract addYears(dateTime: Date, value: number): Date;

    public abstract isValidYear(year: number, era?: string): boolean;
    public abstract isValidMonth(year: number, month: number, era?: string): boolean;
    public abstract isValidDay(year: number, month: number, day: number, era?: string): boolean;
    public abstract toTicks(
        year: number,
        month: number,
        day: number,
        hour?: number,
        minute?: number,
        second?: number,
        millisecond?: number,
    ): number;
    public toDate(
        year: number,
        month: number,
        day: number,
        hour?: number,
        minute?: number,
        second?: number,
        millisecond?: number,
    ): Date {
        const ticks = this.toTicks(year, month, day, hour, minute, second, millisecond);
        return new Date(ticks);
    }
}
