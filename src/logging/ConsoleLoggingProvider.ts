import { ILoggingProvider } from "./ILoggingProvider";

export class ConsoleLoggingProvider implements ILoggingProvider {
    public async clear(): Promise<void> {
        return Promise.resolve();
    }
    public log(level: "fatal" | "error" | "warn" | "info" | "debug" | "trace", message: string, ...meta: any[]): void {
        // tslint:disable-next-line:no-console
        console.log(`${Date.now()} , ${message}`, ...meta);
    }
    public fatal(message: string, ...meta: any[]): void {
        this.log("fatal", message, ...meta);
    }
    public error(message: string, ...meta: any[]): void {
        this.log("error", message, ...meta);
    }
    public warn(message: string, ...meta: any[]): void {
        this.log("warn", message, ...meta);
    }
    public info(message: string, ...meta: any[]): void {
        this.log("info", message, ...meta);
    }
    public debug(message: string, ...meta: any[]): void {
        this.log("debug", message, ...meta);
    }
    public trace(message: string, ...meta: any[]): void {
        this.log("trace", message, ...meta);
    }
    public get Name(): string {
        return "ConsoleLoggingProvider";
    }

}
