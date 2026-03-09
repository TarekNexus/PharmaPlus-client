

import { getAllCategories } from "@/action/medicine/getAllCategories";
import { getAllMedicines } from "@/action/medicine/getAllMedicines";
import Card from "@/components/shop/Card";
import Hero from "@/components/shop/Hero";

export default async function Page() {

const {data}=await getAllMedicines()
  const categories = await getAllCategories();
    return (
        <div>
            <Hero></Hero>
              <Card medicines={data} categories={categories} />
           
        </div>
    );
}