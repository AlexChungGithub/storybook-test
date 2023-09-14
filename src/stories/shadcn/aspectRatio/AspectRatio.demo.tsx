import Image from "next/image";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import img1 from "./image-based-pdf-sample.png";
import img2 from "./photo.jpeg";

export function AspectRatioDemo() {
  return (
    <>
      <div>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={img1}
            alt="Photo by Drew Beamer"
            // fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div>
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <Image
            src={img2}
            alt="Photo by Drew Beamer"
            // fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </>
  );
}
