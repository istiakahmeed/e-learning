"use client";
import Container from "@/components/ui/container";
import Link from "next/link";
import { useEffect, useState } from "react";
import Module from "./components/module";

const ModulePage = () => {
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem("content") || "[]");
    setContent(storedContent);
  }, []);

  return (
    <Container>
      <div className="flex py-6 flex-col gap-2">
        <h1 className="text-3xl font-bold py-2">Video Module</h1>
        <div className="w-2/3">
          {content.map((item) => (
            <Link
              key={item.id}
              href={`/video/${item.id}`}
              passHref
              className="block mb-4">
              <Module item={item} />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ModulePage;
