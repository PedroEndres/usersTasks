import {
  Badge,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";

import { ROLES } from "@/constants";
import { AuthContext } from "@/context/auth";
import { getUsers } from "@/services/users";
import { TrashIcon, UploadIcon } from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export const UsersList = () => {
  const [, setLocation] = useLocation();

  const { state } = useContext(AuthContext);
  const {
    user: { roles },
  } = state;

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  if (isError) toast.error("Error getting users");

  return (
    <Card className="w-full max-w-xl m-auto card-container">
      <Title className="table-container">
        Users
        <Badge className="ml-2">{users?.length}</Badge>
      </Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
              <TableHeaderCell className="text-center table-container">
                Id
              </TableHeaderCell>
            )}
            <TableHeaderCell className="text-center table-container">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="text-center table-container">
              Username
            </TableHeaderCell>
            {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
              <TableHeaderCell className="text-center table-container">
                Actions
              </TableHeaderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            !users?.length && (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No users
                </TableCell>
              </TableRow>
            )
          )}
          {users?.map((user) => (
            <TableRow key={user.id}>
              {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
                <TableCell className="text-center table-container">
                  {user.id}
                </TableCell>
              )}
              <TableCell className="text-center table-container">
                {user.name}
              </TableCell>
              <TableCell className="text-center table-container">
                {user.userName}
              </TableCell>
              {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
                <TableCell className="text-center">
                  <button
                    className="mr-1 hover:cursor-pointer hover:opacity-75"
                    onClick={() => setLocation(`/users/${user.id}`)}
                  >
                    <Icon
                      icon={UploadIcon}
                      color="blue"
                      title="Update"
                      tooltip={`Update ${user.name}`}
                    />
                  </button>
                  {roles.includes(ROLES.ADMIN) && (
                    <button className="hover:cursor-pointer hover:opacity-75">
                      <Icon
                        icon={TrashIcon}
                        color="red"
                        title="Delete"
                        tooltip={`Delete ${user.name}`}
                      />
                    </button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
