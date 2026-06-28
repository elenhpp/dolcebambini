export type Lang = "el" | "en";

export const NAV = [
  { key: "home", to: "/", el: "ΑΡΧΙΚΗ", en: "HOME" },
  { key: "boys", to: "/boys", el: "ΑΓΟΡΙ", en: "BOYS" },
  { key: "girls", to: "/girls", el: "ΚΟΡΙΤΣΙ", en: "GIRLS" },
  { key: "silk", to: "/silk", el: "SILK COLLECTION", en: "SILK COLLECTION" },
  { key: "accessories", to: "/accessories", el: "ΑΞΕΣΟΥΑΡ ΒΑΠΤΙΣΗΣ", en: "BAPTISM ACCESSORIES" },
  { key: "communion", to: "/communion", el: "COMMUNION", en: "COMMUNION" },
  { key: "sales", to: "/sales-points", el: "ΣΗΜΕΙΑ ΠΩΛΗΣΗΣ", en: "SALES POINTS" },
  { key: "contact", to: "/contact", el: "ΕΠΙΚΟΙΝΩΝΙΑ", en: "CONTACT" },
] as const;

export const T = {
  brand: { el: "Dolce Bambini", en: "Dolce Bambini" },
  estd: { el: "Από το 1978", en: "Established 1978" },
  heroTitle: {
    el: "Στιγμές που μένουν για πάντα",
    en: "Moments that last forever",
  },
  heroSub: {
    el: "Χειροποίητα βαπτιστικά & ενδύματα κοινωνίας με ρομαντική κομψότητα — Collection 2026.",
    en: "Handcrafted baptism & communion garments with romantic elegance — Collection 2026.",
  },
  heroCtaBoys: { el: "Δείτε Αγόρι", en: "Shop Boys" },
  heroCtaGirls: { el: "Δείτε Κορίτσι", en: "Shop Girls" },

  storyTitle: { el: "Η Ιστορία μας", en: "Our Story" },
  storyBody: {
    el: "Η Dolce Bambini ιδρύθηκε το 1978 στη Μελβούρνη της Αυστραλίας. Με πάνω από 40 χρόνια εμπειρίας, σχεδιάζουμε και κατασκευάζουμε χειροποίητα βαπτιστικά ρούχα που συνδυάζουν παράδοση και σύγχρονη αισθητική.",
    en: "Founded in 1978 in Melbourne, Australia, Dolce Bambini brings over 40 years of experience designing and crafting handmade baptism garments that blend tradition with contemporary elegance.",
  },

  values: {
    el: [
      { t: "Υψηλή Ποιότητα", d: "Επιλεγμένα υφάσματα και άριστη ραφή σε κάθε λεπτομέρεια." },
      { t: "Μοναδικά Σχέδια", d: "Σύγχρονα σχέδια με ρομαντική, διαχρονική κομψότητα." },
      { t: "Νέες Συλλογές", d: "Συνεχώς ανανεωμένες συλλογές κάθε σεζόν." },
      { t: "Χειροποίητα", d: "Κάθε ένδυμα κατασκευάζεται χειροποίητα με αγάπη." },
    ] as { t: string; d: string }[],
    en: [
      { t: "Premium Quality", d: "Carefully selected fabrics and impeccable tailoring." },
      { t: "Unique Designs", d: "Modern silhouettes with timeless, romantic elegance." },
      { t: "New Collections", d: "Fresh collections released each season." },
      { t: "Handmade", d: "Every garment crafted by hand with love." },
    ] as { t: string; d: string }[],
  },

  sizeChart: { el: "Πίνακας Μεγεθών", en: "Size Chart" },
  sizeChartCta: { el: "Κατεβάστε τον πίνακα", en: "Download size guide" },
  sizeChartBody: {
    el: "Δείτε αναλυτικά τα μεγέθη μας για να επιλέξετε το ιδανικό ένδυμα για το παιδί σας.",
    en: "View detailed measurements to choose the ideal garment for your child.",
  },

  viewDetails: { el: "Δείτε περισσότερα", en: "View details" },
  code: { el: "Κωδικός", en: "Code" },

  pages: {
    boys:        { el: { title: "Αγόρι", sub: "Collection 2026" }, en: { title: "Boys", sub: "Collection 2026" } },
    girls:       { el: { title: "Κορίτσι", sub: "Collection 2026" }, en: { title: "Girls", sub: "Collection 2026" } },
    silk:        { el: { title: "Silk Collection", sub: "Πολυτέλεια σε μετάξι" }, en: { title: "Silk Collection", sub: "Luxury in silk" } },
    accessories: { el: { title: "Αξεσουάρ Βάπτισης", sub: "Σετ & συμπληρώματα" }, en: { title: "Baptism Accessories", sub: "Sets & complements" } },
    communion:   { el: { title: "Communion", sub: "Συλλογή Πρώτης Κοινωνίας" }, en: { title: "Communion", sub: "First Communion collection" } },
    sales:       { el: { title: "Σημεία Πώλησης", sub: "Βρείτε μας σε επιλεγμένα καταστήματα" }, en: { title: "Sales Points", sub: "Find us at select retailers" } },
    contact:     { el: { title: "Επικοινωνία", sub: "Είμαστε εδώ για εσάς" }, en: { title: "Contact", sub: "We are here for you" } },
  },

  salesNote: {
    el: "Δείτε τα καταστήματα που διαθέτουν Dolce Bambini σε όλη την Ελλάδα.",
    en: "Discover the stores carrying Dolce Bambini across Greece.",
  },
  salesPlaceholder: {
    el: "Σύντομα αναλυτική λίστα και χάρτης καταστημάτων.",
    en: "Detailed store list and map coming soon.",
  },

  contactForm: {
    name: { el: "Όνομα", en: "Name" },
    email: { el: "Email", en: "Email" },
    message: { el: "Μήνυμα", en: "Message" },
    send: { el: "Αποστολή", en: "Send message" },
    sent: { el: "Ευχαριστούμε! Θα επικοινωνήσουμε σύντομα.", en: "Thank you! We will be in touch soon." },
  },

  footer: {
    tagline: { el: "Χειροποίητη κομψότητα από το 1978.", en: "Handcrafted elegance since 1978." },
    quickLinks: { el: "Πλοήγηση", en: "Navigation" },
    contact: { el: "Επικοινωνία", en: "Contact" },
    follow: { el: "Ακολουθήστε μας", en: "Follow us" },
    rights: { el: "Με επιφύλαξη παντός δικαιώματος.", en: "All rights reserved." },
  },
} as const;

export const CONTACT = {
  address: "Δωδεκανήσου 47, Γλυφάδα 165 62",
  addressEn: "47 Dodekanisou St., Glyfada 165 62, Athens, Greece",
  phone: "+30 210 96 03 035",
  email: "info@dolcebambini.gr",
};

export type Product = {
  code: string;
  image: string;
  title?: { el: string; en: string };
  desc?: { el: string; en: string };
};

const IMG = "https://dolcebambini.gr/images";

export const PRODUCTS: Record<string, Product[]> = {
  boys: [
    {
      code: "7135",
      image: `${IMG}/Collection2026/7135.jpg`,
      title: { el: "Βαπτιστικό Σύνολο 7135", en: "Baptismal Ensemble 7135" },
      desc: {
        el: "Ρομαντικό βαπτιστικό σύνολο με φυσική κομψότητα. Λινό πουκάμισο με ελαφριά υφή, λινό παντελόνι, τιράντες και ελαφρύ αξεσουάρ λαιμού.",
        en: "Romantic baptismal ensemble with natural elegance. Linen shirt with light texture, linen trousers, suspenders and a lightweight neck accessory.",
      },
    },
    {
      code: "7130",
      image: `${IMG}/Collection2026/7130.jpg`,
      title: { el: "Βαπτιστικό Σύνολο 7130", en: "Baptismal Ensemble 7130" },
      desc: {
        el: "Σύνολο που συνδυάζει vintage επιρροές με σύγχρονο σχεδιασμό. Απαλό βαμβακερό πουκάμισο, υψηλής ποιότητας βαμβακερό παντελόνι, τιράντες και ελαφρύ μαντήλι.",
        en: "Baptismal ensemble blending vintage influences with contemporary design. Soft cotton shirt, high-quality cotton trousers, suspenders and a light scarf.",
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
