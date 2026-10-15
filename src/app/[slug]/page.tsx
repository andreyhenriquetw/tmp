import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen -translate-y-4 flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
          className="rounded-md"
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="-translate-y-12 space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Sejam bem-vindos!</h3>
        <div className="p opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos oferecer
          praticidade sabor em cada detalhe!
        </div>
      </div>
      <div className="grid w-full max-w-md -translate-y-16 grid-cols-2 gap-3 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          buttonText="Para retirada"
          imageAlt="Para retirada"
          imageUrl="/tempretirada.png"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          buttonText="Para Delivery"
          imageAlt="Para Delivery"
          imageUrl="/tempmoto.png"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
