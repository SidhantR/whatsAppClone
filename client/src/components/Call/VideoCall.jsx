import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const Container = dynamic(() => import("./Container"), { ssr: false });

const VideoCall = () => {
  const [{ videoCall, socket, userInfo }] = useStateProvider();

  useEffect(() => {
    if (videoCall.type === "out-going") {
        console.log(userInfo, 'userInfo')
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.profileImage,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  console.log(videoCall, 'videoCall')

  return <Container data={videoCall} />;
};

export default VideoCall;
