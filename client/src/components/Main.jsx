import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatList from "./Chatlist/ChatList.jsx";
import Empty from "./Empty.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig.js";
import {
  CHECK_USER_ROUTE,
  GET_MESSAGES_ROUTE,
  HOST,
} from "../utils/ApiRoutes.js";
import { useRouter } from "next/router.js";
import { useStateProvider } from "@/context/StateContext.js";
import { reducerCases } from "@/context/constants.js";
import Chat from "./Chat/Chat.jsx";
import { io } from "socket.io-client";
import SearchMessages from "./Chat/SearchMessages.jsx";
import VideoCall from "./Call/VideoCall.jsx";
import VoiceCall from "./Call/VoiceCall.jsx";
import IncomingVideoCall from "./common/IncomingVideoCall.jsx";
import IncomingVoiceCall from "./common/IncomingVoiceCall.jsx";

const Main = () => {
  const socket = useRef();
  const router = useRouter();
  const [
    {
      userInfo,
      currentChatUser,
      messagesSearch,
      videoCall,
      voiceCall,
      incomingVoiceCall,
      incomingVideoCall,
    },
    dispatch,
  ] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false);

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  //run whenever page load
  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });
      if (!data.status) {
        router.push("/login");
      }
      if (data?.data) {
        const {
          id,
          name,
          email,
          profilePicture: profileImage,
          status,
        } = data.data;
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: { id, name, email, profileImage, status },
        });
      }
    }
  });

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !setSocketEvent) {
      socket.current.on("msg-recieve", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });

      socket.current.on("incoming-voice-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          incomingVoiceCall:{...from, roomId, callType},
        });
      });

      socket.current.on("incoming-video-call", ({from, roomId, callType}) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          incomingVideoCall: {...from, callType, roomId}
        })
      })

      socket.current.on("voice-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL
        })
      })

      socket.current.on("video-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL
        })
      })

      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`
      );
      dispatch({ type: reducerCases.SET_MESSAGES, messages });
    };
    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser]);

  return (
    <>
      {incomingVideoCall && <IncomingVideoCall />}
      {incomingVoiceCall && <IncomingVoiceCall />}
      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden ">
          <VideoCall />
        </div>
      )}
      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}
      {!videoCall && !voiceCall && (
        <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden ">
          <ChatList />
          {currentChatUser ? (
            <div
              className={messagesSearch ? "grid grid-cols-2 " : "grid-cols-2"}
            >
              <Chat />
              {messagesSearch && <SearchMessages />}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      )}
    </>
  );
};

export default Main;
