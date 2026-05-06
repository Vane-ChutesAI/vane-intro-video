import "./index.css";
import { Composition } from "remotion";
import { VaneIntro } from "./VaneIntro";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="VaneIntro"
        component={VaneIntro}
        durationInFrames={1380}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
