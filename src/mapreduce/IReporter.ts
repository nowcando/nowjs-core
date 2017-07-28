export interface IReporter {
    Progress: number;
    notifyChanged(): void;
}
