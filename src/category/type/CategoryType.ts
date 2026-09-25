export type CategoryType = {
  id: number;
  title: string;
  image?: string;
  parent_id: number | null;
};

export type CategoryCreateType = Omit<CategoryType, 'id'>;
