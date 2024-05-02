"use server";

import { parseResponse } from "./util";
import { type MethodType, type GetCertType, type GetCertsType } from "./types";

async function makeFetchRequest({
  method,
  path,
}: {
  method: MethodType;
  path: string;
}) {
  const awsURL = process.env.AWS_GATEWAY_ENDPOINT;

  const res = await fetch(`${awsURL}${path ? `/${path}` : ""}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getCerts() {
  const prefix = "certs";

  try {
    const response = await makeFetchRequest({
      method: "GET",
      path: prefix,
    });
    const result = await parseResponse<GetCertsType[]>(response);
    const sortedSections = result.map((cert) => {
      return {
        ...cert,
        sections: cert.sections.sort((a, b) =>
          a.section_name.localeCompare(b.section_name),
        ),
      };
    });
    return sortedSections;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
}

export async function getCert({
  cert,
  section,
}: {
  cert: string;
  section: string;
}) {
  const prefix = "flashcards";

  const response = await makeFetchRequest({
    method: "GET",
    path: `${prefix}/${cert}`,
  });

  const result = await parseResponse<GetCertType[]>(response);

  const certSection = result.find((item) => {
    return item.section_name === section;
  });

  return certSection;
}
