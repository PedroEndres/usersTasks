import { Login } from "@/components/auth/login";
import { MessageCard } from "@/components/message-card";
import { UpdateUser } from "@/components/user/update-user";
import { UserContainer } from "@/components/user/user-container";
import { ROLES } from "@/constants";
import { AuthContext } from "@/context/auth";
import { LogoutIcon } from "@heroicons/react/outline";
import { Button } from "@tremor/react";
import { useContext } from "react";
import { Route, Switch } from "wouter";
import { DeployTodo } from "./components/todo/deploy-todo";

export const Router = () => {
  const { state, handleLogout } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  return (
    <Switch>
      <Route path="/">
        {isAuthenticated ? (
          <MessageCard message={`Welcome ${user.name}`}>
            <Button onClick={handleLogout} icon={LogoutIcon}>
              Logout
            </Button>
          </MessageCard>
        ) : (
          <Login />
        )}
      </Route>
      {isAuthenticated && <Route path="/users" component={UserContainer} />}
      {isAuthenticated && user.roles.includes(ROLES.ADMIN) && (
        <Route path="/users/:id" component={UpdateUser} />
      )}
      <Route path="/tasks">
        <DeployTodo />
      </Route>
    </Switch>
  );
};
