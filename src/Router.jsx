import { LoginContainer } from "@/components/auth/login-container";
import { MessageCard } from "@/components/message-card";
import { UpdateUser } from "@/components/user/update-user";
import { UsersList } from "@/components/user/user-list";
import { PostContainer } from "@/components/post/post-container";
import { UpdatePost } from "@/components/post/update-post";
import { ROLES } from "@/constants";
import { AuthContext } from "@/context/auth";
import { LogoutIcon } from "@heroicons/react/outline";
import { Button } from "@tremor/react";
import { useContext } from "react";
import { Route, Switch } from "wouter";
// import { DeployTodo } from "./components/todo/deploy-todo";

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
          <LoginContainer />
        )}
      </Route>
      {isAuthenticated && <Route path="/users" component={UsersList} />}
      {isAuthenticated && user.roles.includes(ROLES.ADMIN) && (
        <Route path="/users/:id" component={UpdateUser} />
      )}
      <Route>
        {isAuthenticated && <Route path="/posts" component={PostContainer} />}

        <Route path="/posts/:id" component={UpdatePost} />

        {/* <DeployTodo /> */}
      </Route>
    </Switch>
  );
};
