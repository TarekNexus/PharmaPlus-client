
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { medicineService } from "@/services/medicine.service";
import { reviewService, Review } from "@/services/review.service";
import { Medicine } from "@/types";
import { addToCart } from "@/components/order/cart";
import Loader from "@/components/dashboard/Loader";
import toast, { Toaster } from "react-hot-toast";
import Hero from "@/components/shop/Hero";
import FaqSection from "@/components/home/FAQSection";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5; // reviews per page

  // ⭐ review states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const totalPages = Math.ceil(reviews.length / perPage);
  // fetch medicine + reviews
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const med = await medicineService.getMedicineById(id);
        setMedicine(med);

        const reviewData = await reviewService.getReviewsByMedicine(id);
        setReviews(reviewData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!medicine)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Medicine not found
      </div>
    );

  // add to cart
  const handleAddToCart = () => {
    addToCart({
      medicineId: medicine.id,
      title: medicine.name,
      price: medicine.price,
      image: medicine.image,
      quantity,
    });

    toast.success(`${medicine.name} added to cart!`);
    router.push("/cart");
  };

  // submit review
  const handleSubmitReview = async () => {
    if (!comment) return toast.error("Write a comment");

    try {
      setReviewLoading(true);

      await reviewService.addReview({
        medicineId: medicine.id,
        rating,
        comment,
      });

      // reload all reviews
      const updated = await reviewService.getReviewsByMedicine(medicine.id);
      setReviews(updated);

      setComment("");
      setRating(5);
      toast.success("Review added!");
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <>
      <Hero />
      <Toaster position="top-right" />

      {/* PRODUCT SECTION */}
      <section className="w-11/12 mx-auto mt-10 md:mt-16 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 bg-[#f7dccd] rounded-3xl p-5 sm:p-8 shadow-xl border">
          {/* IMAGE */}
          <div className="relative group">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-105 rounded-2xl overflow-hidden border-2 border-[#FF833B]">
              <Image
                src={medicine.image}
                alt={medicine.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute top-3 left-3 bg-[#FF833B] text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow">
                In Stock: {medicine.stock}
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              <span className="text-xl md:text-3xl">Name:</span> {medicine.name}
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#FF833B] mb-4">
              <span className="text-black text-xl md:text-3xl">Price:</span> ৳{" "}
              {medicine.price}
            </p>

            <p className="mb-3 text-lg">
              <b>Description:</b> {medicine.description}
            </p>

            <p className="mb-3 text-lg">
              <b>Category:</b> {medicine.category?.name}
            </p>

            <p className="mb-3 text-lg">
              <b>Manufacturer:</b> {medicine.Manufacturer}
            </p>

            <p className="mb-6 text-lg">
              <b>Seller:</b> {medicine?.seller?.name}
            </p>

            <button
              onClick={handleAddToCart}
              className="w-full md:w-fit px-6 py-3 rounded-xl bg-[#FF833B] text-white font-semibold text-lg shadow-md hover:bg-[#e9722f] hover:scale-105 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>


      {/* ==================== REVIEW SECTION ==================== */}
      <section className="w-11/12 mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Customer Reviews
        </h2>

        {/* ADD REVIEW FORM */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8 border">
          <h3 className="font-semibold mb-3 text-lg">Leave a Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded mb-3 w-full md:w-40"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-3 rounded-lg mb-3"
          />

          <button
            onClick={handleSubmitReview} // Calls reviewService.addReview
            disabled={reviewLoading}
            className="bg-[#FF833B] text-white px-6 py-2 rounded-lg hover:bg-[#e76f2c]"
          >
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* DISPLAY ALL REVIEWS WITH PAGINATION */}
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">No reviews yet</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {reviews
                .slice((currentPage - 1) * perPage, currentPage * perPage)
                .map((r) => (
                  <div
                    key={r.id}
                    className="bg-white shadow-lg rounded-3xl border-2 border-[#FF833B] p-6 hover:shadow-xl transition relative "
                  >
                    {/* USER INFO */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#FF833B]/20 flex items-center justify-center font-bold text-[#FF833B] text-lg">
                          {r.user?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {r.user?.name || "Customer"}
                          </p>
                
                        </div>
                      </div>

                      {/* RATING */}
                      <div className="flex items-center gap-1 mt-2 bg-[#FF833B]/10 text-[#FF833B] px-3 py-1 rounded-full text-sm font-semibold">
                        {Array.from({ length: r.rating }, (_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {Array.from({ length: 5 - r.rating }, (_, i) => (
                          <span key={i} className="text-gray-300">
                            ★
                          </span>
                        ))}
                        <span className="ml-2 text-gray-500 text-xs">
                          {r.rating}/5
                        </span>
                      </div>
                    </div>

                    {/* COMMENT */}
                    <p className="text-gray-700 ">{r.comment}</p>

                    {/* DATE */}
                    <div className="text-xs text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-[#FF833B] text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      <FaqSection />
    </>
  );
};

export default Page;
