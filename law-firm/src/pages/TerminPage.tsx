import SEO from '../components/SEO';
import AcuityEmbed from '../components/AcuityEmbed';

export default function TerminPage() {
  return (
    <>
      <SEO
        title="Termin buchen"
        description="Vereinbaren Sie einen Beratungstermin mit unserer Kanzlei online."
        canonical="/termin"
      />
      
      <div className="bg-[#1a365d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Termin buchen</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-gray-600 mb-8">
          Wählen Sie einen Termin für Ihre rechtliche Beratung. Die Zahlung erfolgt sicher über Acuity Scheduling.
        </p>
        
        <AcuityEmbed appointmentTypeId="12345678" />

        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Hinweis zum Datenschutz</h2>
          <p className="text-sm text-gray-600">
            Bei der Terminbuchung werden Ihre Daten an Acuity Scheduling übertragen. 
            Bitte beachten Sie die Datenschutzerklärung von Acuity. 
            Die Zahlung wird direkt über Acuity abgewickelt; Ihre Zahlungsdaten werden nicht an uns übertragen.
          </p>
        </div>
      </div>
    </>
  );
}
