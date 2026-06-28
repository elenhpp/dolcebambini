export type Lang = "el" | "en" | "it" | "es" | "pt";

// A translatable string/value: must have `en` (used as fallback); other langs optional.
export type Tr<T> = { en: T } & Partial<Record<Lang, T>>;

export const NAV: ReadonlyArray<{ key: string; to: string } & Record<Lang, string>> = [
  { key: "home",        to: "/",             el: "ΑΡΧΙΚΗ",            en: "HOME",                it: "HOME",                  es: "INICIO",                pt: "INÍCIO" },
  { key: "boys",        to: "/boys",         el: "ΑΓΟΡΙ",             en: "BOYS",                it: "BAMBINO",               es: "NIÑO",                  pt: "MENINO" },
  { key: "girls",       to: "/girls",        el: "ΚΟΡΙΤΣΙ",           en: "GIRLS",               it: "BAMBINA",               es: "NIÑA",                  pt: "MENINA" },
  { key: "silk",        to: "/silk",         el: "SILK COLLECTION",   en: "SILK COLLECTION",     it: "SILK COLLECTION",       es: "SILK COLLECTION",       pt: "SILK COLLECTION" },
  { key: "accessories", to: "/accessories",  el: "ΑΞΕΣΟΥΑΡ ΒΑΠΤΙΣΗΣ", en: "BAPTISM ACCESSORIES", it: "ACCESSORI BATTESIMO",   es: "ACCESORIOS DE BAUTIZO", pt: "ACESSÓRIOS DE BATISMO" },
  { key: "communion",   to: "/communion",    el: "COMMUNION",         en: "COMMUNION",           it: "COMUNIONE",             es: "COMUNIÓN",              pt: "COMUNHÃO" },
  { key: "sales",       to: "/sales-points", el: "ΣΗΜΕΙΑ ΠΩΛΗΣΗΣ",    en: "SALES POINTS",        it: "PUNTI VENDITA",         es: "PUNTOS DE VENTA",       pt: "PONTOS DE VENDA" },
  { key: "contact",     to: "/contact",      el: "ΕΠΙΚΟΙΝΩΝΙΑ",       en: "CONTACT",             it: "CONTATTI",              es: "CONTACTO",              pt: "CONTATO" },
] as const;

type ValueItem = { t: string; d: string };

export const T = {
  brand: { el: "Dolce Bambini", en: "Dolce Bambini", it: "Dolce Bambini", es: "Dolce Bambini", pt: "Dolce Bambini" },
  estd:  { el: "Από το 1978", en: "Established 1978", it: "Fondata nel 1978", es: "Desde 1978", pt: "Desde 1978" },

  heroTitle: {
    el: "Στιγμές που μένουν για πάντα",
    en: "Moments that last forever",
    it: "Momenti che durano per sempre",
    es: "Momentos que duran para siempre",
    pt: "Momentos que duram para sempre",
  },
  heroSub: {
    el: "Χειροποίητα βαπτιστικά & ενδύματα κοινωνίας με ρομαντική κομψότητα — Collection 2026.",
    en: "Handcrafted baptism & communion garments with romantic elegance — Collection 2026.",
    it: "Abiti da battesimo e comunione fatti a mano, con eleganza romantica — Collection 2026.",
    es: "Prendas de bautizo y comunión hechas a mano con elegancia romántica — Collection 2026.",
    pt: "Trajes de batismo e comunhão feitos à mão com elegância romântica — Collection 2026.",
  },
  heroCtaBoys:  { el: "Δείτε Αγόρι",   en: "Shop Boys",  it: "Scopri Bambino", es: "Ver Niño",  pt: "Ver Menino" },
  heroCtaGirls: { el: "Δείτε Κορίτσι", en: "Shop Girls", it: "Scopri Bambina", es: "Ver Niña",  pt: "Ver Menina" },

  storyTitle: { el: "Η Ιστορία μας", en: "Our Story", it: "La nostra storia", es: "Nuestra historia", pt: "A nossa história" },
  storyBody: {
    el: "Η Dolce Bambini ιδρύθηκε το 1978 στη Μελβούρνη της Αυστραλίας. Με πάνω από 40 χρόνια εμπειρίας, σχεδιάζουμε και κατασκευάζουμε χειροποίητα βαπτιστικά ρούχα που συνδυάζουν παράδοση και σύγχρονη αισθητική.",
    en: "Founded in 1978 in Melbourne, Australia, Dolce Bambini brings over 40 years of experience designing and crafting handmade baptism garments that blend tradition with contemporary elegance.",
    it: "Fondata nel 1978 a Melbourne, in Australia, Dolce Bambini vanta oltre 40 anni di esperienza nel disegnare e realizzare a mano abiti da battesimo che uniscono tradizione ed eleganza contemporanea.",
    es: "Fundada en 1978 en Melbourne, Australia, Dolce Bambini cuenta con más de 40 años de experiencia diseñando y confeccionando a mano prendas de bautizo que unen tradición y elegancia contemporánea.",
    pt: "Fundada em 1978 em Melbourne, Austrália, a Dolce Bambini traz mais de 40 anos de experiência a desenhar e confecionar à mão trajes de batismo que unem tradição e elegância contemporânea.",
  },

  values: {
    el: [
      { t: "Υψηλή Ποιότητα", d: "Επιλεγμένα υφάσματα και άριστη ραφή σε κάθε λεπτομέρεια." },
      { t: "Μοναδικά Σχέδια", d: "Σύγχρονα σχέδια με ρομαντική, διαχρονική κομψότητα." },
      { t: "Νέες Συλλογές", d: "Συνεχώς ανανεωμένες συλλογές κάθε σεζόν." },
      { t: "Χειροποίητα", d: "Κάθε ένδυμα κατασκευάζεται χειροποίητα με αγάπη." },
    ] as ValueItem[],
    en: [
      { t: "Premium Quality", d: "Carefully selected fabrics and impeccable tailoring." },
      { t: "Unique Designs", d: "Modern silhouettes with timeless, romantic elegance." },
      { t: "New Collections", d: "Fresh collections released each season." },
      { t: "Handmade", d: "Every garment crafted by hand with love." },
    ] as ValueItem[],
    it: [
      { t: "Qualità Premium", d: "Tessuti selezionati con cura e sartoria impeccabile." },
      { t: "Design Unico", d: "Silhouette moderne con un'eleganza romantica e senza tempo." },
      { t: "Nuove Collezioni", d: "Collezioni rinnovate ad ogni stagione." },
      { t: "Fatto a Mano", d: "Ogni capo realizzato a mano con amore." },
    ] as ValueItem[],
    es: [
      { t: "Calidad Premium", d: "Tejidos seleccionados con cuidado y confección impecable." },
      { t: "Diseños Únicos", d: "Siluetas modernas con elegancia romántica y atemporal." },
      { t: "Nuevas Colecciones", d: "Colecciones renovadas en cada temporada." },
      { t: "Hecho a Mano", d: "Cada prenda confeccionada a mano con amor." },
    ] as ValueItem[],
    pt: [
      { t: "Qualidade Premium", d: "Tecidos cuidadosamente selecionados e confeção impecável." },
      { t: "Design Único", d: "Silhuetas modernas com elegância romântica e atemporal." },
      { t: "Novas Coleções", d: "Coleções renovadas a cada estação." },
      { t: "Feito à Mão", d: "Cada peça feita à mão com amor." },
    ] as ValueItem[],
  } satisfies Record<Lang, ValueItem[]>,

  sizeChart:    { el: "Πίνακας Μεγεθών", en: "Size Chart", it: "Tabella Taglie", es: "Tabla de Tallas", pt: "Tabela de Tamanhos" },
  sizeChartCta: { el: "Κατεβάστε τον πίνακα", en: "Download size guide", it: "Scarica la guida taglie", es: "Descargar guía de tallas", pt: "Descarregar guia de tamanhos" },
  sizeChartBody: {
    el: "Δείτε αναλυτικά τα μεγέθη μας για να επιλέξετε το ιδανικό ένδυμα για το παιδί σας.",
    en: "View detailed measurements to choose the ideal garment for your child.",
    it: "Consulta le misure dettagliate per scegliere il capo ideale per il tuo bambino.",
    es: "Consulta las medidas detalladas para elegir la prenda ideal para tu hijo.",
    pt: "Veja as medidas detalhadas para escolher a peça ideal para o seu filho.",
  },

  viewDetails: { el: "Δείτε περισσότερα", en: "View details", it: "Vedi dettagli", es: "Ver detalles", pt: "Ver detalhes" },
  code:        { el: "Κωδικός", en: "Code", it: "Codice", es: "Código", pt: "Código" },

  pages: {
    boys: {
      title: { el: "Αγόρι", en: "Boys", it: "Bambino", es: "Niño", pt: "Menino" },
      sub:   { el: "Collection 2026", en: "Collection 2026", it: "Collection 2026", es: "Collection 2026", pt: "Collection 2026" },
    },
    girls: {
      title: { el: "Κορίτσι", en: "Girls", it: "Bambina", es: "Niña", pt: "Menina" },
      sub:   { el: "Collection 2026", en: "Collection 2026", it: "Collection 2026", es: "Collection 2026", pt: "Collection 2026" },
    },
    silk: {
      title: { el: "Silk Collection", en: "Silk Collection", it: "Silk Collection", es: "Silk Collection", pt: "Silk Collection" },
      sub:   { el: "Πολυτέλεια σε μετάξι", en: "Luxury in silk", it: "Lusso in seta", es: "Lujo en seda", pt: "Luxo em seda" },
    },
    accessories: {
      title: { el: "Αξεσουάρ Βάπτισης", en: "Baptism Accessories", it: "Accessori Battesimo", es: "Accesorios de Bautizo", pt: "Acessórios de Batismo" },
      sub:   { el: "Σετ & συμπληρώματα", en: "Sets & complements", it: "Set e complementi", es: "Conjuntos y complementos", pt: "Conjuntos e complementos" },
    },
    communion: {
      title: { el: "Communion", en: "Communion", it: "Comunione", es: "Comunión", pt: "Comunhão" },
      sub:   { el: "Συλλογή Πρώτης Κοινωνίας", en: "First Communion collection", it: "Collezione Prima Comunione", es: "Colección Primera Comunión", pt: "Coleção Primeira Comunhão" },
    },
    sales: {
      title: { el: "Σημεία Πώλησης", en: "Sales Points", it: "Punti Vendita", es: "Puntos de Venta", pt: "Pontos de Venda" },
      sub:   { el: "Βρείτε μας σε επιλεγμένα καταστήματα", en: "Find us at select retailers", it: "Trovaci nei rivenditori selezionati", es: "Encuéntranos en tiendas selectas", pt: "Encontre-nos em lojas selecionadas" },
    },
    contact: {
      title: { el: "Επικοινωνία", en: "Contact", it: "Contatti", es: "Contacto", pt: "Contato" },
      sub:   { el: "Είμαστε εδώ για εσάς", en: "We are here for you", it: "Siamo qui per te", es: "Estamos aquí para ti", pt: "Estamos aqui para si" },
    },
  },

  salesNote: {
    el: "Δείτε τα καταστήματα που διαθέτουν Dolce Bambini σε όλη την Ελλάδα.",
    en: "Discover the stores carrying Dolce Bambini across Greece.",
    it: "Scopri i negozi che vendono Dolce Bambini in tutta la Grecia.",
    es: "Descubre las tiendas que ofrecen Dolce Bambini en toda Grecia.",
    pt: "Descubra as lojas que comercializam Dolce Bambini em toda a Grécia.",
  },
  salesPlaceholder: {
    el: "Σύντομα αναλυτική λίστα και χάρτης καταστημάτων.",
    en: "Detailed store list and map coming soon.",
    it: "Elenco dettagliato dei negozi e mappa in arrivo.",
    es: "Lista detallada de tiendas y mapa próximamente.",
    pt: "Lista detalhada de lojas e mapa em breve.",
  },

  contactForm: {
    name:    { el: "Όνομα", en: "Name", it: "Nome", es: "Nombre", pt: "Nome" },
    email:   { el: "Email", en: "Email", it: "Email", es: "Correo", pt: "Email" },
    message: { el: "Μήνυμα", en: "Message", it: "Messaggio", es: "Mensaje", pt: "Mensagem" },
    send:    { el: "Αποστολή", en: "Send message", it: "Invia messaggio", es: "Enviar mensaje", pt: "Enviar mensagem" },
    sent:    {
      el: "Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα.",
      en: "Thank you! We will be in touch soon.",
      it: "Grazie! Ti contatteremo presto.",
      es: "¡Gracias! Nos pondremos en contacto pronto.",
      pt: "Obrigado! Entraremos em contacto em breve.",
    },
  },

  footer: {
    tagline: {
      el: "Χειροποίητη κομψότητα από το 1978.",
      en: "Handcrafted elegance since 1978.",
      it: "Eleganza fatta a mano dal 1978.",
      es: "Elegancia hecha a mano desde 1978.",
      pt: "Elegância feita à mão desde 1978.",
    },
    quickLinks: { el: "Πλοήγηση", en: "Navigation", it: "Navigazione", es: "Navegación", pt: "Navegação" },
    contact:    { el: "Επικοινωνία", en: "Contact", it: "Contatti", es: "Contacto", pt: "Contato" },
    follow:     { el: "Ακολουθήστε μας", en: "Follow us", it: "Seguici", es: "Síguenos", pt: "Siga-nos" },
    rights:     { el: "Με επιφύλαξη παντός δικαιώματος.", en: "All rights reserved.", it: "Tutti i diritti riservati.", es: "Todos los derechos reservados.", pt: "Todos os direitos reservados." },
    designed:   { el: "Σχεδίαση με αγάπη", en: "Designed with love", it: "Disegnato con amore", es: "Diseñado con amor", pt: "Desenhado com amor" },
  },

  // Inline copy used across routes
  copy: {
    since1978:       { el: "Από το 1978", en: "Since 1978", it: "Dal 1978", es: "Desde 1978", pt: "Desde 1978" },
    featuredPieces:  { el: "Επιλεγμένα κομμάτια", en: "Featured pieces", it: "Pezzi in evidenza", es: "Piezas destacadas", pt: "Peças em destaque" },
    allGirls:        { el: "Όλα τα κορίτσια", en: "All girls", it: "Tutte le bambine", es: "Todas las niñas", pt: "Todas as meninas" },
    allBoys:         { el: "Όλα τα αγόρια", en: "All boys", it: "Tutti i bambini", es: "Todos los niños", pt: "Todos os meninos" },
    perfectSize:     { el: "Βρείτε το ιδανικό μέγεθος", en: "Find the perfect size", it: "Trova la taglia perfetta", es: "Encuentra la talla ideal", pt: "Encontre o tamanho ideal" },
    getInTouch:      { el: "Στοιχεία Επικοινωνίας", en: "Get in Touch", it: "Contattaci", es: "Datos de Contacto", pt: "Entre em Contacto" },
    googleMap:       { el: "Χάρτης Google", en: "Google Map", it: "Mappa Google", es: "Mapa de Google", pt: "Mapa do Google" },
    flagshipStore:   { el: "Κεντρικό Κατάστημα", en: "Flagship Store", it: "Negozio Principale", es: "Tienda Insignia", pt: "Loja Principal" },
    visitGlyfada:    { el: "Επισκεφθείτε μας στη Γλυφάδα.", en: "Visit us in Glyfada.", it: "Visitaci a Glyfada.", es: "Visítanos en Glyfada.", pt: "Visite-nos em Glyfada." },
    map:             { el: "Χάρτης", en: "Map", it: "Mappa", es: "Mapa", pt: "Mapa" },
    baptismalFallback: { el: "Βαπτιστικό", en: "Baptismal Outfit", it: "Completo da Battesimo", es: "Conjunto de Bautizo", pt: "Traje de Batismo" },
  },
} as const;

export const CONTACT = {
  address: {
    el: "Δωδεκανήσου 47, Γλυφάδα 165 62",
    en: "47 Dodekanisou St., Glyfada 165 62, Athens, Greece",
    it: "Via Dodekanisou 47, Glyfada 165 62, Atene, Grecia",
    es: "Calle Dodekanisou 47, Glyfada 165 62, Atenas, Grecia",
    pt: "Rua Dodekanisou 47, Glyfada 165 62, Atenas, Grécia",
  },
  phone: "+30 210 96 03 035",
  email: "info@dolcebambini.gr",
};

export type Product = {
  code: string;
  image: string;
  title?: Tr<string>;
  desc?: Tr<string>;
};

const IMG = "https://dolcebambini.gr/images";

export const PRODUCTS: Record<string, Product[]> = {
  boys: [
    {
      code: "7135",
      image: `${IMG}/Collection2026/7135.jpg`,
      title: {
        el: "Βαπτιστικό Σύνολο 7135",
        en: "Baptismal Ensemble 7135",
        it: "Completo da Battesimo 7135",
        es: "Conjunto de Bautizo 7135",
        pt: "Conjunto de Batismo 7135",
      },
      desc: {
        el: "Ρομαντικό βαπτιστικό σύνολο με φυσική κομψότητα. Λινό πουκάμισο με ελαφριά υφή, λινό παντελόνι, τιράντες και ελαφρύ αξεσουάρ λαιμού.",
        en: "Romantic baptismal ensemble with natural elegance. Linen shirt with light texture, linen trousers, suspenders and a lightweight neck accessory.",
        it: "Romantico completo da battesimo con eleganza naturale. Camicia in lino dalla texture leggera, pantaloni in lino, bretelle e un delicato accessorio per il collo.",
        es: "Romántico conjunto de bautizo con elegancia natural. Camisa de lino con textura ligera, pantalón de lino, tirantes y un delicado accesorio para el cuello.",
        pt: "Conjunto de batismo romântico com elegância natural. Camisa de linho de textura leve, calça de linho, suspensórios e um leve acessório de pescoço.",
      },
    },
    {
      code: "7130",
      image: `${IMG}/Collection2026/7130.jpg`,
      title: {
        el: "Βαπτιστικό Σύνολο 7130",
        en: "Baptismal Ensemble 7130",
        it: "Completo da Battesimo 7130",
        es: "Conjunto de Bautizo 7130",
        pt: "Conjunto de Batismo 7130",
      },
      desc: {
        el: "Σύνολο που συνδυάζει vintage επιρροές με σύγχρονο σχεδιασμό. Απαλό βαμβακερό πουκάμισο, υψηλής ποιότητας βαμβακερό παντελόνι, τιράντες και ελαφρύ μαντήλι.",
        en: "Baptismal ensemble blending vintage influences with contemporary design. Soft cotton shirt, high-quality cotton trousers, suspenders and a light scarf.",
        it: "Completo che unisce influenze vintage a un design contemporaneo. Camicia in cotone morbido, pantaloni in cotone di alta qualità, bretelle e un foulard leggero.",
        es: "Conjunto que combina influencias vintage con un diseño contemporáneo. Camisa de algodón suave, pantalón de algodón de alta calidad, tirantes y un pañuelo ligero.",
        pt: "Conjunto que une influências vintage a um design contemporâneo. Camisa de algodão suave, calça de algodão de alta qualidade, suspensórios e um lenço leve.",
      },
    },
    { code: "7134", image: `${IMG}/Collection2026/7134.jpg` },
    { code: "7133", image: `${IMG}/Collection2026/7133-a.jpg` },
    { code: "7132", image: `${IMG}/Collection2026/7132.jpg` },
    { code: "7131", image: `${IMG}/Collection2026/7131-a.jpg` },
    { code: "7129", image: `${IMG}/Collection2026/7129-a.jpg` },
    { code: "7128", image: `${IMG}/Collection2026/7128-a.jpg` },
    { code: "7127", image: `${IMG}/Collection2026/7127.jpg` },
    { code: "7126", image: `${IMG}/Collection2026/7126-a.jpg` },
  ],
  girls: [
    {
      code: "C11-4",
      image: `${IMG}/Collection2026/C11-4b.jpg`,
      title: { el: "Φόρεμα C11-4", en: "Dress C11-4" },
      desc: {
        el: "Παραμυθένιο βαπτιστικό φόρεμα με girly χαρακτήρα και εντυπωσιακή σιλουέτα. Μπούστο με παγιέτες, πολυεπίπεδη φούστα από glitter τούλι, βαμβακερή φόδρα, διακοσμητικό λουλούδι μέσης. Χρώμα: απαλό ροζ.",
        en: "Fairy-tale christening gown with a girlish character and striking silhouette. Sequin-embellished bodice, multi-layered glitter tulle skirt, cotton lining, decorative waist flower. Pale pink.",
      },
    },
    {
      code: "7028",
      image: `${IMG}/Collection2026/7028b.jpg`,
      title: { el: "Φόρεμα 7028", en: "Dress 7028" },
      desc: {
        el: "Λεπτό μπούστο από δαντέλα με διακριτικό κέντημα, σατέν φούστα με κομψό όγκο και πτυχώσεις, εσωτερική στρώση δαντέλας, βαμβακερή φόδρα και διακοσμητικές λεπτομέρειες στη μέση. Χρώμα: εκρού.",
        en: "Fine lace bodice with subtle embroidery, satin skirt with elegant drape, interior lace layer, cotton lining and decorative waist details. Cream.",
      },
    },
    { code: "9905",   image: `${IMG}/Collection2026/9905b.jpg` },
    { code: "9898",   image: `${IMG}/Collection2026/9898.jpg` },
    { code: "9896-5", image: `${IMG}/Collection2026/9896-5b.jpg` },
    { code: "7031",   image: `${IMG}/Collection2026/7031.jpg` },
    { code: "7029",   image: `${IMG}/Collection2026/7029.jpg` },
    { code: "7027-1", image: `${IMG}/Collection2026/7027-1.jpg` },
  ],
  silk: [
    {
      code: "G432-1",
      image: `${IMG}/silk_collection/G432-1/g4321-front.jpg`,
      title: { el: "Φόρεμα G432-1", en: "Dress G432-1" },
      desc: {
        el: "Μακρύ φόρεμα με κοντά μανίκια από υψηλής ποιότητας μετάξι. Δαντέλα με χάντρες και παγιέτες σε baroque/floral σχέδια στο τελείωμα. 100% βαμβακερή υποαλλεργική φόδρα. Διαθέσιμο σε ivory ή λευκό. Μήκος 85cm. Περιλαμβάνει σκουφάκι και παπουτσάκια.",
        en: "Long short-sleeved dress in premium silk. Lace trim with bead and sequin embellishments forming baroque/floral patterns at the hem. 100% cotton hypoallergenic lining. Available in ivory or white. 85cm length. Includes bonnet and shoes.",
      },
    },
    { code: "G521-1", image: `${IMG}/silk_collection/G521-1/g5211-front.jpg` },
    { code: "G531-1", image: `${IMG}/silk_collection/G531-1/g5311-front.jpg` },
    { code: "G541-1", image: `${IMG}/silk_collection/G541-1/g5411-front.jpg` },
    { code: "G551-1", image: `${IMG}/silk_collection/G551-1/g5511-front.jpg` },
    { code: "G565-1", image: `${IMG}/silk_collection/G565-1/g565-front.jpg` },
  ],
  accessories: [
    {
      code: "K46-7005",
      image: `${IMG}/Collection2026/SetVaptisis/K46-7005.jpg`,
      title: { el: "Σετ Βάπτισης K46-7005", en: "Baptism Set K46-7005" },
      desc: {
        el: "Συντονισμένο σετ αξεσουάρ βάπτισης για μια ολοκληρωμένη παρουσία.",
        en: "Coordinated christening accessory set for a complete presentation.",
      },
    },
    { code: "K45-7021", image: `${IMG}/Collection2026/SetVaptisis/K45-7021.jpg` },
    { code: "K44-7012", image: `${IMG}/Collection2026/SetVaptisis/K44-7012_set_vaptisis.jpg` },
    { code: "A46-7110", image: `${IMG}/Collection2026/SetVaptisis/A46-7110_candle.jpg` },
    { code: "A44-7125", image: `${IMG}/Collection2026/SetVaptisis/A44-7125.jpg` },
  ],
  communion: [
    {
      code: "570-1",
      image: `${IMG}/communion/570-1_01.jpg`,
      title: { el: "Φόρεμα Κοινωνίας 570-1", en: "Communion Dress 570-1" },
      desc: {
        el: "Φόρεμα κοινωνίας από τη συλλογή Dolce Bambini, για μια αξέχαστη ημέρα.",
        en: "Communion dress from the Dolce Bambini collection, for an unforgettable day.",
      },
    },
    { code: "6002-1", image: `${IMG}/communion/6002-1_01.jpg` },
    { code: "6004-1", image: `${IMG}/communion/6004-1_01.jpg` },
    { code: "6020-1", image: `${IMG}/communion/6020-1_01.jpg` },
    { code: "C01-1",  image: `${IMG}/communion/C01-1_01.jpg` },
    { code: "C04-1",  image: `${IMG}/communion/C04-1_01.jpg` },
  ],
};
