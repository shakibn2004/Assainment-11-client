"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Shield, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { usersApi, User } from "@/services/api/users";
import { LoadingScreen } from "@/components/shared/Spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await usersApi.getUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    const success = await usersApi.updateUser(id, { role: newRole });
    if (success) {
      setUsers(users.map(user => 
        user.id === id ? { ...user, role: newRole } : user
      ));
      toast.success(`Role updated to ${newRole}`);
    } else {
      toast.error("Failed to update role");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const success = await usersApi.updateUser(id, { status: newStatus });
    if (success) {
      setUsers(users.map(user => 
        user.id === id ? { ...user, status: newStatus } : user
      ));
      toast.success(`Status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    const success = await usersApi.deleteUser(id);
    if (success) {
      setUsers(users.filter(user => user.id !== id));
      toast.success("User deleted successfully");
    } else {
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <LoadingScreen text="Loading users..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white">Export CSV</Button>
      </div>

      <div className="glass-panel overflow-hidden rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium text-muted-foreground">User</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Role</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Joined</th>
                <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      {user.role === 'admin' ? <Shield className="w-3.5 h-3.5 text-primary" /> : <UserIcon className="w-3.5 h-3.5" />}
                      <span className="capitalize">{user.role || 'user'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`
                      ${user.status === 'active' || !user.status ? 'border-green-500/50 text-green-500' : ''}
                      ${user.status === 'suspended' ? 'border-red-500/50 text-red-500' : ''}
                    `}>
                      <span className="capitalize">{user.status || 'Active'}</span>
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors outline-none cursor-pointer border-none bg-transparent p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        </DropdownMenuGroup>
                        
                        <DropdownMenuSeparator className="bg-white/10" />
                        
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-xs text-muted-foreground py-1">Change Role</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleRoleChange(user.id, "admin")}>
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(user.id, "creator")}>
                            Make Creator
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(user.id, "supporter")}>
                            Make Supporter
                          </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="bg-white/10" />
                        
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-xs text-muted-foreground py-1">Change Status</DropdownMenuLabel>
                          {user.status === "active" || !user.status ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")} className="text-yellow-500">
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")} className="text-green-500">
                              Activate User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                        
                        <DropdownMenuSeparator className="bg-white/10" />
                        
                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-500">
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
