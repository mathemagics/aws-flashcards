import { ChevronDownIcon, SlashIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/component/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/component/ui/dropdown-menu";
import { type GetCertsType } from "~/service/aws/types";

type BreadcrumbsProps = {
  section?: string;
  sections?: string[];
  cert?: GetCertsType;
  className?: string;
  certs: GetCertsType[];
};

export function Breadcrumbs({
  section,
  cert,
  className,
  certs,
}: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">AWS Flashcards</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block">
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize text-neutral-50">
              {cert?.cert_name ?? "Certifications"}
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[300px]">
              {certs.map((cert) => (
                <DropdownMenuItem key={cert.cert_id}>
                  <a href={`/${cert.cert_id}`} className="w-full capitalize">
                    {cert.cert_name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        {cert?.sections && (
          <>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-neutral-50">
                  {section ?? "Sections"}
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="scrollbar max-h-[312px] overflow-y-scroll"
                >
                  {cert.sections.map(({ section_name }) => (
                    <DropdownMenuItem key={section_name}>
                      <a
                        href={`/${cert.cert_id}/${section_name}`}
                        className="w-full"
                      >
                        {section_name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
