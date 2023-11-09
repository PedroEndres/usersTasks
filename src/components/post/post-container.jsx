import {
  Button,
  Card,
  Flex,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from "@tremor/react";

import { CreatePost } from "@/components/post/create-post";
import { PostList } from "@/components/post/post-list";

import { ArrowLeftIcon, UserGroupIcon, UserIcon } from "@heroicons/react/solid";

import { useLocation } from "wouter";

export const PostContainer = () => {
  const [, setLocation] = useLocation();

  return (
    <Card className="w-auto max-w-xl m-auto box-border">
      <Flex className="justify-between items-center">
        <Title>Tasks Dashboard</Title>
        <Button
          onClick={() => setLocation("/")}
          icon={ArrowLeftIcon}
          variant="light"
        >
          Volver
        </Button>
      </Flex>
      <TabGroup>
        <TabList className="mt-8">
          <Tab icon={UserGroupIcon}>List of Tasks</Tab>
          <Tab icon={UserIcon}>Add Task</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PostList />
          </TabPanel>
          <TabPanel>
            <CreatePost />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
