import ContentUpload from "@/components/content-upload";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <Container>
      <div className="py-6">
        <ContentUpload />
      </div>
    </Container>
  );
}
