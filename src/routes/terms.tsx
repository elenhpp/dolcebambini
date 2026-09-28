import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import { CONTACT } from "@/lib/site-content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Όροι & Προϋποθέσεις Χονδρικής — Dolce Bambini" },
      {
        name: "description",
        content:
          "Γενικοί Όροι Πώλησης Χονδρικής της Dolce Bambini: παραγγελίες, τιμές, πληρωμές, αποστολές, επιστροφές και ευθύνη.",
      },
      { property: "og:title", content: "Όροι & Προϋποθέσεις Χονδρικής — Dolce Bambini" },
      { property: "og:url", content: "https://dolcebambini.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://dolcebambini.lovable.app/terms" }],
  }),
  component: TermsPage,
});

type L = "el" | "en" | "it" | "es" | "pt";

const COPY: Record<L, {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: { h: string; p: string | string[] }[];
}> = {
  el: {
    eyebrow: "Πωλήσεις Χονδρικής",
    title: "Γενικοί Όροι & Προϋποθέσεις Χονδρικής Πώλησης",
    updated: "Τελευταία ενημέρωση: Σεπτέμβριος 2026",
    intro:
      "Οι παρόντες Όροι διέπουν όλες τις πωλήσεις χονδρικής της Dolce Bambini προς επαγγελματίες πελάτες. Με την υποβολή παραγγελίας, ο πελάτης αποδέχεται πλήρως τους παρόντες Όρους.",
    sections: [
      {
        h: "1. Στοιχεία Επιχείρησης",
        p: ["Dolce Bambini", `Διεύθυνση: ${CONTACT.address.el}`, `Τηλέφωνο: ${CONTACT.phone}`, `Email: ${CONTACT.email}`],
      },
      {
        h: "2. Πελάτες Χονδρικής",
        p: "Πωλούμε αποκλειστικά σε επιχειρήσεις (καταστήματα λιανικής, boutiques, διανομείς). Για το άνοιγμα λογαριασμού απαιτούνται επωνυμία, ΑΦΜ/ΑΦΜ ενδοκοινοτικό, ΔΟΥ και διεύθυνση έδρας. Διατηρούμε το δικαίωμα να αρνηθούμε ή να ακυρώσουμε λογαριασμό κατά την κρίση μας.",
      },
      {
        h: "3. Παραγγελίες",
        p: "Οι παραγγελίες υποβάλλονται γραπτώς (email ή μέσω αντιπροσώπου) και θεωρούνται δεσμευτικές μόνο μετά από γραπτή επιβεβαίωσή μας. Ενδέχεται να ισχύει ελάχιστη ποσότητα ή αξία παραγγελίας ανά κωδικό/σειρά μεγεθών. Οι προπαραγγελίες εποχής (pre-orders) δεν ακυρώνονται μετά την επιβεβαίωση. Η διαθεσιμότητα δεν είναι εγγυημένη μέχρι την επιβεβαίωση.",
      },
      {
        h: "4. Τιμές",
        p: "Οι τιμές είναι τιμές χονδρικής σε ευρώ (€), χωρίς ΦΠΑ και χωρίς έξοδα αποστολής, εκτός αν ορίζεται διαφορετικά. Ισχύουν οι τιμές του τρέχοντος τιμοκαταλόγου κατά την επιβεβαίωση της παραγγελίας. Οι προτεινόμενες τιμές λιανικής είναι ενδεικτικές.",
      },
      {
        h: "5. Πληρωμή",
        p: "Για νέους πελάτες η πληρωμή γίνεται με προκαταβολή μέσω τραπεζικής μεταφοράς πριν την αποστολή. Για εγκεκριμένους πελάτες ενδέχεται να συμφωνηθεί πίστωση ή προκαταβολή για προπαραγγελίες. Σε περίπτωση καθυστέρησης πληρωμής, διατηρούμε το δικαίωμα αναστολής αποστολών και χρέωσης νόμιμων τόκων υπερημερίας.",
      },
      {
        h: "6. Παράδοση & Αποστολή",
        p: "Οι ημερομηνίες παράδοσης είναι ενδεικτικές και οι μικρές καθυστερήσεις δεν δίνουν δικαίωμα ακύρωσης ή αποζημίωσης. Ο κίνδυνος μεταβιβάζεται στον πελάτη με την παράδοση των εμπορευμάτων στον μεταφορέα. Μερικές αποστολές επιτρέπονται και τιμολογούνται χωριστά.",
      },
      {
        h: "7. Έλεγχος & Παράπονα",
        p: "Ο πελάτης οφείλει να ελέγχει τα εμπορεύματα κατά την παραλαβή. Εμφανείς ζημιές στη συσκευασία σημειώνονται στο παραστατικό του μεταφορέα. Ελλείψεις, λανθασμένα είδη ή ελαττώματα πρέπει να αναφέρονται γραπτώς εντός 7 ημερών από την παραλαβή, μαζί με φωτογραφίες και αριθμό τιμολογίου.",
      },
      {
        h: "8. Επιστροφές",
        p: "Δεν γίνονται δεκτές επιστροφές για λόγους αλλαγής γνώμης ή μη πώλησης. Επιστροφές γίνονται δεκτές μόνο για ελαττωματικά ή λανθασμένα είδη, κατόπιν γραπτής έγκρισής μας, σε αχρησιμοποίητη κατάσταση και με τις αρχικές ετικέτες. Κατά την κρίση μας, τα είδη αντικαθίστανται, επισκευάζονται ή πιστώνονται.",
      },
      {
        h: "9. Παρακράτηση Κυριότητας",
        p: "Τα εμπορεύματα παραμένουν στην κυριότητα της Dolce Bambini μέχρι την πλήρη εξόφληση του τιμολογίου.",
      },
      {
        h: "10. Πνευματική Ιδιοκτησία",
        p: "Το εμπορικό σήμα, τα σχέδια, οι φωτογραφίες και το υλικό προώθησης της Dolce Bambini αποτελούν πνευματική μας ιδιοκτησία. Οι πελάτες μπορούν να χρησιμοποιούν τις φωτογραφίες προϊόντων αποκλειστικά για την προώθηση γνήσιων προϊόντων Dolce Bambini. Απαγορεύεται η αντιγραφή σχεδίων και η πώληση σε πλατφόρμες ή τιμές που βλάπτουν το brand χωρίς έγκρισή μας.",
      },
      {
        h: "11. Περιορισμός Ευθύνης",
        p: "Η ευθύνη μας περιορίζεται στην αξία τιμολογίου των σχετικών εμπορευμάτων. Δεν ευθυνόμαστε για έμμεσες ή αποθετικές ζημίες, όπως διαφυγόντα κέρδη. Μικρές αποκλίσεις χρώματος ή υφής σε σχέση με φωτογραφίες ή δείγματα δεν θεωρούνται ελαττώματα.",
      },
      {
        h: "12. Ανωτέρα Βία",
        p: "Δεν ευθυνόμαστε για καθυστέρηση ή αδυναμία εκτέλεσης λόγω γεγονότων εκτός του ελέγχου μας (φυσικές καταστροφές, απεργίες, διακοπές μεταφορών, ελλείψεις πρώτων υλών, κρατικά μέτρα κ.λπ.).",
      },
      {
        h: "13. Εφαρμοστέο Δίκαιο",
        p: "Οι παρόντες Όροι διέπονται από το ελληνικό δίκαιο. Για κάθε διαφορά αρμόδια είναι τα δικαστήρια των Αθηνών.",
      },
      {
        h: "14. Επικοινωνία",
        p: `Για οποιαδήποτε ερώτηση σχετικά με τους παρόντες Όρους: ${CONTACT.email} · ${CONTACT.phone}`,
      },
    ],
  },
  en: {
    eyebrow: "Wholesale",
    title: "Wholesale Terms & Conditions of Sale",
    updated: "Last updated: September 2026",
    intro:
      "These Terms govern all wholesale sales by Dolce Bambini to trade customers. By placing an order, the customer fully accepts these Terms.",
    sections: [
      { h: "1. Company Details", p: ["Dolce Bambini", CONTACT.address.en, `Phone: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. Trade Customers", p: "We sell exclusively to businesses (retail stores, boutiques, distributors). To open an account we require the company name, VAT number (EU VAT number for intra-EU customers) and registered address. We reserve the right to refuse or close any account at our discretion." },
      { h: "3. Orders", p: "Orders must be placed in writing (email or via an agent) and become binding only once confirmed by us in writing. A minimum order quantity or value per style/size run may apply. Seasonal pre-orders cannot be cancelled once confirmed. Availability is not guaranteed until confirmation." },
      { h: "4. Prices", p: "Prices are wholesale prices in euros (€), excluding VAT and shipping unless stated otherwise. The price list in force at the date of order confirmation applies. Recommended retail prices are indicative only." },
      { h: "5. Payment", p: "New customers pay in advance by bank transfer before dispatch. Credit terms or deposits on pre-orders may be agreed with approved customers. In the event of late payment we may suspend deliveries and charge statutory late-payment interest." },
      { h: "6. Delivery & Shipping", p: "Delivery dates are estimates; minor delays do not entitle the customer to cancel or claim compensation. Risk passes to the customer when goods are handed to the carrier. Partial shipments are permitted and invoiced separately." },
      { h: "7. Inspection & Claims", p: "The customer must inspect goods on receipt. Visible damage to packaging must be noted on the carrier's delivery note. Shortages, wrong items or defects must be reported in writing within 7 days of receipt, with photos and the invoice number." },
      { h: "8. Returns", p: "Returns are not accepted for change of mind or unsold stock. Returns are accepted only for defective or incorrect items, with our prior written authorisation, unused and with original tags. At our discretion, items will be replaced, repaired or credited." },
      { h: "9. Retention of Title", p: "Goods remain the property of Dolce Bambini until the invoice has been paid in full." },
      { h: "10. Intellectual Property", p: "The Dolce Bambini trademark, designs, photographs and marketing materials are our intellectual property. Customers may use product images solely to promote genuine Dolce Bambini products. Copying designs, or selling on channels or at prices that harm the brand without our consent, is prohibited." },
      { h: "11. Limitation of Liability", p: "Our liability is limited to the invoice value of the goods concerned. We are not liable for indirect or consequential loss, including loss of profit. Minor variations in colour or texture compared with photos or samples are not defects." },
      { h: "12. Force Majeure", p: "We are not liable for delay or failure to perform caused by events beyond our reasonable control (natural disasters, strikes, transport disruption, raw-material shortages, government measures, etc.)." },
      { h: "13. Governing Law", p: "These Terms are governed by Greek law. The courts of Athens have exclusive jurisdiction over any dispute." },
      { h: "14. Contact", p: `For any question about these Terms: ${CONTACT.email} · ${CONTACT.phone}` },
    ],
  },
  it: {
    eyebrow: "Ingrosso",
    title: "Condizioni Generali di Vendita all'Ingrosso",
    updated: "Ultimo aggiornamento: Settembre 2026",
    intro:
      "Le presenti Condizioni regolano tutte le vendite all'ingrosso di Dolce Bambini a clienti professionali. Con l'invio di un ordine, il cliente accetta integralmente le presenti Condizioni.",
    sections: [
      { h: "1. Dati aziendali", p: ["Dolce Bambini", CONTACT.address.it, `Telefono: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. Clienti professionali", p: "Vendiamo esclusivamente ad aziende (negozi, boutique, distributori). Per l'apertura del conto sono richiesti ragione sociale, partita IVA (VIES per clienti UE) e sede legale. Ci riserviamo il diritto di rifiutare o chiudere un conto a nostra discrezione." },
      { h: "3. Ordini", p: "Gli ordini vanno inviati per iscritto (email o tramite agente) e diventano vincolanti solo dopo nostra conferma scritta. Può essere previsto un quantitativo o valore minimo per articolo/scala taglie. I pre-ordini stagionali confermati non sono annullabili. La disponibilità non è garantita fino alla conferma." },
      { h: "4. Prezzi", p: "I prezzi sono all'ingrosso in euro (€), IVA e spedizione escluse salvo diversa indicazione. Si applica il listino in vigore alla data di conferma. I prezzi al dettaglio consigliati sono indicativi." },
      { h: "5. Pagamento", p: "I nuovi clienti pagano anticipatamente tramite bonifico prima della spedizione. Per clienti approvati possono essere concordati termini di pagamento o acconti sui pre-ordini. In caso di ritardo possiamo sospendere le consegne e applicare gli interessi di mora di legge." },
      { h: "6. Consegna e spedizione", p: "I termini di consegna sono indicativi; lievi ritardi non danno diritto ad annullamento o risarcimento. Il rischio passa al cliente alla consegna al vettore. Sono ammesse spedizioni parziali, fatturate separatamente." },
      { h: "7. Controllo e reclami", p: "Il cliente deve controllare la merce al ricevimento. Danni visibili all'imballo vanno annotati sul documento del vettore. Mancanze, articoli errati o difetti vanno segnalati per iscritto entro 7 giorni, con foto e numero di fattura." },
      { h: "8. Resi", p: "Non si accettano resi per ripensamento o invenduto. Sono accettati solo resi di articoli difettosi o errati, previa nostra autorizzazione scritta, non utilizzati e con etichette originali. A nostra discrezione gli articoli saranno sostituiti, riparati o accreditati." },
      { h: "9. Riserva di proprietà", p: "La merce resta di proprietà di Dolce Bambini fino al pagamento integrale della fattura." },
      { h: "10. Proprietà intellettuale", p: "Marchio, modelli, fotografie e materiali promozionali Dolce Bambini sono di nostra proprietà. Le immagini possono essere usate solo per promuovere prodotti originali Dolce Bambini. È vietato copiare i modelli o vendere su canali o a prezzi lesivi del marchio senza nostro consenso." },
      { h: "11. Limitazione di responsabilità", p: "La nostra responsabilità è limitata al valore fatturato della merce interessata. Non rispondiamo di danni indiretti o consequenziali, incluso il mancato guadagno. Lievi differenze di colore o tessuto rispetto a foto o campioni non costituiscono difetti." },
      { h: "12. Forza maggiore", p: "Non siamo responsabili per ritardi o inadempimenti dovuti a eventi al di fuori del nostro controllo (calamità, scioperi, interruzioni dei trasporti, carenza di materie prime, provvedimenti delle autorità, ecc.)." },
      { h: "13. Legge applicabile", p: "Le presenti Condizioni sono regolate dalla legge greca. Foro competente esclusivo: Atene." },
      { h: "14. Contatti", p: `${CONTACT.email} · ${CONTACT.phone}` },
    ],
  },
  es: {
    eyebrow: "Venta al por mayor",
    title: "Condiciones Generales de Venta al por Mayor",
    updated: "Última actualización: Septiembre 2026",
    intro:
      "Estas Condiciones rigen todas las ventas al por mayor de Dolce Bambini a clientes profesionales. Al realizar un pedido, el cliente acepta íntegramente estas Condiciones.",
    sections: [
      { h: "1. Datos de la empresa", p: ["Dolce Bambini", CONTACT.address.es, `Teléfono: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. Clientes profesionales", p: "Vendemos exclusivamente a empresas (tiendas, boutiques, distribuidores). Para abrir una cuenta se requieren razón social, NIF/IVA intracomunitario y domicilio social. Nos reservamos el derecho de rechazar o cerrar cualquier cuenta." },
      { h: "3. Pedidos", p: "Los pedidos se realizan por escrito (email o a través de agente) y son vinculantes solo tras nuestra confirmación escrita. Puede aplicarse un pedido mínimo por modelo/serie de tallas. Los pedidos anticipados de temporada confirmados no pueden cancelarse. La disponibilidad no está garantizada hasta la confirmación." },
      { h: "4. Precios", p: "Los precios son al por mayor en euros (€), sin IVA ni gastos de envío salvo indicación contraria. Se aplica la tarifa vigente en la fecha de confirmación. Los PVP recomendados son orientativos." },
      { h: "5. Pago", p: "Los nuevos clientes pagan por adelantado mediante transferencia antes del envío. Con clientes aprobados pueden acordarse plazos de pago o anticipos en pedidos anticipados. En caso de retraso podemos suspender entregas y aplicar los intereses legales de demora." },
      { h: "6. Entrega y envío", p: "Los plazos de entrega son orientativos; pequeños retrasos no dan derecho a cancelación ni indemnización. El riesgo se transmite al cliente al entregar la mercancía al transportista. Se permiten envíos parciales, facturados por separado." },
      { h: "7. Inspección y reclamaciones", p: "El cliente debe revisar la mercancía al recibirla. Los daños visibles en el embalaje deben anotarse en el albarán del transportista. Faltas, artículos erróneos o defectos deben comunicarse por escrito en un plazo de 7 días, con fotos y número de factura." },
      { h: "8. Devoluciones", p: "No se aceptan devoluciones por cambio de opinión o stock no vendido. Solo se aceptan devoluciones de artículos defectuosos o erróneos, con nuestra autorización previa por escrito, sin usar y con etiquetas originales. A nuestra elección, se sustituirán, repararán o abonarán." },
      { h: "9. Reserva de dominio", p: "La mercancía sigue siendo propiedad de Dolce Bambini hasta el pago íntegro de la factura." },
      { h: "10. Propiedad intelectual", p: "La marca, diseños, fotografías y materiales de marketing de Dolce Bambini son de nuestra propiedad. Las imágenes solo pueden usarse para promocionar productos originales Dolce Bambini. Se prohíbe copiar diseños o vender en canales o a precios que perjudiquen la marca sin nuestro consentimiento." },
      { h: "11. Limitación de responsabilidad", p: "Nuestra responsabilidad se limita al valor facturado de la mercancía afectada. No respondemos de daños indirectos o lucro cesante. Pequeñas variaciones de color o tejido respecto a fotos o muestras no se consideran defectos." },
      { h: "12. Fuerza mayor", p: "No somos responsables de retrasos o incumplimientos causados por hechos ajenos a nuestro control (catástrofes, huelgas, interrupciones del transporte, escasez de materias primas, medidas gubernamentales, etc.)." },
      { h: "13. Ley aplicable", p: "Estas Condiciones se rigen por la ley griega. Serán competentes los tribunales de Atenas." },
      { h: "14. Contacto", p: `${CONTACT.email} · ${CONTACT.phone}` },
    ],
  },
  pt: {
    eyebrow: "Venda por grosso",
    title: "Condições Gerais de Venda por Grosso",
    updated: "Última atualização: Setembro de 2026",
    intro:
      "Estas Condições regem todas as vendas por grosso da Dolce Bambini a clientes profissionais. Ao efetuar uma encomenda, o cliente aceita integralmente estas Condições.",
    sections: [
      { h: "1. Dados da empresa", p: ["Dolce Bambini", CONTACT.address.pt, `Telefone: ${CONTACT.phone}`, `Email: ${CONTACT.email}`] },
      { h: "2. Clientes profissionais", p: "Vendemos exclusivamente a empresas (lojas, boutiques, distribuidores). Para abrir conta são necessários denominação social, NIF/IVA intracomunitário e sede. Reservamo-nos o direito de recusar ou encerrar qualquer conta." },
      { h: "3. Encomendas", p: "As encomendas são feitas por escrito (email ou através de agente) e só são vinculativas após a nossa confirmação escrita. Pode aplicar-se uma quantidade ou valor mínimo por modelo/série de tamanhos. As pré-encomendas de estação confirmadas não podem ser canceladas. A disponibilidade não é garantida até à confirmação." },
      { h: "4. Preços", p: "Os preços são por grosso em euros (€), sem IVA nem portes, salvo indicação em contrário. Aplica-se a tabela em vigor na data da confirmação. Os PVP recomendados são indicativos." },
      { h: "5. Pagamento", p: "Os novos clientes pagam antecipadamente por transferência bancária antes do envio. Com clientes aprovados podem ser acordados prazos de pagamento ou sinais em pré-encomendas. Em caso de atraso podemos suspender entregas e cobrar juros de mora legais." },
      { h: "6. Entrega e envio", p: "Os prazos de entrega são indicativos; pequenos atrasos não dão direito a cancelamento ou indemnização. O risco transfere-se para o cliente com a entrega ao transportador. São permitidos envios parciais, faturados separadamente." },
      { h: "7. Inspeção e reclamações", p: "O cliente deve inspecionar a mercadoria na receção. Danos visíveis na embalagem devem ser registados na guia do transportador. Faltas, artigos errados ou defeitos devem ser comunicados por escrito no prazo de 7 dias, com fotos e número da fatura." },
      { h: "8. Devoluções", p: "Não são aceites devoluções por mudança de opinião ou stock não vendido. Só são aceites devoluções de artigos defeituosos ou errados, com a nossa autorização prévia por escrito, sem uso e com etiquetas originais. Ao nosso critério, serão substituídos, reparados ou creditados." },
      { h: "9. Reserva de propriedade", p: "A mercadoria permanece propriedade da Dolce Bambini até ao pagamento integral da fatura." },
      { h: "10. Propriedade intelectual", p: "A marca, modelos, fotografias e materiais de marketing da Dolce Bambini são nossa propriedade. As imagens só podem ser usadas para promover produtos originais Dolce Bambini. É proibido copiar modelos ou vender em canais ou a preços que prejudiquem a marca sem o nosso consentimento." },
      { h: "11. Limitação de responsabilidade", p: "A nossa responsabilidade limita-se ao valor faturado da mercadoria em causa. Não respondemos por danos indiretos ou lucros cessantes. Pequenas variações de cor ou tecido face a fotos ou amostras não constituem defeitos." },
      { h: "12. Força maior", p: "Não somos responsáveis por atrasos ou incumprimentos causados por eventos fora do nosso controlo (catástrofes, greves, perturbações nos transportes, falta de matérias-primas, medidas governamentais, etc.)." },
      { h: "13. Lei aplicável", p: "Estas Condições regem-se pela lei grega. São competentes os tribunais de Atenas." },
      { h: "14. Contacto", p: `${CONTACT.email} · ${CONTACT.phone}` },
    ],
  },
};

function TermsPage() {
  const { lang } = useLang();
  const c = COPY[lang as L] ?? COPY.el;
  return (
    <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-24">
      <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">{c.eyebrow}</div>
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
