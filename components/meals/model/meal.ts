export type MealItemType = {
  id?: number;
  title: string;
  slug: string;
  creator: string;
  creator_email: string;
  image: File | string;
  summary: string;
  instructions: string;
};

export interface MealItemRequest {
  title: FormDataEntryValue | null;
  slug: FormDataEntryValue | null;
  creator: FormDataEntryValue | null;
  creator_email: FormDataEntryValue | null;
  image: FormDataEntryValue | null;
  summary: FormDataEntryValue | null;
  instructions: FormDataEntryValue | null;
}
