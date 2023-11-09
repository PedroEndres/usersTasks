import { Card, Flex } from "@tremor/react";
import { useContext } from "react";

import { Link } from "wouter";
import { AuthContext } from "../context/auth";

export const NavBar = () => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;
  return (
    <Card className="w-full mb-7 rounded-none">
      <Flex className="justify-evenly text-white">
        <div>
          <Link to="/" className="hover:opacity-70">
            Home
          </Link>
        </div>
        {isAuthenticated && (
          <>
            <div>
              <Link to="/users" className="hover:opacity-70">
                Users
              </Link>
            </div>
            <div>
              <Link to="/posts" className="hover:opacity-70">
                Tasks
              </Link>
            </div>
          </>
        )}
      </Flex>
    </Card>
  );
};
