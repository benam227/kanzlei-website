OPENCODE FIX — YouTube Error 153: normalize URL to embed + add fallback link

GOAL:
Fix YouTube embed error (Fehler 153) by ensuring we always render a valid embed URL
and provide a fallback link if embed fails.

STEPS:
1) Locate the YouTube embed usage (likely src/components/GatedEmbed.tsx or a helper).
2) Implement helper:
   - parseYouTubeId(url): extract VIDEO_ID from:
     - youtube.com/watch?v=ID
     - youtu.be/ID
     - youtube.com/embed/ID
   - toYouTubeEmbedUrl(url): return
     "https://www.youtube-nocookie.com/embed/<ID>?rel=0&modestbranding=1"
     or null if no ID.
3) In GatedEmbed for type="youtube":
   - if embedUrl is null => show fallback UI with external link to original URL.
   - render iframe with:
     - allowfullscreen
     - loading="lazy"
     - referrerPolicy="no-referrer"
     - allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
4) Build + typecheck.
5) Commit: "fix: youtube embed url normalization + fallback"

OUTPUT: changed file paths + build/typecheck pass.