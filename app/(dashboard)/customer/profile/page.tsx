"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { customerService } from "@/services/customer.service";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Loader from "@/components/dashboard/Loader";

interface Profile {
  name: string;
  email: string;
  image?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const brandColor = "#FF833B";

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await customerService.getProfile();
      if (res.success) {
        setProfile(res.data);
        setPreview(res.data.image || null);
      } else {
        toast.error("Failed to load profile");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return profile.image || null;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) return data.secure_url;
      toast.error("Image upload failed!");
      return null;
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    const imageUrl = file ? await uploadImage() : profile.image;

    const res = await customerService.updateProfile({
      name: profile.name,
      email: profile.email,
      ...(imageUrl && { image: imageUrl }),
    });
    setUpdating(false);

    if (res.success) {
      toast.success("Profile updated successfully!");
      setProfile({ ...profile, image: imageUrl || "" });
      setFile(null);
    } else {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4">
      <Toaster position="top-right" />
      <h1 className="lg:text-3xl md:lg:text-3xl text-2xl font-satoshi font-bold text-[#FF833B] mb-4">
        My Profile
      </h1>

      <div className="bg-white shadow-lg border md:w-9/12 rounded-2xl p-4 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
            {preview ? (
              <Image src={preview} alt="Avatar" fill style={{ objectFit: "cover" }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-4xl font-bold">
                {profile.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <label
            className={`mt-4 cursor-pointer px-4 py-2 rounded-full font-medium text-white shadow-md hover:shadow-lg transition`}
            style={{ backgroundColor: brandColor }}
          >
            {uploading ? "Uploading..." : "Upload Photo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading || updating}
            />
          </label>
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full">
          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdate}
              disabled={updating || uploading}
              className="w-full mt-2 py-3 rounded-lg text-white font-semibold text-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
              style={{ backgroundColor: brandColor }}
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
