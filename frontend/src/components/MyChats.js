import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems={"center"}
      p={3}
      bg={"white"}
      width={{ base: "100%", md: "30%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        width={"100%"}
        height={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
  <Stack overflowY="scroll">
    {chats.map((chat) => {
      if (!chat || typeof chat.isGroupChat === "undefined") return null; // ADD THIS CHECK
      const senderName = !chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName;

      // Skip rendering if senderName is null (indicating a deleted or missing user)
      if (!chat.isGroupChat && !senderName) {
        return null;  // Return null to skip rendering this chat
      }

      return (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor="pointer"
          bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
          color={selectedChat === chat ? "white" : "black"}
          px={3}
          py={2}
          borderRadius="lg"
          key={chat._id}
        >
          <Text>{senderName}</Text>
        </Box>
      );
    })}
  </Stack>
) : (
  <ChatLoading />
)}
      </Box>
    </Box>
  );
};

export default MyChats;
