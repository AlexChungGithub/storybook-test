import Image from "next/image";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import img2 from "./photo.jpeg";
import "./styles.css";

export function AspectRatioDemo() {
  return (
    <>
      <div className="Container">
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <Image
            src={img2}
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </>
  );
}
