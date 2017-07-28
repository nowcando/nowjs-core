
import * as fs from "fs";
import * as path from "path";

export interface IFileInfo { Name: string; Path: string; Size: number; }
export interface IDirectoryInfo { Name: string; Path: string ; }

export function getDirectories(dir: string, subdirs?: boolean): IDirectoryInfo[] {
    return getDeepDirectories(dir, subdirs);
}

// tslint:disable-next-line:variable-name
function getDeepDirectories(dir: string, subdirs?: boolean, files_?: IDirectoryInfo[]): IDirectoryInfo[] {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    // tslint:disable-next-line:forin
    for (const i in files) {
        const fPath = path.join(dir, files[i]);
        if (fs.statSync(fPath).isDirectory()) {
            if (subdirs) {
                getDeepDirectories(fPath, subdirs, files_);
            }
            files_.push({ Name: files[i], Path: fPath });
        }
    }
    return files_;
}

export function getFiles(dir: string, subdirs?: boolean): IFileInfo[] {
    return getDeepFilesInDirectories(dir, subdirs);
}

// tslint:disable-next-line:variable-name
function getDeepFilesInDirectories(dir: string, subdirs?: boolean, files_?: IFileInfo[]): IFileInfo[] {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    // tslint:disable-next-line:forin
    for (const i in files) {
        const fPath = path.join(dir, files[i]);
        const fstat = fs.statSync(fPath);
        if (fstat && fstat.isDirectory()) {
            if (subdirs) {
                getDeepFilesInDirectories(fPath, subdirs, files_);
            }
        }  else {
            files_.push({ Name: files[i], Path: fPath, Size: fstat.size });
        }
    }
    return files_;
}
