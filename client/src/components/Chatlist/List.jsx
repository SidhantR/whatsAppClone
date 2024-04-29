import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACT_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatListItem from "./ChatListItem";

const List = () => {
  
  const [{ userInfo, userContacts, filteredContacts }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios(`${GET_INITIAL_CONTACT_ROUTE}/${userInfo.id}`);
        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
        dispatch({
          type: reducerCases.SET_USERS_CONTACTS,
          userContacts: users,
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (userInfo?.id) {
      getContacts();
    }
  }, [userInfo]);

  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto max0h-full custom-scrollbar ">
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id} />
          ))
        : userContacts.map((contact) => (
            <ChatListItem data={contact} key={contact.id} />
          ))}
    </div>
  );
};

export default List;
