export interface Member {
  readonly name: string;
  readonly github: string;
  readonly gitlab?: string;
  readonly twitter?: string;
  readonly roles: readonly string[];
}
