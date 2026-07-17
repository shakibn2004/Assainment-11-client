"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Shield, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const initialUsers = [
  {
    id: "USR-001",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Creator",
    joined: "Mar 12, 2026",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    id: "USR-002",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "Supporter",
    joined: "Apr 05, 2026",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: "USR-003",
    name: "TechNova Inc.",
    email: "contact@technova.io",
    role: "Creator",
    joined: "Jan 22, 2026",
    status: "Suspended",
    avatar: ""
  },
  {
    id: "USR-004",
    name: "Marcus Aurelius",
    email: "admin@fundbridge.com",
    role: "Admin",
    joined: "Jan 01, 2026",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d"
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    toast.success(`Role updated to ${newRole}`);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

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
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      {user.role === 'Admin' ? <Shield className="w-3.5 h-3.5 text-primary" /> : <UserIcon className="w-3.5 h-3.5" />}
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-sm">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`
                      ${user.status === 'Active' ? 'border-green-500/50 text-green-500' : ''}
                      ${user.status === 'Suspended' ? 'border-red-500/50 text-red-500' : ''}
                    `}>
                      {user.status}
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
                          <DropdownMenuItem onClick={() => handleRoleChange(user.id, "Admin")}>
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(user.id, "Creator")}>
                            Make Creator
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoleChange(user.id, "Supporter")}>
                            Make Supporter
                          </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="bg-white/10" />
                        
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="text-xs text-muted-foreground py-1">Change Status</DropdownMenuLabel>
                          {user.status === "Active" ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "Suspended")} className="text-yellow-500">
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "Active")} className="text-green-500">
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
