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
 * Created by saeed on 9/9/16.
 */


export class FileUtils{


    /**
     *
     * @param {String} fileName
     * @return {String}
     */
    public static getFileExtension(fileName:string) {
    let extension:any = null;
    let index = fileName.lastIndexOf(".");
    if (index > -1) {
        extension = fileName.substring(index + 1);
    }
    return extension;
};

    /**
     *
     * @param {string} fileName
     * @return {string}
     */
    public static removeFileExtension(fileName:string) {
    let name = fileName;
    let index = name.lastIndexOf(".");
    if (index > -1) {
        name = name.substring(0, index);
    }
    return name;
};

}