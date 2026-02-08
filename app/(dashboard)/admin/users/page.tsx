"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { adminUserService } from "@/services/admin.service";
import Image from "next/image";
import Loader from "@/components/dashboard/Loader";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  isBanned: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const res = await adminUserService.getAllUsers();
    if (res.success) {
      setUsers(res.data);
      setFiltered(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  // 🔎 search filter
  useEffect(() => {
    const f = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiltered(f);
  }, [search, users]);

  // 🔁 role change
  const handleRoleChange = async (id: string, role: string) => {
    const res = await adminUserService.updateUserRole(id, role);

    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text: "User role updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchUsers();
    } else {
      Swal.fire("Error", res?.message || "Failed to update role", "error");
    }
  };

  // 🚫 ban/unban
  const handleBanToggle = async (id: string) => {
    const res = await adminUserService.toggleBanUser(id);

    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: res.data.isBanned ? "User Banned" : "User Unbanned",
        text: res.message,
        timer: 1500,
        showConfirmButton: false,
      });

      fetchUsers();
    } else {
      Swal.fire("Error", res?.message || "Action failed", "error");
    }
  };

  return (
    <div className="p-2 space-y-6">
      <h1 className="text-3xl font-bold">Admin User Management</h1>

      {/* search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* 🔥 Loader */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
          <Loader />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4">User</th>
                    <th className="text-center p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td className="p-6">No users found</td>
                    </tr>
                  ) : (
                    filtered.map((user) => (
                      <tr key={user.id} className="border-t">
                        {/* user */}
                        <td className="p-4 flex items-center gap-3 ">
                          <Image
                            src={user.image || "/imgs/avatar.png"}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </td>

                        {/* email */}
                        <td className="p-4 text-center">{user.email}</td>

                        {/* role */}
                        <td className="p-4">
                          <Select
                            defaultValue={user.role}
                            onValueChange={(val) =>
                              handleRoleChange(user.id, val)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                              <SelectItem value="SELLER">SELLER</SelectItem>
                              <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>

                        {/* status */}
                        <td className="p-4">
                          {user.isBanned ? (
                            <span className="text-red-500 font-medium">
                              Banned
                            </span>
                          ) : (
                            <span className="text-green-600 font-medium">
                              Active
                            </span>
                          )}
                        </td>

                        {/* action */}
                        <td className="p-4">
                          <Button
                            variant={user.isBanned ? "default" : "destructive"}
                            size="sm"
                            onClick={() => handleBanToggle(user.id)}
                          >
                            {user.isBanned ? "Unban" : "Ban"}
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
