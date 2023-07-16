/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
export const Video = ({ stream, tracks }) => {
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef && videoRef.current) {
      if (stream) {
        videoRef.current.srcObject = stream;
      } else if (tracks.length > 0) {
        // Create a new MediaStream with all remote tracks
        const remoteStream = new MediaStream(tracks);
        videoRef.current.srcObject = remoteStream;
      }
    }
  }, [videoRef, tracks])

  return (
    <div>
      <div>
        <video style={{ borderRadius: 10 }} ref={videoRef} muted width="100%" autoPlay={true} playsInline={true} />
      </div>
    </div>
  )
}