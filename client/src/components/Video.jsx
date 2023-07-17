import { useEffect, useRef } from "react";

export const Video = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <div>
        <video
          style={{ borderRadius: 10 }}
          ref={videoRef}
          muted
          width="100%"
          autoPlay={true}
          playsInline={true}
        />
      </div>
    </div>
  );
};
