import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import { loadContent } from '../lib/content';

export default function DatenschutzPage() {
  const content = loadContent('datenschutz');

  return (
    <>
      <SEO
        title="Datenschutz"
        description="Datenschutzerklärung unserer Rechtsanwaltskanzlei."
        canonical="/datenschutz"
      />
      
      <div className="bg-[#1a365d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {content?.content ? (
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{content.content}</ReactMarkdown>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Server-Logfiles</h2>
              <p className="text-gray-600">
                Bei jedem Zugriff auf unsere Website werden automatisch Informationen an den Server 
                unseres Website-Hostings gesendet. Diese Daten werden in sogenannten Logfiles 
                gespeichert und umfassen:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
              </ul>
              <p className="mt-2 text-gray-600">
                Diese Daten dienen ausschließlich der technischen Bereitstellung der Website und 
                werden nach 7 Tagen automatisch gelöscht. Eine Zusammenführung mit anderen Daten 
                erfolgt nicht.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Acuity Scheduling</h2>
              <p className="text-gray-600">
                Für die Online-Terminbuchung nutzen wir Acuity Scheduling. Bei der Buchung werden 
                Ihre Daten (Name, E-Mail, Telefon, gewählter Termin) an Acuity Scheduling 
                übertragen. Die Zahlung erfolgt direkt über Acuity; Ihre Zahlungsdaten werden 
                nicht an uns übertragen.
              </p>
              <p className="mt-2 text-gray-600">
                Wir haben keinen Einfluss auf die Datenverarbeitung durch Acuity. 
                Bitte beachten Sie die Datenschutzerklärung von Acuity Scheduling.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Matomo Analytics</h2>
              <p className="text-gray-600">
                Wir nutzen Matomo Analytics für die Analyse der Website-Nutzung. Matomo ist eine 
                Open-Source-Software, die auf unseren eigenen Servern läuft. Ihre IP-Adresse wird 
                vor der Speicherung anonymisiert.
              </p>
              <p className="mt-2 text-gray-600">
                Matomo wird nur aktiviert, wenn Sie der Nutzung von Analyse-Cookies zustimmen. 
                Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">YouTube</h2>
              <p className="text-gray-600">
                Eingebettete YouTube-Videos werden erst nach Ihrer Zustimmung oder durch einen 
                expliziten Klick geladen. YouTube ist ein Dienst der Google Ireland Limited. 
                Beim Laden werden Daten an Google übertragen.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies und Einwilligung</h2>
              <p className="text-gray-600">
                Wir verwenden Cookies für technisch notwendige Funktionen (essentiell). 
                Analyse-Cookies (Matomo) und externe Medien (YouTube, Acuity) werden nur mit 
                Ihrer expliziten Einwilligung gesetzt.
              </p>
              <p className="mt-2 text-gray-600">
                Sie können Ihre Einwilligung jederzeit widerrufen oder anpassen. 
                Klicken Sie dazu auf "Cookie-Einstellungen" im Footer der Website.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Ihre Rechte</h2>
              <p className="text-gray-600">
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung 
                der Verarbeitung Ihrer personenbezogenen Daten. Für Fragen kontaktieren Sie uns 
                bitte unter info@kanzlei-recht.de.
              </p>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
