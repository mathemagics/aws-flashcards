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
  flashcards: {S: Flashcard[]};
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

  public async getFlashcards({cert, section}: {cert:string; section:string}): Promise<{q: string; a:string}[]> {
    const prefix = "flashcards";

    const response = await this.makeFetchRequest({
      method: "GET",
      path: `${prefix}/${cert}`,
    });

    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    const textDecoder = new TextDecoder();
    const jsonStr = textDecoder.decode(uint8Array);

    const json = JSON.parse(jsonStr) as {Items: CertSection[]};

    const certSection = json.Items.filter((item) => {
      return item.section_id?.S === section;
    });

    if(certSection.length === 0) {
      return [];
    }
    console.log(certSection[0]?.flashcards?.S);

    const flashcardsArray = JSON.parse(certSection[0]?.flashcards?.S) as Flashcard[];
    const flashcards = flashcardsArray.map((item) => {
      const flashcardObj: {q:string, a:string} = {};

      for(const key in item) {
        flashcardObj.q = key;
        flashcardObj.a = item[key];
      }

      return flashcardObj;
    });

    return flashcards ?? [];
  }

  public async getCertSections({cert}: {cert: string}) {
    const prefix = "flashcards";

    const response = await this.makeFetchRequest({
      method: "GET",
      path: `${prefix}/${cert}`,
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
}