"use client";

import Container from "@/components/ui/container";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    // Ensure id is a string before using it
    const videoId = Array.isArray(id) ? id[0] : id; // Handle string[] or string

    if (videoId) {
      const storedContent = JSON.parse(localStorage.getItem("content") || "[]");
      const selectedVideo = storedContent.find(
        (item: any) => item.id === parseInt(videoId)
      );

      console.log("Selected video:", selectedVideo);

      if (selectedVideo) {
        setVideo(selectedVideo);
      } else {
        console.error("No video found with ID:", videoId);
      }
    }
  }, [id]);

  return (
    <Container>
      {video ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
          <p className="mb-4">{video.description}</p>
          {video.video ? (
            <video
              src={video.video}
              controls
              className="w-full max-w-lg rounded-lg"
            />
          ) : (
            <p>No video available</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default VideoPage;
