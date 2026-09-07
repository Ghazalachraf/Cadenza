// ==========================================================================
// product-variants.js — variantes de la fiche produit
//
// Les pastilles de couleur et les boutons de taille ne faisaient que
// déplacer leur anneau de sélection : ni la galerie, ni le titre, ni le prix
// ne changeaient. Ce fichier fournit les données consommées par
// `initProductVariants()` dans main.js.
//
// COULEUR — change les quatre vues de la galerie, le nom et le prix.
// TAILLE  — ajuste le prix seul, comme dans une vraie boutique où les
//           grandes tailles demandent plus de tissu.
//
// Les visuels sont ceux d'`assets/images`, choisis d'après ce que la photo
// montre réellement. Faute de photothèque dédiée à ce produit, chaque
// coloris emprunte la série la plus proche du catalogue : à remplacer par les
// vraies vues produit dès qu'elles seront livrées.
// ==========================================================================

const PRODUCT_VARIANTS = {
  // Coloris affiché au chargement de la page. Les quatre vues d'origine
  // montrent la jupe à imprimé feuillage : elles appartiennent donc au
  // coloris « Printed », et non à « Black ».
  colors: {
    Printed: {
      name: 'Twilight Whisper Skirt',
      price: 22000,
      priceOld: 30000,
      images: [
        'assets/images/product-detail-main.jpg',
        'assets/images/product-detail-thumb3.jpg',
        'assets/images/product-detail-thumb1.jpg',
        'assets/images/product-detail-thumb2.jpg',
      ],
    },
    Black: {
      name: 'Twilight Whisper Slip Dress',
      price: 19000,
      priceOld: 26000,
      images: [
        'assets/images/col-skirt-b.jpg',
        'assets/images/cart-dumane.jpg',
        'assets/images/col-shorte.jpg',
        'assets/images/product-shorte-back.jpg',
      ],
    },
    Lime: {
      name: 'Twilight Whisper Wrap Dress',
      price: 18500,
      priceOld: 24000,
      images: [
        'assets/images/cart-shorte.jpg',
        'assets/images/col-samantha-b.jpg',
        'assets/images/col-samantha-c.jpg',
        'assets/images/col-jelna-b.jpg',
      ],
    },
    Plum: {
      name: 'Twilight Whisper Midi Dress',
      price: 21000,
      priceOld: 28000,
      images: [
        'assets/images/col-noya.jpg',
        'assets/images/cart-noya.jpg',
        'assets/images/cart-samantha.jpg',
        'assets/images/col-samantha-a.jpg',
      ],
    },
    Grey: {
      name: 'Twilight Whisper Column Dress',
      price: 20500,
      priceOld: 27000,
      images: [
        'assets/images/col-skirt-a.jpg',
        'assets/images/col-jelna-c.jpg',
        'assets/images/col-jelna-a.jpg',
        'assets/images/product-detail-thumb2.jpg',
      ],
    },
  },

  // Supplément appliqué au prix du coloris, en centimes. Les tailles
  // courantes restent au tarif de référence ; les extrêmes le majorent.
  sizeSurcharge: {
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 1000,
    '2XL': 2000,
  },
};
