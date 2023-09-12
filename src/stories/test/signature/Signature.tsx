"use client";
import SignatureCanvas from "react-signature-canvas";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";

export function Signature(prop: { input: SignatureInput }) {
  const { x, y, width, height } = prop.input;
  const [status, changeStatus] = useState("clear");
  const [sign, changeSign] = useState<SignatureCanvas | null>(null);
  const [image, changeImage] = useState<string>("");
  const beginFunc = () => {
    changeStatus("draw");
  };
  const endFunc = () => {
    changeStatus("end");
    prop.input.updateDrawData(sign?.toData() || []);
  };

  const clear = () => {
    changeStatus("clear");
    sign?.clear();
    prop.input.updateDrawData(sign?.toData() || []);
  };

  const rewrite = () => {
    const tmp = JSON.parse(JSON.stringify(sign?.toData()));
    changeStatus("rewrite");
    tmp.pop();
    sign?.fromData(tmp);
    prop.input.updateDrawData(sign?.toData() || []);
  };

  useEffect(() => {
    if (prop.input.initFlag) {
      prop.input.init(sign);
    }
  }, [prop, sign]);

  const imageSign = async () => {
    changeImage(sign?.toDataURL() || "");
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        <div>
          <SignatureCanvas
            penColor="black"
            backgroundColor="gray"
            onBegin={beginFunc}
            onEnd={endFunc}
            ref={(ref) => {
              changeSign(ref);
            }}
            canvasProps={{
              width: width + "px",
              height: height + "px",
              className: "sigCanvas",
            }}
          />
        </div>
        <div>
          <Button onClick={clear}>clear</Button>
          <Button onClick={rewrite}>rewrite</Button>
          <Button onClick={imageSign}>imageSign</Button>
        </div>
      </div>
    </>
  );
}

export class SignatureInput {
  public x: string;
  public y: string;
  public width: string;
  public height: string;
  public initFlag: boolean;
  public drawData: SignaturePad.Point[][] = [];
  constructor(input: {
    x: string;
    y: string;
    width: string;
    height: string;
    drawData?: SignaturePad.Point[][];
  }) {
    this.x = input.x;
    this.y = input.y;
    this.width = input.width;
    this.height = input.height;
    this.drawData = JSON.parse(JSON.stringify(input.drawData || []));
    this.initFlag = true;
  }

  init(sign: SignatureCanvas | null) {
    if (sign) {
      this.initFlag = false;
      sign.fromData(JSON.parse(JSON.stringify(this.drawData)));
    }
  }

  updateDrawData(data: SignaturePad.Point[][]) {
    this.drawData = JSON.parse(JSON.stringify(data));
  }
}
