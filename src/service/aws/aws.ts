"use server";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type FetchCertType = {
  cert_name: string;
  image: string;
};

type CertType = {
  name: string;
  url: string;
};

export type FlashcardType = {
  id: string;
  question: string;
  answer: string;
};

type CertSectionType = {
  section_name: string;
  flashcards: FlashcardType[];
};

const parseCert = (cert: string) => {
  return { name: cert.replace(/-/g, " "), url: cert };
};

async function parseResponse<T>(response: Response): Promise<T> {
  const buffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  const textDecoder = new TextDecoder();
  const jsonStr = textDecoder.decode(uint8Array);
  return JSON.parse(jsonStr) as T;
}
async function makeFetchRequest({
  method,
  path,
}: {
  method: MethodType;
  path: string;
}) {
  const awsURL = process.env.AWS_GATEWAY_ENDPOINT;

  if (!awsURL) {
    throw new Error("AWS_GATEWAY_ENDPOINT not set");
  }

  const res = await fetch(`${awsURL}${path ? `/${path}` : ""}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}

export async function getCerts(): Promise<CertType[]> {
  const prefix = "certs";

  try {
    const response = await makeFetchRequest({
      method: "GET",
      path: prefix,
    });
    const result = await parseResponse<FetchCertType[]>(response);
    return result.map((cert) => {
      return parseCert(cert.cert_name);
    });
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
}

export async function getFlashcards({
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
  const result = await parseResponse<CertSectionType[]>(response);

  // TODO handle this filtering in AWS
  const certSection = result.filter((item) => {
    return item.section_name === section;
  });

  if (!certSection[0]) {
    return [];
  }

  return certSection[0].flashcards;
}

export async function getCertSections({ cert }: { cert: string }) {
  const prefix = "flashcards";

  const response = await makeFetchRequest({
    method: "GET",
    path: `${prefix}/${cert}`,
  });

  const result = await parseResponse<CertSectionType[]>(response);
  const sections = result.map((section) => {
    return section.section_name;
  });

  return sections;
}
