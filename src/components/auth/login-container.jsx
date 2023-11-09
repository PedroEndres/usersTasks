import { Flex, Tab, TabGroup, TabPanel, TabPanels } from "@tremor/react";

import { CreateUser } from "@/components/user/create-user";
import { Login } from "@/components/auth/login";
import { UserGroupIcon, UserIcon } from "@heroicons/react/solid";

export const LoginContainer = () => {
  return (
    <section className="login-container">
      <Flex className="justify-between items-center"></Flex>
      <TabGroup>
        <div className="icono-login-container">
          <Tab icon={UserGroupIcon} className="button-login">
            Login
          </Tab>
          <Tab icon={UserIcon} className="button-login">
            Create user
          </Tab>
        </div>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <CreateUser />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
};
