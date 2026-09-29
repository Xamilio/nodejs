export class CategoryGetResDto {
  id: number;
  title: string;
  slug: string;
  image?: string;
  parent_id: number | null;
}
