import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
}

interface ModuleProps {
  item: ContentItem;
}

const Module: React.FC<ModuleProps> = ({ item }) => {
  return (
    <Card className="mb-4 cursor-pointer">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{item.description}</p>
      </CardContent>
    </Card>
  );
};

export default Module;
