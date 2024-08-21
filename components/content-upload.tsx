"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ContentUpload() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [video, setVideo] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<string[]>([]);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const videoUrl = URL.createObjectURL(file); // Create Blob URL
      setVideo(videoUrl); // Set video URL
    }
  };

  const handleSubmit = async () => {
    const newErrors: string[] = [];

    if (!title) newErrors.push("Title is required.");
    if (!description) newErrors.push("Description is required.");
    if (!video)
      newErrors.push("At least one media file (image or video) is required.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors([]);

    const formData = {
      title,
      description,
      image: imagePreview,
      video: videoPreview,
    };

    try {
      const response = await fetch("/api/savecontent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result.message); // Handle success message or further processing

      // Navigate to another page
      router.push("/module");

      // Clear form fields
      setTitle("");
      setDescription("");
      setVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
    } catch (error) {
      console.error("Error:", error);
      setErrors(["An error occurred while saving the content."]);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-4">
      <CardHeader>
        <CardTitle>Create New Content</CardTitle>
        <CardDescription>
          Fill out the form below to add a new item to your content library.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {errors.length > 0 && (
          <div className="mb-4">
            <ul className="list-disc list-inside text-red-500">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Provide a description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Media</Label>
          <div className="grid gap-4">
            <div className="relative flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-muted transition-colors hover:border-primary">
              <Input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              {videoPreview ? (
                <video
                  src={videoPreview}
                  controls
                  className="object-cover h-full w-full rounded-lg"
                />
              ) : (
                <div className="text-center space-y-1 text-muted-foreground">
                  <div className="mx-auto h-8 w-8" />
                  <p className="text-sm font-medium">
                    Drag and drop your video here
                  </p>
                  <p className="text-xs">
                    or <span className="font-medium">browse</span> to upload
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" onClick={handleSubmit}>
          Create Content
        </Button>
      </CardFooter>
    </Card>
  );
}
