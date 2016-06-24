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
import * as core  from "../core";
/**
 * This File Created by Saeed on 22/04/2016.
 */
export   enum WritingDirection{
    LTR,RTL,TD,DT
}



interface  CultureRecordInfo {
    Name:string;
    NativeName:string;
    LatinName:string;
    TwoLetter:string;
    ThreeLetter:string;
    DateTimeFormat:core.globalization.DateTimeFormat;
    NumberFormat:core.globalization.NumberFormat;
    WritingDirection:WritingDirection;

}

export class Culture {
    private code:string;

    constructor(code:string) {
        this.setCultureData(code);
    }
    private setCultureData(code:string) {
        this.code = code;
    };
    get Code():string {
        return this.code;
    }
    get Calendars():core.globalization.Calendar[]{ return null;}
    get DateTimeFormat():core.globalization.DateTimeFormat{ return null;}
}