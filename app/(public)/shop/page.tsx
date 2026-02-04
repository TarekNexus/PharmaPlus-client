

import Card from "@/components/shop/Card";
import Hero from "@/components/shop/Hero";
import { medicineService } from "@/services/medicine.service";
export default async function Page() {

const {data}=await medicineService.getAllMedicines()
  const categories = await medicineService.getAllCategories();
    return (
        <div>
            <Hero></Hero>
              <Card medicines={data} categories={categories} />
           
        </div>
    );
}