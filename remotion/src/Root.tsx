import { CalculateMetadataFunction, Composition } from "remotion";
import { OffloadPin, pinDefaults } from "./OffloadPin";
import { PaperCard, type PaperProps } from "./PaperCard";
import { DownloadSample, EditorialSample, FigureSample } from "./Samples";
import { ClaudeEditorial } from "./ClaudeEditorial";
import { GoalCut } from "./GoalCut";
import { FastIssues, fastIssuesDefaults, fastIssuesDuration } from "./FastIssues";

export const paperDefaults: PaperProps = {
  line: "The list is still open.",
  note: "The reading does not finish itself.",
  niche: "offload.clinical",
  narration: "The reading does not finish itself.",
  beats: ["The list is still open.", "The reading does not finish itself.", "Come back to the card."],
  format: "video",
};

const calculateMetadata: CalculateMetadataFunction<PaperProps> = ({ props }) => {
  if (props.format === "still") return { durationInFrames: 1 };
  if (props.format === "carousel") return { durationInFrames: 270 };
  return { durationInFrames: 180 };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
    <Composition
      id="OffloadCard"
      component={PaperCard}
      durationInFrames={180}
      fps={30}
      width={720}
      height={1280}
      defaultProps={paperDefaults}
      calculateMetadata={calculateMetadata}
    />
    <Composition id="GoalCut" component={GoalCut} durationInFrames={680} fps={30} width={1920} height={1080} />
    <Composition
      id="FastIssues"
      component={FastIssues}
      durationInFrames={fastIssuesDuration}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={fastIssuesDefaults}
      calculateMetadata={({ props }) => ({
        durationInFrames: props.durationFrames || Math.max(props.beats.length * props.hold + 54, 90),
      })}
    />
    <Composition id="ClaudeEditorial" component={ClaudeEditorial} durationInFrames={360} fps={30} width={1080} height={1920} />
    <Composition id="EditorialSample" component={EditorialSample} durationInFrames={270} fps={30} width={1080} height={1920} />
    <Composition id="DownloadSample" component={DownloadSample} durationInFrames={330} fps={30} width={1080} height={1920} />
    <Composition id="FigureSample" component={FigureSample} durationInFrames={180} fps={30} width={1080} height={1920} />
    <Composition
      id="OffloadPin"
      component={OffloadPin}
      durationInFrames={1}
      fps={30}
      width={1000}
      height={1500}
      defaultProps={pinDefaults}
    />
    </>
  );
};
