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
 * This File Created by Saeed on 31/05/2016.
 */


export class StringUtils{



    /**
     * @param {String} name
     * @return {String}
     */
    public static toUpperCamelCase(name:string) {
    let result = "";
    let parts = name.split(/\s+/g);
    parts.forEach(function(part) {
        result += StringUtils.firstToUpper(part);
    });
    return result;
};

    /**
     * @param {String} name
     * @return {String}
     */
    public static firstToUpper(name:string) {
    return (name.substring(0,1).toUpperCase() + name.substring(1));
};

}
