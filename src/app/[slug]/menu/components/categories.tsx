"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategories: { include: { products: true } } };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoryWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-background">
      <div className="relative px-5 pb-5 pt-8">
        <div className="absolute left-1/2 top-[-49px] h-[77px] w-[77px] -translate-x-1/2 overflow-hidden rounded-xl border-2 border-background shadow-md">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute right-4 top-[-36px] inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
          <ClockIcon size={12} />
          <p>Aberto</p>
        </div>
        <div className="-mt-1 flex flex-col items-center text-center">
          <h2 className="text-2xl font-extrabold tracking-wide">
            {restaurant.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {restaurant.description}
          </p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>

      <Products products={selectedCategory.products} />
    </div>
  );
};

export default RestaurantCategories;
