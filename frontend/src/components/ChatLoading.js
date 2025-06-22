import React from "react";
import { Skeleton } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/layout";

const ChatLoading = () => {
  return (
    <div>
      <Stack>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    </div>
  );
};

export default ChatLoading;
