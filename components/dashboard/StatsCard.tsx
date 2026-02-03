import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <Card>
      <CardHeader className="text-sm text-muted-foreground">
        {title}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
