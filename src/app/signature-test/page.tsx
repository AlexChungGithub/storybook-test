"use client";
// import "./styles.css";
import "../../../shadcn_app/globals.css";
import { useEffect, useRef, useState } from "react";
import bgimg2 from "./image-based-pdf-sample.png";
import {
  Signature as App,
  SignatureInput,
} from "../../stories/test/signature/Signature";
import { Button } from "../../components/ui/button";
import ApiUtils from "../utils/api";

export default function Home() {
  const myCanvas: any = useRef<any>();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [startPoint, setStartPoint] = useState<any>({});
  const [rectsArr, setRectsArr] = useState<SignatureInput[]>([]);
  const [rect, setRect] = useState<any>({});
  const [drag, setDrag] = useState(false);
  const [bgImg, setBgImg] = useState<any>({});
  const [addBtnPos, setAddBtnPos] = useState<any>({});

  const getMousePos = (canvas: any, event: any) => {
    const convasRect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - convasRect.left) * canvas.width) / convasRect.width,
      y: ((event.clientY - convasRect.top) * canvas.height) / convasRect.height,
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
    };
  };

  const mouseDownHandler = (e: any) => {
    setAddBtnPos({});
    const canvas = e.target;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);

    const pos = getMousePos(canvas, e);
    setStartPoint({
      x: pos.x,
      y: pos.y,
      clientX: pos.clientX,
      clientY: pos.clientY,
      pageX: pos.pageX,
      pageY: pos.pageY,
    });
    setDrag(true);
  };

  const mouseUpHandler = (e: any) => {
    const canvas = e.target;
    const { x, y, pageX, pageY } = getMousePos(canvas, e);
    const rect = {
      x: startPoint.x,
      y: startPoint.y,
      clientX: startPoint.clientX,
      clientY: startPoint.clientY,
      pageX: startPoint.pageX,
      pageY: startPoint.pageY,
      width: x - startPoint.x,
      height: y - startPoint.y,
    };
    setRect(rect);

    //showAddBtn
    if (rect.width > 0 && rect.height > 0) setAddBtnPos({ x: pageX, y: pageY });

    setStartPoint({});
    setDrag(false);
  };

  const mouseMoveHandler = (e: any) => {
    if (drag) {
      const canvas = e.target;
      const context = canvas.getContext("2d");
      const pos = getMousePos(canvas, e);
      drawMove(canvas, context, e);
      setX(pos.x);
      setY(pos.y);
    }
  };

  const drawMove = (canvas: any, context: any, event: any) => {
    if (drag) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);

      const { x, y } = getMousePos(canvas, event);
      context.beginPath();
      context.rect(
        startPoint.x,
        startPoint.y,
        x - startPoint.x,
        y - startPoint.y
      );
      context.strokeStyle = "red";
      context.stroke();
      context.beginPath();
      context.arc(startPoint.x, startPoint.y, 5, 0, 2 * Math.PI);
      context.fill();
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fill();
    }
  };

  const addBtnHandler = () => {
    if (rect) {
      rectsArr.push(
        new SignatureInput({
          x: rect.pageX,
          y: rect.pageY,
          width: rect.width,
          height: rect.height,
        })
      );

      const context = myCanvas.current.getContext("2d");
      context.clearRect(0, 0, myCanvas.width, myCanvas.height);
      context.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height);
    }
    setAddBtnPos({});
  };

  const writeFile = () => {
    const data = JSON.stringify(rectsArr);
    ApiUtils.exportFile(data);
  };

  const readFile = () => {
    let json: any[] = [];
    setRectsArr([]);
    try {
      json = require("@/../tmp.json");
    } catch (error) {
      console.log(`open tmp.json fail: ${error}`);
    }
    const importRectsArr: SignatureInput[] = [];
    json = JSON.parse(JSON.stringify(json));
    json.map((data) => {
      importRectsArr.push(new SignatureInput(data));
    });
    setRectsArr(importRectsArr);
  };

  // init background image
  useEffect(() => {
    const context = myCanvas.current.getContext("2d");
    const image = new Image();
    image.src = bgimg2.src;
    image.onload = () => {
      context.drawImage(image, 0, 0, image.width, image.height);
    };
    setBgImg(image);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ height: "40%" }}>
        <h1>X: {x}</h1>
        <h1>Y: {y}</h1>
        <h1>Rec: {JSON.stringify(rect)}</h1>
        <div>
          <Button onClick={writeFile}>export</Button>
          <Button onClick={readFile}>import</Button>
        </div>
      </div>
      <canvas
        ref={myCanvas}
        height={bgImg.height}
        width={bgImg.width}
        style={{
          border: "1px solid black",
        }}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler}
        onMouseDown={mouseDownHandler}
      />
      {addBtnPos.x && addBtnPos.y && (
        <Button
          style={{
            position: "absolute",
            left: `${addBtnPos.x}px`,
            top: `${addBtnPos.y}px`,
          }}
          onClick={addBtnHandler}
        >
          Add
        </Button>
      )}
      {rectsArr.map((item: any, index: any) => (
        <App key={index} input={item} />
      ))}
    </div>
  );
}
