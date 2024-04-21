type MethodType = "GET" | "POST" | "PUT" | "DELETE";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

export class AwsService {
  private async makeFetchRequest({method, path}: {method: MethodType, path: string}) {
    const awsURL = process.env.AWS_GATEWAY_ENDPOINT;
    if (!awsURL) {
      throw new Error("AWS_GATEWAY_ENDPOINT not set");
    }
    return await fetch(
      `${awsURL}${path ? `/${path}` : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  public async getFlashcardItem({key}: {key: string}) {
    'use server';

    const res = await this.makeFetchRequest({
      method: "GET",
      path: key,
    });
    return res.body;
  }
}