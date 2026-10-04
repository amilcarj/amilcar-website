import { VoiceDemo } from "@/components/sections/reels/voice-demo";
import { YouTubeEmbed } from "@/components/sections/reels/youtube-embed";
import { voDemos, reel } from "@/constants/media";

export function Reels() {
  return (
    <section id="reels" aria-labelledby="reels-heading" className="section">
      <h2 id="reels-heading" className="section-heading">
        Reels
      </h2>
      <div className="mt-10">
        <YouTubeEmbed videoId={reel.youtubeId} title={reel.title} />
      </div>
      <ul className="mt-9 grid gap-9 md:grid-cols-2">
        {voDemos.map((voDemo) => (
          <li key={voDemo.src}>
            <VoiceDemo demo={voDemo} />
          </li>
        ))}
      </ul>
    </section>
  );
}
