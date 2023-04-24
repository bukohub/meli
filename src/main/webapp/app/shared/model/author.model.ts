export interface IAuthor {
  id?: number;
  name?: string | null;
  lastName?: string | null;
}

export const defaultValue: Readonly<IAuthor> = {};
