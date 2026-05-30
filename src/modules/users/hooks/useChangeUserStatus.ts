"use client";

import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";
import type {
  BulkUserStatusAction,
  ManagedUser,
  UserStatusAction,
} from "../types/user-management.types";
import { statusFromUserStatusAction } from "../utils/user-status-action";

interface ChangeStatusVariables {
  id: string;
  action: UserStatusAction;
}

interface BulkChangeStatusVariables {
  ids: string[];
  action: BulkUserStatusAction;
}

function patchUserInList(
  data: PaginatedResponse<ManagedUser> | undefined,
  userId: string,
  status: ManagedUser["status"],
): PaginatedResponse<ManagedUser> | undefined {
  if (!data) return data;
  return {
    ...data,
    data: data.data.map((row) =>
      row.id === userId ? { ...row, status } : row,
    ),
  };
}

function patchUsersInList(
  data: PaginatedResponse<ManagedUser> | undefined,
  userIds: Set<string>,
  status: ManagedUser["status"],
): PaginatedResponse<ManagedUser> | undefined {
  if (!data) return data;
  return {
    ...data,
    data: data.data.map((row) =>
      userIds.has(row.id) ? { ...row, status } : row,
    ),
  };
}

export function useChangeUserStatus() {
  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: ({ id, action }: ChangeStatusVariables) =>
      userService.changeStatus(id, action),
    onMutate: async ({ id, action }) => {
      await queryClient.cancelQueries({ queryKey: usersQueryKeys.all });
      const nextStatus = statusFromUserStatusAction(action);
      const listSnapshots = queryClient.getQueriesData<
        PaginatedResponse<ManagedUser>
      >({ queryKey: usersQueryKeys.all });
      const detailSnapshot = queryClient.getQueryData(
        usersQueryKeys.detail(id),
      );

      listSnapshots.forEach(([key, data]) => {
        queryClient.setQueryData(
          key as QueryKey,
          patchUserInList(data, id, nextStatus),
        );
      });

      queryClient.setQueryData(usersQueryKeys.detail(id), (current: unknown) => {
        if (
          typeof current !== "object" ||
          current === null ||
          !("data" in current)
        ) {
          return current;
        }
        const response = current as { data: ManagedUser & { account?: unknown } };
        return {
          ...response,
          data: { ...response.data, status: nextStatus },
        };
      });

      return { listSnapshots, detailSnapshot };
    },
    onError: (_error, { id }, context) => {
      context?.listSnapshots.forEach(([key, data]) => {
        queryClient.setQueryData(key as QueryKey, data);
      });
      if (context?.detailSnapshot !== undefined) {
        queryClient.setQueryData(usersQueryKeys.detail(id), context.detailSnapshot);
      }
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: usersQueryKeys.activity(variables.id),
      });
    },
  });

  const bulkChangeStatus = useMutation({
    mutationFn: ({ ids, action }: BulkChangeStatusVariables) =>
      userService.bulkUpdateStatus(ids, action),
    onMutate: async ({ ids, action }) => {
      await queryClient.cancelQueries({ queryKey: usersQueryKeys.all });
      const nextStatus = statusFromUserStatusAction(action);
      const idSet = new Set(ids);
      const listSnapshots = queryClient.getQueriesData<
        PaginatedResponse<ManagedUser>
      >({ queryKey: usersQueryKeys.all });

      listSnapshots.forEach(([key, data]) => {
        queryClient.setQueryData(
          key as QueryKey,
          patchUsersInList(data, idSet, nextStatus),
        );
      });

      return { listSnapshots };
    },
    onError: (_error, _variables, context) => {
      context?.listSnapshots.forEach(([key, data]) => {
        queryClient.setQueryData(key as QueryKey, data);
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
    },
  });

  return { changeStatus, bulkChangeStatus };
}

export function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}
