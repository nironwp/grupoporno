import { cache } from "react";
import axios from "axios";
import { revalidateAdminPanel } from "./actions";

export const revalidate = 30;

export type IGetAllCategoriesRequestOptions = {
  status: number;
  message: string;
  data: {
    categories: ICategoryOptions[];
  };
};

export type IGetOneCategoriesRequestOptions = {
  status: number;
  message: string;
  data: {
    category: ICategoryOptions;
  };
};

export type ICategoryOptions = {
  id: number;
  title: string;
  slug: string;
  banner_image: string;
  dt_created_at: string;
};


export const getAllCategories = cache(async () => {
  const categoriesRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/list/all`
  );

  const categories: IGetAllCategoriesRequestOptions = categoriesRequest.data;

  return categories.data.categories;
});

export const getOneCategory = cache(async (slug: string) => {
  const categoryRequest = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/list/${slug}`
  );

  const category: IGetOneCategoriesRequestOptions = categoryRequest.data;

  return category.data.category;
});

export const deleteOneCategory = async (id: number, token: string) => {
  const categoryRequest = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/category/delete/${id}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  revalidateAdminPanel();

  return categoryRequest;
};

export const createOneCategory = async (
  title: string,
  banner_image: string,
  slug: string,
  token: string
) => {
  const categoryRequest = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/category/create`,
    { title, banner_image, slug },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  revalidateAdminPanel();

  return categoryRequest;
};
