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

type BreadcrumbsProps = {
  section?: string;
  sections?: string[];
  cert?: { name: string; url: string };
  className?: string;
};

const certs = [{ name: "developer associate", url: "developer-associate" }];

export function Breadcrumbs({
  section,
  cert,
  sections,
  className,
}: BreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize text-neutral-50">
              {cert?.name ?? "Certifications"}
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {certs.map((cert) => (
                <DropdownMenuItem key={cert.url}>
                  <BreadcrumbLink href={`/${cert.url}`} className="capitalize">
                    {cert.name}
                  </BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        {cert && sections && (
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
                <DropdownMenuContent align="start">
                  {sections.map((section) => (
                    <DropdownMenuItem key={section}>
                      <BreadcrumbLink href={`/${cert.url}/${section}`}>
                        {section}
                      </BreadcrumbLink>
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
