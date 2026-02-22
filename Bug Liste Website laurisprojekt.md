Bug-Liste Website (laurisprojekt.netlify.app)

BUG 1 — Header-Menü: „Start“ und „Leistungen“ führen beide zur Startseite

Ist-Zustand:
Im Header führen die Menüpunkte „Start“ und „Leistungen“ beide auf dieselbe Route (Home).

Erwartung:
	•	Start → Route / (Homepage)
	•	Leistungen → eigene Seite /leistungen (oder eine definierte Leistungen-Seite)

Reproduktion:
	1.	Website öffnen
	2.	Im Header auf „Leistungen“ klicken
	3.	Beobachtung: es öffnet sich die Startseite statt Leistungen-Seite

Impact: Navigation ist irreführend; Leistungen nicht erreichbar.

⸻

BUG 2 — Homepage: Section „Unsere Leistungen“ zeigt keinen Inhalt

Ist-Zustand:
Auf der Homepage wird die Überschrift/Section angezeigt, aber die Inhalte (Service Cards / Texte) sind leer.

Erwartung:
Die Section zeigt 3 Leistungen (z.B. Asylrecht, Aufenthaltsrecht, Staatsangehörigkeit) inkl. Kurztext.

Reproduktion:
	1.	Homepage öffnen
	2.	Scroll zur Section „Unsere Leistungen“
	3.	Beobachtung: Keine Leistungen sichtbar

Vermutung:
Content wird nicht korrekt aus services.md geladen oder wird im Rendering nicht ausgegeben.

⸻

BUG 3 — Seite „Termin buchen“: Acuity nicht integriert + Layout falsch

Ist-Zustand:
	•	Buchungssystem Acuity Scheduling ist nicht konfiguriert/eingebettet (kein Embed sichtbar)
	•	Content ist links bündig und wirkt „roh“ (kein zentriertes Layout/Box)

Erwartung:
	•	Acuity Embed ist vorhanden (Consent-gated) und lädt nach Zustimmung
	•	Inhalt ist zentriert in einer Box (max-width, padding, margin auto)
	•	Einheitliches Layout wie andere Seiten

Reproduktion:
	1.	/termin-buchen öffnen
	2.	Beobachtung: Kein Embed / Layout linksbündig

Abhängigkeit:
VITE_ACUITY_EMBED_URL muss in Netlify Env gesetzt sein (und/oder Content Manager gepflegt).

⸻

BUG 4 — Downloads-Seite zeigt 404 / „nicht gefunden“

Ist-Zustand:
Beim Aufruf der Downloads-Seite wird die 404-Seite angezeigt.

Erwartung:
Route /downloads rendert eine Download-Liste (PDF Links aus downloads.json) in Standard-Layout.

Reproduktion:
	1.	/downloads öffnen oder im Menü „Downloads“ klicken
	2.	Beobachtung: 404 / NotFoundPage

Vermutung:
Route fehlt oder URL im Menü stimmt nicht mit Router-Pfad überein (z.B. /download vs /downloads).

⸻

BUG 5 — Impressum-Seite zeigt 404 / „nicht gefunden“

Ist-Zustand:
Impressum-Seite zeigt NotFound.

Erwartung:
Route /impressum rendert Impressum-Content aus impressum.md.

Reproduktion:
	1.	/impressum öffnen oder Footer-Link klicken
	2.	Beobachtung: 404 / NotFoundPage

Vermutung:
Route fehlt / falscher Link-Pfad / Router-Konfiguration.

⸻

BUG 6 — Datenschutz: Inhalt linksbündig, soll boxed & zentriert sein

Ist-Zustand:
Datenschutz wird angezeigt, aber Layout ist links bündig (kein Container/Box-Styling).

Erwartung:
Inhalt in einer zentrierten Box/Container:
	•	max-width (z.B. 900–1100px)
	•	padding
	•	margin auto
	•	typografisch angenehm lesbar

Reproduktion:
	1.	/datenschutz öffnen
	2.	Beobachtung: Text startet am linken Rand / wirkt unformatiert

⸻

BUG 7 — Netlify Content Manager: Seiten existieren, aber ohne Inhalt / nicht verbunden

Ist-Zustand:
Im Decap/Netlify CMS sind Collections/Seiten sichtbar, aber Inhalte sind leer oder Änderungen erscheinen nicht wie erwartet.

Erwartung:
CMS zeigt vorhandene Inhalte aus /content/* und erlaubt Editing. Nach Publish:
	•	Commit in GitHub
	•	Deploy in Netlify
	•	Änderungen live sichtbar

Reproduktion:
	1.	/admin/#/ öffnen
	2.	In Homepage/Services/Impressum/DSE klicken
	3.	Beobachtung: Felder leer oder Inhalt fehlt

Vermutung:
	•	CMS config zeigt auf falsche Dateien/Pfade
	•	Content-Dateien haben Frontmatter-Struktur, die nicht zu CMS-Feldern passt
	•	services.md wird als „body“ erwartet, aber Datei hat anderen Aufbau
	•	Oder Content wurde durch den Parser (vereinfachte Frontmatter) nicht korrekt gelesen
