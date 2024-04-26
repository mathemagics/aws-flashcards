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
  section: string;
  sections: string[];
  cert: { name: string; url: string };
};

export function Breadcrumbs({ section, cert, sections }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="absolute">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="capitalize">
          <BreadcrumbLink href={`/certs/${cert.url}`}>
            {cert.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-neutral-50">
              {section}
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {sections.map((section) => (
                <DropdownMenuItem key={section}>
                  <BreadcrumbLink href={`/certs/${cert.url}/${section}`}>
                    {section}
                  </BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
