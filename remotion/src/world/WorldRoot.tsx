import { Composition } from "remotion";
import { DURATION_S, PastPapers } from "./past-papers/PastPapers";
import { CLEAN_DURATION_S, PastPapersClean } from "./past-papers/PastPapersClean";
import { Placement, PLACEMENT_DURATION_S } from "./placement/Placement";
import { PastPapersZine, ZINE_DURATION_S } from "./past-papers/PastPapersZine";
import { PastPapersReal, REAL_DURATION_S } from "./past-papers/PastPapersReal";
import { CLINICAL_DURATION_S, ClinicalList } from "./clinical-list/ClinicalList";
import { ANALYTICAL_DURATION_S, AnalyticalMix } from "./analytical-mix/AnalyticalMix";
import { GCSE_DURATION_S, GcseMocks } from "./gcse-mocks/GcseMocks";
import { ADHD_DURATION_S, AdhdPlan } from "./adhd-plan/AdhdPlan";
import { CLINICAL_SHIFTS_DURATION_S, ClinicalShifts } from "./clinical-shifts/ClinicalShifts";
import { CLINICAL_QUIZ_DURATION_S, ClinicalQuiz } from "./clinical-quiz/ClinicalQuiz";
import { BANK } from "./bank";
import { BankFilm, film } from "./bank/Film";
import { Poster, posterDefaults, POSTER_H, POSTER_W } from "./posters/Posters";
import { PhotoPoster, photoDefaults } from "./posters/PhotoPosters";
import { CarouselSlide, slideDefaults } from "./posters/Carousel";
import { LogoIntro } from "./kit/logo";
import { SOFT_DURATION_S, SoftLaunch } from "./soft-launch/SoftLaunch";

export const WorldRoot: React.FC = () => (
  <>
    <Composition id="World-past-papers" component={PastPapers} durationInFrames={Math.ceil(DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Clean-past-papers" component={PastPapersClean} durationInFrames={Math.ceil(CLEAN_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    {["editorial", "dark", "poster"].map((v) => (
      <Composition key={v} id={`Clean-past-papers-${v}`} component={PastPapersClean} defaultProps={{ variant: v }} durationInFrames={Math.ceil(CLEAN_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    ))}
    <Composition id="Zine-past-papers" component={PastPapersZine} durationInFrames={Math.ceil(ZINE_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Real-past-papers" component={PastPapersReal} durationInFrames={Math.ceil(REAL_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Dark-clinical-list" component={ClinicalList} durationInFrames={Math.ceil(CLINICAL_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Dark-analytical-mix" component={AnalyticalMix} durationInFrames={Math.ceil(ANALYTICAL_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Dark-gcse-mocks" component={GcseMocks} durationInFrames={Math.ceil(GCSE_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Dark-adhd-plan" component={AdhdPlan} durationInFrames={Math.ceil(ADHD_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Dark-clinical-shifts" component={ClinicalShifts} durationInFrames={Math.ceil(CLINICAL_SHIFTS_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Dark-clinical-quiz" component={ClinicalQuiz} durationInFrames={Math.ceil(CLINICAL_QUIZ_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    {BANK.map(({ id, spec, timing }) => (
      <Composition key={id} id={`Bank-${id}`} component={BankFilm} defaultProps={{ spec, timing, vo: `world/bank/${id}/vo.wav` }} durationInFrames={Math.ceil(film(spec, timing).duration * 30)} fps={30} width={1080} height={1920} />
    ))}
    <Composition id="Poster" component={Poster} defaultProps={posterDefaults} durationInFrames={1} fps={30} width={POSTER_W} height={POSTER_H} />
    <Composition id="Slide" component={CarouselSlide} defaultProps={slideDefaults} durationInFrames={1} fps={30} width={POSTER_W} height={POSTER_H} />
    <Composition id="PhotoPoster" component={PhotoPoster} defaultProps={photoDefaults} durationInFrames={1} fps={30} width={POSTER_W} height={POSTER_H} />
    <Composition id="Soft-launch" component={SoftLaunch} durationInFrames={Math.ceil(SOFT_DURATION_S * 30)} fps={30} width={1080} height={1920} />
    <Composition id="Logo-intro" component={LogoIntro} durationInFrames={105} fps={30} width={1080} height={1920} />
    <Composition id="Glass-placement" component={Placement} durationInFrames={Math.ceil(PLACEMENT_DURATION_S * 30)} fps={30} width={1080} height={1920} />
  </>
);
