import { string } from "zod";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";
// eslint-disable-next-line @typescript-eslint/no-explicit-any

type Cert = {
  cert_id: {S: string};
  image: {S: string};
};

type CertSection = {
  cert_id: {S: string};
  section_id: {S: string};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Flashcard = Record<string, string> & Record<Exclude<keyof any, string>, never>;

export class AwsService {
  private async makeFetchRequest({method, path}: {method: MethodType, path: string}) {
    const awsURL = process.env.AWS_GATEWAY_ENDPOINT;

    if (!awsURL) {
      throw new Error("AWS_GATEWAY_ENDPOINT not set");
    }

    const res = await fetch(
      `${awsURL}${path ? `/${path}` : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res;
  }

  public async getCertSections({key}: {key: string}) {
    'use server';

    const prefix = "flashcards";

    const response = await this.makeFetchRequest({
      method: "GET",
      path: `${prefix}/${key}`,
    });

    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    const textDecoder = new TextDecoder();
    const jsonStr = textDecoder.decode(uint8Array);

    const json = JSON.parse(jsonStr) as {Items: CertSection[]};

    const sections = json.Items.map((item) => {
      return item.section_id?.S;
    });

    return sections;
  }

  public async getCerts(): Promise<Cert[]> {
    'use server';

    const prefix = "certs";

    try {
      const response = await this.makeFetchRequest({
        method: "GET",
        path: prefix,
      })

      if(!response.status.toString().startsWith('2')) {
        return [];
      }

      const buffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      const textDecoder = new TextDecoder();
      const jsonStr = textDecoder.decode(uint8Array);

      const json = JSON.parse(jsonStr) as {Items: Cert[]};
      return json.Items;

    } catch (error) {
      console.error('error: ', error);
      return [];
    }
  }
}