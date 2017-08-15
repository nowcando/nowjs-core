export interface IApplicationModule {
    load(): Promise<void>;
    unload(): Promise<void>;
}
