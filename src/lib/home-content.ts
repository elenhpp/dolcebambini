import type { Tr } from "./site-content";

// Copy for the scroll-animated homepage (src/components/home/SilkHome.tsx).
// Strings shared with other pages (values, story, CTAs, contact) live in site-content.ts.

type Emph = { pre: string; em: string; post: string };

export const HOME = {
  scroll: { el: "Κύλιση", en: "Scroll", it: "Scorri", es: "Desliza", pt: "Deslize" },
  view: { el: "Δείτε", en: "View", it: "Vedi", es: "Ver", pt: "Ver" },

  craftLead: {
    el: { pre: "Κάθε βελονιά, ", em: "στο χέρι.", post: "" },
    en: { pre: "Every stitch, ", em: "by hand.", post: "" },
    it: { pre: "Ogni punto, ", em: "a mano.", post: "" },
    es: { pre: "Cada puntada, ", em: "a mano.", post: "" },
    pt: { pre: "Cada ponto, ", em: "à mão.", post: "" },
  } satisfies Tr<Emph>,

  collectionsTitle: {
    el: { pre: "Οι ", em: "συλλογές μας", post: "" },
    en: { pre: "Our ", em: "collections", post: "" },
    it: { pre: "Le nostre ", em: "collezioni", post: "" },
    es: { pre: "Nuestras ", em: "colecciones", post: "" },
    pt: { pre: "As nossas ", em: "coleções", post: "" },
  } satisfies Tr<Emph>,
  collectionsBody: {
    el: "Από τα βαπτιστικά φορέματα έως την πρώτη κοινωνία — όλα για τις πιο πολύτιμες μέρες τους.",
    en: "From christening gowns to first communion — everything for their most treasured days.",
    it: "Dagli abiti da battesimo alla prima comunione — tutto per i loro giorni più preziosi.",
    es: "Desde los vestidos de bautizo hasta la primera comunión — todo para sus días más preciados.",
    pt: "Dos vestidos de batizado à primeira comunhão — tudo para os seus dias mais preciosos.",
  },
  categories: {
    girls: {
      title: { el: "Κορίτσι", en: "Girls", it: "Bambina", es: "Niña", pt: "Menina" },
      sub: {
        el: "Φορέματα",
        en: "Gowns & dresses",
        it: "Abiti e vestitini",
        es: "Vestidos",
        pt: "Vestidos",
      },
    },
    boys: {
      title: { el: "Αγόρι", en: "Boys", it: "Bambino", es: "Niño", pt: "Menino" },
      sub: {
        el: "Κοστούμια & σύνολα",
        en: "Suits & ensembles",
        it: "Completi e abiti",
        es: "Trajes y conjuntos",
        pt: "Fatos e conjuntos",
      },
    },
    winter: {
      title: { el: "Winter", en: "Winter", it: "Winter", es: "Winter", pt: "Winter" },
      sub: {
        el: "Αγόρι & κορίτσι",
        en: "Boy & girl",
        it: "Bambino e bambina",
        es: "Niño y niña",
        pt: "Menino e menina",
      },
    },
    silk: {
      title: {
        el: "Silk Collection",
        en: "Silk Collection",
        it: "Silk Collection",
        es: "Silk Collection",
        pt: "Silk Collection",
      },
      sub: {
        el: "Πολυτέλεια σε μετάξι",
        en: "Luxury in silk",
        it: "Lusso in seta",
        es: "Lujo en seda",
        pt: "Luxo em seda",
      },
    },
    accessories: {
      title: {
        el: "Αξεσουάρ",
        en: "Accessories",
        it: "Accessori",
        es: "Accesorios",
        pt: "Acessórios",
      },
      sub: {
        el: "Σετ & συμπληρώματα",
        en: "Sets & complements",
        it: "Set e complementi",
        es: "Conjuntos y complementos",
        pt: "Conjuntos e complementos",
      },
    },
    communion: {
      title: { el: "Κοινωνία", en: "Communion", it: "Comunione", es: "Comunión", pt: "Comunhão" },
      sub: {
        el: "Πρώτη Κοινωνία",
        en: "First communion",
        it: "Prima Comunione",
        es: "Primera Comunión",
        pt: "Primeira Comunhão",
      },
    },
  },
  visitUs: {
    el: "Επισκεφθείτε μας",
    en: "Visit us",
    it: "Vieni a trovarci",
    es: "Visítanos",
    pt: "Visite-nos",
  },

  heroLines: {
    el: ["Στιγμές", "που μένουν", "για πάντα"],
    en: ["Moments", "that last", "forever"],
    it: ["Momenti", "che durano", "per sempre"],
    es: ["Momentos", "que duran", "para siempre"],
    pt: ["Momentos", "que duram", "para sempre"],
  } satisfies Tr<[string, string, string]>,
  heroMeta: {
    el: "Χειροποίητα βαπτιστικά & ενδύματα κοινωνίας",
    en: "Handcrafted baptism & communion garments",
    it: "Abiti da battesimo e comunione fatti a mano",
    es: "Prendas de bautizo y comunión hechas a mano",
    pt: "Trajes de batismo e comunhão feitos à mão",
  },

  philosophy: {
    el: "Η φιλοσοφία μας",
    en: "Our philosophy",
    it: "La nostra filosofia",
    es: "Nuestra filosofía",
    pt: "A nossa filosofia",
  },
  statement: {
    el: {
      pre: "Κάποιες στιγμές είναι πολύ πολύτιμες για κάτι συνηθισμένο. Από το 1978 δημιουργούμε τα ενδύματα που τις συνοδεύουν —",
      em: "απαλά, αργά, βελονιά βελονιά.",
      post: "",
    },
    en: {
      pre: "Some moments are too precious for anything ordinary. Since 1978 we have made the garments that carry them —",
      em: "softly, slowly, stitch by stitch.",
      post: "",
    },
    it: {
      pre: "Alcuni momenti sono troppo preziosi per qualcosa di ordinario. Dal 1978 creiamo gli abiti che li accompagnano —",
      em: "con dolcezza, con calma, punto dopo punto.",
      post: "",
    },
    es: {
      pre: "Algunos momentos son demasiado valiosos para algo corriente. Desde 1978 creamos las prendas que los acompañan —",
      em: "con suavidad, con calma, puntada a puntada.",
      post: "",
    },
    pt: {
      pre: "Alguns momentos são preciosos demais para algo comum. Desde 1978 criamos as peças que os acompanham —",
      em: "com suavidade, com calma, ponto a ponto.",
      post: "",
    },
  } satisfies Tr<Emph>,

  yearsTitle: {
    el: { pre: "Τέσσερις δεκαετίες, ", em: "μία κλωστή", post: "" },
    en: { pre: "Four decades, ", em: "one thread", post: "" },
    it: { pre: "Quattro decenni, ", em: "un solo filo", post: "" },
    es: { pre: "Cuatro décadas, ", em: "un mismo hilo", post: "" },
    pt: { pre: "Quatro décadas, ", em: "um só fio", post: "" },
  } satisfies Tr<Emph>,

  marquee1: {
    el: "Χειροποίητα με αγάπη ✦ Βάπτιση ✦ Κοινωνία ✦ Μετάξι ✦",
    en: "Handmade with love ✦ Baptism ✦ Communion ✦ Silk ✦",
    it: "Fatto a mano con amore ✦ Battesimo ✦ Comunione ✦ Seta ✦",
    es: "Hecho a mano con amor ✦ Bautizo ✦ Comunión ✦ Seda ✦",
    pt: "Feito à mão com amor ✦ Batismo ✦ Comunhão ✦ Seda ✦",
  },
  marquee2: {
    el: "Μικρές στιγμές, για πάντα πολύτιμες ✦ Από το 1978 ✦",
    en: "Little moments, forever treasured ✦ Since 1978 ✦",
    it: "Piccoli momenti, preziosi per sempre ✦ Dal 1978 ✦",
    es: "Pequeños momentos, atesorados para siempre ✦ Desde 1978 ✦",
    pt: "Pequenos momentos, guardados para sempre ✦ Desde 1978 ✦",
  },

  finaleTitle: {
    el: { pre: "Μικρές στιγμές, ", em: "για πάντα", post: " πολύτιμες." },
    en: { pre: "Little moments, ", em: "forever", post: " treasured." },
    it: { pre: "Piccoli momenti, preziosi ", em: "per sempre", post: "." },
    es: { pre: "Pequeños momentos, atesorados ", em: "para siempre", post: "." },
    pt: { pre: "Pequenos momentos, guardados ", em: "para sempre", post: "." },
  } satisfies Tr<Emph>,
  findStore: {
    el: "Βρείτε κατάστημα",
    en: "Find a store",
    it: "Trova un negozio",
    es: "Encuentra una tienda",
    pt: "Encontre uma loja",
  },
  collections: {
    el: "Συλλογές",
    en: "Collections",
    it: "Collezioni",
    es: "Colecciones",
    pt: "Coleções",
  },
  privacy: {
    el: "Πολιτική Απορρήτου (GDPR)",
    en: "Privacy Policy (GDPR)",
    it: "Informativa sulla Privacy (GDPR)",
    es: "Política de Privacidad (RGPD)",
    pt: "Política de Privacidade (RGPD)",
  },
  terms: {
    el: "Όροι & Προϋποθέσεις",
    en: "Terms & Conditions",
    it: "Termini e Condizioni",
    es: "Términos y Condiciones",
    pt: "Termos e Condições",
  },
};
