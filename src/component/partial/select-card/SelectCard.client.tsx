"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/component/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/component/ui/select";
import { type GetCertsType } from "~/service/aws/types";

type SelectCardProps = {
  certs: GetCertsType[];
  cert?: string;
};

export function SelectCardClient({ certs, cert }: SelectCardProps) {
  const [section, setSection] = useState<string>("");
  const router = useRouter();

  const activeCert = certs.find((c) => c.cert_id === cert);

  const handleCertChange = async (value: string) => {
    router.push(`/${value}`);
  };

  const handleSectionChange = async (value: string) => {
    setSection(value);
  };

  const handleStart = () => {
    router.push(`/${cert}/${section}`);
  };

  return (
    <>
      <Select onValueChange={handleCertChange} value={cert}>
        <SelectTrigger className="w-full capitalize">
          <SelectValue placeholder="Select a Certification" />
        </SelectTrigger>
        <SelectContent>
          {certs.map((cert) => (
            <SelectItem
              key={cert.cert_id}
              value={cert.cert_id}
              className="cursor-pointer capitalize"
            >
              {cert.cert_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        disabled={!cert || !activeCert?.sections?.length}
        onValueChange={handleSectionChange}
        value={section}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Section" />
        </SelectTrigger>
        <SelectContent>
          {activeCert?.sections.map(({ section_name }) => (
            <SelectItem
              key={section_name}
              value={section_name}
              className="cursor-pointer"
            >
              {section_name}
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
    </>
  );
}
