"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/component/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "~/component/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/component/ui/select";
import { getCertSections } from "~/service/aws/aws";

type SelectCardProps = {
  certs: { name: string; url: string }[];
};

export function SelectCard({ certs }: SelectCardProps) {
  const [sections, setSections] = useState<string[]>([]);
  const [cert, setCert] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const router = useRouter();

  const handleCertChange = async (value: string) => {
    setCert(value);
    setSections(await getCertSections({ cert: value }));
  };

  const handleSectionChange = async (value: string) => {
    setSection(value);
  };

  const handleStart = () => {
    router.push(`/${cert}/${section}`);
  };

  return (
    <Card className="w-full lg:w-2/3">
      <CardHeader>
        <CardTitle>AWS Flashcards</CardTitle>
        <CardDescription>
          Test your knowledge for certification exams
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select onValueChange={handleCertChange} value={cert}>
          <SelectTrigger className="w-full capitalize">
            <SelectValue placeholder="Select a Certification" />
          </SelectTrigger>
          <SelectContent>
            {certs.map((cert) => (
              <SelectItem
                key={cert.url}
                value={cert.url}
                className="capitalize"
              >
                {cert.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          disabled={!cert || !sections.length}
          onValueChange={handleSectionChange}
          value={section}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleStart}
          disabled={!cert || !section}
          className="mt-4 self-start bg-white text-secondary-foreground"
          size="sm"
        >
          Start
        </Button>
      </CardContent>
    </Card>
  );
}
