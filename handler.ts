import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { captureAsyncFunc } from "aws-xray-sdk-core";

const sleep = (millis: number) =>
  captureAsyncFunc(
    "sleep",
    seg =>
      new Promise<void>(resolve =>
        setTimeout(() => {
          resolve();
          seg.close();
        }, millis)
      )
  );

export const hello: APIGatewayProxyHandler = async () => {
  for (let i = 0; i < 10; ++i) {
    await sleep(100);
  }
  return {
    statusCode: 200,
    body: "OK"
  };
};
