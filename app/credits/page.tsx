import { LegalPage } from "@/components/ui/LegalPage";
import { imageCredits } from "@/data/imageCredits";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Photo credits", description: "The photographers whose work appears on this site.", path: "/credits" });

export default function CreditsPage() {
  // One line per photographer, listing where their photos appear.
  const byPhotographer = new Map<string, { name: string; username: string; photos: { file: string; url: string }[] }>();
  for (const [file, c] of Object.entries(imageCredits)) {
    const entry = byPhotographer.get(c.username) ?? { name: c.name, username: c.username, photos: [] };
    entry.photos.push({ file, url: c.photo });
    byPhotographer.set(c.username, entry);
  }
  const list = [...byPhotographer.values()].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <LegalPage title="Credits" updated="October 2026" placeholder={false}>
      <p>
        Photographs on this site are from <a href="https://unsplash.com">Unsplash</a>, used under the{" "}
        <a href="https://unsplash.com/license">Unsplash License</a>. Thank you to every photographer below. Team portraits are placeholders until we add our own.
      </p>
      <ul>
        {list.map((p) => (
          <li key={p.username}>
            <a href={`https://unsplash.com/@${p.username}`}>{p.name}</a>
            {": "}
            {p.photos.map((ph, i) => (
              <span key={ph.file}>
                {i > 0 && ", "}
                <a href={ph.url}>{ph.file.replace(/-/g, " ")}</a>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
