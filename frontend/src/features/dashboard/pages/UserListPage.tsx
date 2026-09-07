import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  UserRound,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type UserRole = "USER" | "ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

interface UserListProps {
  users?: AdminUser[];

  onViewUser?: (user: AdminUser) => void;

  onEditUser?: (user: AdminUser) => void;

  onDeleteUser?: (user: AdminUser) => void;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function UserListPage({
  users = [],
  onViewUser,
  onEditUser,
  onDeleteUser,
}: UserListProps) {
  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");

  const [statusFilter, setStatusFilter] = useState<UserStatus | "ALL">("ALL");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  /* ------------------------------------------------------------------------ */
  /* Filtering                                                                */
  /* ------------------------------------------------------------------------ */

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.phone?.toLowerCase().includes(searchValue);

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  /* ------------------------------------------------------------------------ */
  /* Pagination                                                               */
  /* ------------------------------------------------------------------------ */

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  const currentPage = Math.min(page, totalPages);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleFilter = (value: UserRole | "ALL") => {
    setRoleFilter(value);
    setPage(1);
  };

  const handleStatusFilter = (value: UserStatus | "ALL") => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Users</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage registered users and administrators.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserRound className="size-4" />

            <span>{filteredUsers.length} users</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              className="pl-9"
            />
          </div>

          {/* Role */}
          <Select
            value={roleFilter}
            onValueChange={(value) =>
              handleRoleFilter(value as UserRole | "ALL")
            }
          >
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>

              <SelectItem value="USER">User</SelectItem>

              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              handleStatusFilter(value as UserStatus | "ALL")
            }
          >
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>

              <SelectItem value="ACTIVE">Active</SelectItem>

              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {paginatedUsers.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* ---------------------------------------------------------------- */}
            {/* Desktop table                                                     */}
            {/* ---------------------------------------------------------------- */}

            <div className="hidden overflow-x-auto md:block">
              <div className="min-w-[850px]">
                {/* Table header */}
                <div className="grid grid-cols-[1.5fr_1.7fr_1fr_1fr_1fr_48px] items-center gap-4 border-b px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span>User</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Status</span>
                  <span>Joined</span>
                  <span />
                </div>

                {/* Rows */}
                {paginatedUsers.map((user) => (
                  <DesktopUserRow
                    key={user.id}
                    user={user}
                    onView={() => onViewUser?.(user)}
                    onEdit={() => onEditUser?.(user)}
                    onDelete={() => onDeleteUser?.(user)}
                  />
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Mobile cards                                                      */}
            {/* ---------------------------------------------------------------- */}

            <div className="space-y-3 md:hidden">
              {paginatedUsers.map((user) => (
                <MobileUserCard
                  key={user.id}
                  user={user}
                  onView={() => onViewUser?.(user)}
                  onEdit={() => onEditUser?.(user)}
                  onDelete={() => onDeleteUser?.(user)}
                />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {Math.min(
                  (currentPage - 1) * pageSize + 1,
                  filteredUsers.length,
                )}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {Math.min(currentPage * pageSize, filteredUsers.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filteredUsers.length}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>

              <span className="min-w-20 text-center text-sm">
                Page {currentPage} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop Row                                                                */
/* -------------------------------------------------------------------------- */

interface UserRowProps {
  user: AdminUser;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function DesktopUserRow({ user, onView, onEdit, onDelete }: UserRowProps) {
  return (
    <div className="grid grid-cols-[1.5fr_1.7fr_1fr_1fr_1fr_48px] items-center gap-4 border-b px-4 py-4 last:border-b-0">
      {/* User */}
      <UserIdentity user={user} />

      {/* Email */}
      <div className="min-w-0">
        <p className="truncate text-sm">{user.email}</p>

        {user.phone && (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {user.phone}
          </p>
        )}
      </div>

      {/* Role */}
      <UserRoleBadge role={user.role} />

      {/* Status */}
      <UserStatusBadge status={user.status} />

      {/* Created */}
      <p className="text-sm text-muted-foreground">
        {formatDate(user.createdAt)}
      </p>

      {/* Actions */}
      <UserActions
        user={user}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Card                                                                */
/* -------------------------------------------------------------------------- */

function MobileUserCard({ user, onView, onEdit, onDelete }: UserRowProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <UserIdentity user={user} />

        <UserActions
          user={user}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Email</p>

          <p className="mt-1 break-all text-sm">{user.email}</p>
        </div>

        {user.phone && (
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>

            <p className="mt-1 text-sm">{user.phone}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <UserRoleBadge role={user.role} />

          <UserStatusBadge status={user.status} />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Joined</p>

          <p className="mt-1 text-sm">{formatDate(user.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* User Identity                                                              */
/* -------------------------------------------------------------------------- */

function UserIdentity({ user }: { user: AdminUser }) {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-semibold">
        {initial}
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium">{user.name}</p>

        <p className="truncate text-xs text-muted-foreground">ID: {user.id}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Role Badge                                                                 */
/* -------------------------------------------------------------------------- */

function UserRoleBadge({ role }: { role: UserRole }) {
  if (role === "ADMIN") {
    return (
      <Badge variant="secondary" className="gap-1">
        <ShieldCheck className="size-3" />
        Admin
      </Badge>
    );
  }

  return <Badge variant="outline">User</Badge>;
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function UserStatusBadge({ status }: { status: UserStatus }) {
  if (status === "ACTIVE") {
    return (
      <Badge
        variant="secondary"
        className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
      >
        Active
      </Badge>
    );
  }

  return <Badge variant="destructive">Inactive</Badge>;
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

function UserActions({
  onView,
  onEdit,
  onDelete,
}: {
  user: AdminUser;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-4" />

          <span className="sr-only">User actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>View User</DropdownMenuItem>

        <DropdownMenuItem onClick={onEdit}>Edit User</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={onDelete}
        >
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-lg border border-dashed">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <UserRound className="size-5 text-muted-foreground" />
      </div>

      <h3 className="mt-4 font-semibold">No users found</h3>

      <p className="mt-1 text-center text-sm text-muted-foreground">
        There are no users matching your filters.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
