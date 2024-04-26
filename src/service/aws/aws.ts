type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type CertType = {
  cert_name: string;
  image: string;
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

async function parseResponse<T>(response: Response): Promise<T> {
  const buffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  const textDecoder = new TextDecoder();
  const jsonStr = textDecoder.decode(uint8Array);
  return JSON.parse(jsonStr) as T;
}
export class AwsService {
  private async makeFetchRequest({
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

  public async getCerts(): Promise<CertType[]> {
    const prefix = "certs";

    try {
      const response = await this.makeFetchRequest({
        method: "GET",
        path: prefix,
      });
      const result = await parseResponse<CertType[]>(response);
      return result;
    } catch (error) {
      console.error("error: ", error);
      return [];
    }
  }

  public async getFlashcards({
    cert,
    section,
  }: {
    cert: string;
    section: string;
  }) {
    const prefix = "flashcards";

    const response = await this.makeFetchRequest({
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

  public async getCertSections({ cert }: { cert: string }) {
    const prefix = "flashcards";

    const response = await this.makeFetchRequest({
      method: "GET",
      path: `${prefix}/${cert}`,
    });

    const result = await parseResponse<CertSectionType[]>(response);
    const sections = result.map((section) => {
      return section.section_name;
    });

    return sections;
  }
}
