import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import { CONTACT } from "@/lib/site-content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Πολιτική Απορρήτου — Dolce Bambini" },
      {
        name: "description",
        content:
          "Πολιτική Απορρήτου & Προστασίας Προσωπικών Δεδομένων της Dolce Bambini σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR – ΕΕ 2016/679).",
      },
      { property: "og:title", content: "Πολιτική Απορρήτου — Dolce Bambini" },
      { property: "og:url", content: "https://dolcebambini.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://dolcebambini.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

type L = "el" | "en" | "it" | "es" | "pt";

const COPY: Record<L, {
  title: string;
  intro: string;
  updated: string;
  sections: { h: string; p: string | string[] }[];
}> = {
  el: {
    title: "Πολιτική Απορρήτου & Προστασίας Προσωπικών Δεδομένων",
    updated: "Τελευταία ενημέρωση: Ιούλιος 2026",
    intro:
      "Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο η επιχείρηση Dolce Bambini συλλέγει, χρησιμοποιεί, αποθηκεύει και προστατεύει τα προσωπικά σας δεδομένα, σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (ΕΕ 2016/679 – GDPR) και την ελληνική νομοθεσία (Ν. 4624/2019).",
    sections: [
      {
        h: "1. Υπεύθυνος Επεξεργασίας",
        p: [
          "Επωνυμία: Dolce Bambini",
          `Διεύθυνση: ${CONTACT.address.el}`,
          `Τηλέφωνο: ${CONTACT.phone}`,
          `Email: ${CONTACT.email}`,
        ],
      },
      {
        h: "2. Ποια δεδομένα συλλέγουμε",
        p:
          "Συλλέγουμε μόνο τα δεδομένα που είναι απαραίτητα για την επικοινωνία και την εξυπηρέτησή σας: ονοματεπώνυμο, στοιχεία επικοινωνίας (email, τηλέφωνο), διεύθυνση αποστολής (εφόσον υπάρξει παραγγελία), καθώς και τεχνικά δεδομένα περιήγησης (διεύθυνση IP, τύπος συσκευής, cookies) όταν επισκέπτεστε τον ιστότοπό μας.",
      },
      {
        h: "3. Σκοποί επεξεργασίας",
        p:
          "Επεξεργαζόμαστε τα δεδομένα σας για: (α) την απάντηση σε ερωτήματα και αιτήματα σας, (β) τη διαχείριση παραγγελιών και ραντεβού στο κατάστημά μας, (γ) την εκπλήρωση νομικών και φορολογικών υποχρεώσεων, (δ) τη βελτίωση της εμπειρίας στον ιστότοπο μέσω αναλυτικών στοιχείων.",
      },
      {
        h: "4. Νομική βάση επεξεργασίας",
        p:
          "Η επεξεργασία βασίζεται στη ρητή συγκατάθεσή σας (άρθρο 6 §1 α GDPR), στην εκτέλεση σύμβασης (άρθρο 6 §1 β), στη συμμόρφωση με νομικές υποχρεώσεις (άρθρο 6 §1 γ) και στο έννομο συμφέρον μας για την ασφαλή λειτουργία του ιστότοπου (άρθρο 6 §1 στ).",
      },
      {
        h: "5. Αποδέκτες των δεδομένων",
        p:
          "Τα προσωπικά σας δεδομένα δεν διαβιβάζονται ούτε πωλούνται σε τρίτους. Ενδέχεται να κοινοποιηθούν μόνο σε συνεργαζόμενες εταιρείες μεταφορών, λογιστικά γραφεία και παρόχους φιλοξενίας/υπηρεσιών πληροφορικής, στο απολύτως αναγκαίο μέτρο και υπό αυστηρές συμβατικές δεσμεύσεις εμπιστευτικότητας.",
      },
      {
        h: "6. Χρόνος διατήρησης",
        p:
          "Τα δεδομένα διατηρούνται μόνο για όσο χρόνο απαιτείται για την εκπλήρωση των παραπάνω σκοπών ή όσο επιβάλλει η φορολογική/εμπορική νομοθεσία (κατά κανόνα έως 5 έτη από την τελευταία συναλλαγή). Στη συνέχεια διαγράφονται ή ανωνυμοποιούνται με ασφάλεια.",
      },
      {
        h: "7. Δικαιώματά σας",
        p:
          "Έχετε το δικαίωμα πρόσβασης, διόρθωσης, διαγραφής («δικαίωμα στη λήθη»), περιορισμού της επεξεργασίας, φορητότητας των δεδομένων, εναντίωσης καθώς και ανάκλησης της συγκατάθεσής σας ανά πάσα στιγμή. Για την άσκηση των δικαιωμάτων σας, επικοινωνήστε μαζί μας στο " +
          CONTACT.email +
          ".",
      },
      {
        h: "8. Cookies",
        p:
          "Ο ιστότοπος χρησιμοποιεί απαραίτητα cookies για τη σωστή λειτουργία του και προαιρετικά cookies ανάλυσης για τη βελτίωση της εμπειρίας χρήστη. Μπορείτε να ρυθμίσετε ή να απενεργοποιήσετε τα cookies μέσω των ρυθμίσεων του browser σας.",
      },
      {
        h: "9. Ασφάλεια",
        p:
          "Λαμβάνουμε κατάλληλα τεχνικά και οργανωτικά μέτρα (κρυπτογράφηση HTTPS, περιορισμένη πρόσβαση, τακτικά αντίγραφα ασφαλείας) για την προστασία των δεδομένων σας από απώλεια, κακή χρήση ή μη εξουσιοδοτημένη πρόσβαση.",
      },
      {
        h: "10. Αρχή Προστασίας Δεδομένων",
        p:
          "Έχετε το δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (Κηφισίας 1-3, 115 23 Αθήνα, www.dpa.gr) εάν θεωρείτε ότι θίγεται η προστασία των δεδομένων σας.",
      },
      {
        h: "11. Επικοινωνία",
        p:
          "Για κάθε ερώτηση σχετικά με την παρούσα Πολιτική, επικοινωνήστε στο " +
          CONTACT.email +
          " ή στο τηλέφωνο " +
          CONTACT.phone +
          ".",
      },
    ],
  },
  en: {
    title: "Privacy Policy & Personal Data Protection",
    updated: "Last updated: July 2026",
    intro:
      "This Privacy Policy explains how Dolce Bambini collects, uses, stores and protects your personal data in accordance with the EU General Data Protection Regulation (EU 2016/679 – GDPR) and Greek law (L. 4624/2019).",
    sections: [
      { h: "1. Data Controller", p: ["Dolce Bambini", CONTACT.address.en, `Phone: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. What data we collect", p: "We collect only what is necessary to serve you: your name, contact details (email, phone), shipping address (if an order is placed), and technical browsing data (IP address, device type, cookies) when you visit our website." },
      { h: "3. Purposes of processing", p: "We process your data to (a) respond to your enquiries, (b) manage orders and appointments, (c) comply with legal and tax obligations, and (d) improve our website through analytics." },
      { h: "4. Legal basis", p: "Processing is based on your explicit consent (Art. 6(1)(a) GDPR), performance of a contract (Art. 6(1)(b)), compliance with legal obligations (Art. 6(1)(c)) and our legitimate interest in the secure operation of the site (Art. 6(1)(f))." },
      { h: "5. Recipients", p: "Your data is never sold. It may only be shared with shipping partners, accounting providers and IT/hosting providers, strictly to the extent necessary and under confidentiality agreements." },
      { h: "6. Retention", p: "Data is kept only as long as necessary for the above purposes or as required by tax/commercial law (typically up to 5 years from the last transaction), then securely deleted or anonymised." },
      { h: "7. Your rights", p: `You have the right to access, rectify, erase, restrict, port, and object to processing, and to withdraw consent at any time. Contact us at ${CONTACT.email} to exercise these rights.` },
      { h: "8. Cookies", p: "Our site uses essential cookies for functionality and optional analytics cookies. You can manage or disable cookies via your browser settings." },
      { h: "9. Security", p: "We apply appropriate technical and organisational measures (HTTPS encryption, restricted access, regular backups) to protect your data." },
      { h: "10. Supervisory Authority", p: "You may lodge a complaint with the Hellenic Data Protection Authority (Kifisias 1-3, 115 23 Athens, www.dpa.gr) if you believe your rights have been violated." },
      { h: "11. Contact", p: `For any question about this Policy, contact ${CONTACT.email} or ${CONTACT.phone}.` },
    ],
  },
  it: {
    title: "Informativa sulla Privacy e Protezione dei Dati",
    updated: "Ultimo aggiornamento: Luglio 2026",
    intro:
      "La presente Informativa descrive come Dolce Bambini raccoglie, utilizza, conserva e protegge i dati personali ai sensi del Regolamento UE 2016/679 (GDPR) e della legge greca 4624/2019.",
    sections: [
      { h: "1. Titolare del trattamento", p: ["Dolce Bambini", CONTACT.address.it, `Telefono: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. Dati raccolti", p: "Raccogliamo solo i dati necessari: nome, contatti (email, telefono), indirizzo di spedizione (in caso di ordine) e dati tecnici di navigazione (IP, dispositivo, cookie)." },
      { h: "3. Finalità", p: "Trattiamo i dati per rispondere a richieste, gestire ordini e appuntamenti, adempiere obblighi di legge e migliorare il sito tramite analisi." },
      { h: "4. Base giuridica", p: "Consenso (art. 6 §1 a), esecuzione del contratto (art. 6 §1 b), obblighi legali (art. 6 §1 c), legittimo interesse (art. 6 §1 f)." },
      { h: "5. Destinatari", p: "I dati non vengono venduti. Possono essere condivisi con corrieri, commercialisti e fornitori IT/hosting, solo nella misura necessaria e sotto vincolo di riservatezza." },
      { h: "6. Conservazione", p: "I dati sono conservati per il tempo necessario alle finalità o per gli obblighi fiscali (fino a 5 anni dall'ultima transazione), poi eliminati in sicurezza." },
      { h: "7. Diritti dell'interessato", p: `Diritti di accesso, rettifica, cancellazione, limitazione, portabilità, opposizione e revoca del consenso. Contatta ${CONTACT.email}.` },
      { h: "8. Cookie", p: "Utilizziamo cookie tecnici e, previo consenso, analitici. Puoi gestirli dalle impostazioni del browser." },
      { h: "9. Sicurezza", p: "Adottiamo misure tecniche e organizzative adeguate (HTTPS, accessi limitati, backup)." },
      { h: "10. Autorità di controllo", p: "Puoi presentare reclamo all'Autorità Ellenica per la Protezione dei Dati (www.dpa.gr)." },
      { h: "11. Contatti", p: `${CONTACT.email} · ${CONTACT.phone}` },
    ],
  },
  es: {
    title: "Política de Privacidad y Protección de Datos",
    updated: "Última actualización: Julio 2026",
    intro:
      "Esta Política explica cómo Dolce Bambini recopila, usa, almacena y protege sus datos personales conforme al Reglamento UE 2016/679 (RGPD) y la ley griega 4624/2019.",
    sections: [
      { h: "1. Responsable del tratamiento", p: ["Dolce Bambini", CONTACT.address.es, `Teléfono: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. Datos recogidos", p: "Recopilamos solo lo necesario: nombre, datos de contacto, dirección de envío (si hay pedido) y datos técnicos de navegación (IP, dispositivo, cookies)." },
      { h: "3. Finalidades", p: "Responder consultas, gestionar pedidos y citas, cumplir obligaciones legales/fiscales y mejorar el sitio mediante analítica." },
      { h: "4. Base jurídica", p: "Consentimiento (art. 6.1.a), ejecución de contrato (art. 6.1.b), obligaciones legales (art. 6.1.c), interés legítimo (art. 6.1.f)." },
      { h: "5. Destinatarios", p: "Los datos no se venden. Solo se comparten con transportistas, asesores fiscales y proveedores IT/hosting bajo confidencialidad." },
      { h: "6. Conservación", p: "Conservamos los datos el tiempo necesario o exigido por ley fiscal (hasta 5 años desde la última transacción)." },
      { h: "7. Sus derechos", p: `Acceso, rectificación, supresión, limitación, portabilidad, oposición y retirada del consentimiento. Escríbanos a ${CONTACT.email}.` },
      { h: "8. Cookies", p: "Utilizamos cookies esenciales y, con su consentimiento, analíticas. Puede gestionarlas desde su navegador." },
      { h: "9. Seguridad", p: "Aplicamos medidas técnicas y organizativas (HTTPS, accesos restringidos, copias de seguridad)." },
      { h: "10. Autoridad de control", p: "Puede reclamar ante la Autoridad Helénica de Protección de Datos (www.dpa.gr)." },
      { h: "11. Contacto", p: `${CONTACT.email} · ${CONTACT.phone}` },
    ],
  },
  pt: {
    title: "Política de Privacidade e Proteção de Dados",
    updated: "Última atualização: Julho de 2026",
    intro:
      "Esta Política descreve como a Dolce Bambini recolhe, utiliza, armazena e protege os seus dados pessoais nos termos do Regulamento UE 2016/679 (RGPD) e da lei grega 4624/2019.",
    sections: [
      { h: "1. Responsável pelo tratamento", p: ["Dolce Bambini", CONTACT.address.pt, `Telefone: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. Dados recolhidos", p: "Recolhemos apenas o necessário: nome, contactos, morada de envio (se houver encomenda) e dados técnicos de navegação (IP, dispositivo, cookies)." },
      { h: "3. Finalidades", p: "Responder a pedidos, gerir encomendas e marcações, cumprir obrigações legais e melhorar o site através de análise." },
      { h: "4. Base jurídica", p: "Consentimento (art. 6.º/1/a), execução de contrato (b), obrigações legais (c), interesse legítimo (f)." },
      { h: "5. Destinatários", p: "Os dados não são vendidos. Podem ser partilhados com transportadoras, contabilistas e fornecedores IT/hosting, apenas na medida necessária." },
      { h: "6. Conservação", p: "Os dados são conservados pelo tempo necessário ou imposto por lei fiscal (até 5 anos após a última transação)." },
      { h: "7. Direitos do titular", p: `Acesso, retificação, apagamento, limitação, portabilidade, oposição e retirada do consentimento. Contacte ${CONTACT.email}.` },
      { h: "8. Cookies", p: "Utilizamos cookies essenciais e, com consentimento, analíticos. Pode geri-los no browser." },
      { h: "9. Segurança", p: "Aplicamos medidas técnicas e organizativas adequadas (HTTPS, acessos restritos, backups)." },
      { h: "10. Autoridade de controlo", p: "Pode apresentar reclamação à Autoridade Helénica de Proteção de Dados (www.dpa.gr)." },
      { h: "11. Contacto", p: `${CONTACT.email} · ${CONTACT.phone}` },
    ],
  },
};

function PrivacyPage() {
  const { lang } = useLang();
  const c = COPY[lang as L] ?? COPY.el;
  return (
    <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-24">
      <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">GDPR · EU 2016/679</div>
      <h1 className="font-display text-4xl md:text-5xl tracking-tight">{c.title}</h1>
      <p className="mt-3 text-xs text-muted-foreground">{c.updated}</p>
      <p className="mt-6 text-foreground/80 leading-relaxed">{c.intro}</p>

      <div className="mt-10 space-y-8">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-display text-2xl tracking-tight mb-3">{s.h}</h2>
            {Array.isArray(s.p) ? (
              <ul className="space-y-1 text-foreground/80 leading-relaxed">
                {s.p.map((line) => <li key={line}>{line}</li>)}
              </ul>
            ) : (
              <p className="text-foreground/80 leading-relaxed">{s.p}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
