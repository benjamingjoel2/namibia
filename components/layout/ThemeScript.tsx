/**
 * Runs before paint so the page never flashes the wrong theme.
 * Order: saved choice → system preference → day.
 */
const script = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('nl-theme');if(t!=='day'&&t!=='night'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'night':'day'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='day'}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
