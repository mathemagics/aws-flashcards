import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "~/component/ui/card";

import { SelectCardClient } from "./SelectCard.client";
import { type GetCertsType } from "~/service/aws/types";

type SelectCardProps = {
  certs: GetCertsType[];
  cert?: string;
};

export function SelectCard({ certs, cert }: SelectCardProps) {
  return (
    <Card className="w-full lg:w-2/3">
      <CardHeader>
        <CardTitle>AWS Flashcards</CardTitle>
        <CardDescription>
          Test your knowledge for certification exams
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <SelectCardClient certs={certs} cert={cert} />
      </CardContent>
    </Card>
  );
}
