import { cache } from "react";

export interface IPlan {
    id: number,
    name: string,
    time: number,
    value: number
}

export const getAllPlans = cache(async () => {
    const planssRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/plan/list/all`,
      {
        next: { tags: ["plans"] },
      }
    );
  
    const planss = await planssRequest.json();
  
    return planss.data;
  });