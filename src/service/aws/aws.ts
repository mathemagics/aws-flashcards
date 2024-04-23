type MethodType = "GET" | "POST" | "PUT" | "DELETE";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

type Cert = {
  cert_id: string;
  image: string;
};

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

  public async getFlashcardItem({key}: {key: string}) {
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

    // TODO FIX
    return JSON.parse(jsonStr) as string[] || [];
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

      return JSON.parse(jsonStr) as Cert[] || [];

    } catch (error) {
      console.error('error: ', error);
      return [];
    }
  }
}