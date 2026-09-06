// ==========================================================================
// products.js — catalogue des produits « New Arrivals »
//
// Les onglets de la section New Arrivals ne portaient aucun comportement :
// cliquer sur « Skirt » ou « Sneakers » ne changeait rien. Ce catalogue
// fournit la source de données de chaque catégorie ; le rendu est assuré par
// `initNewArrivalsTabs()` dans main.js.
//
// Les visuels sont ceux déjà présents dans `assets/images`, choisis d'après
// ce que la photo montre réellement et non d'après son nom de fichier
// (`col-skirt-a.jpg` est une robe de soirée, `col-skirt-b.jpg` un jean).
//
// ATTENTION — aucun visuel de jupe ni de chaussure n'a été livré avec la
// maquette. Les onglets « Skirt » et « Sneakers » présentent donc les pièces
// disponibles les plus proches, et leurs intitulés décrivent la photo plutôt
// que la catégorie. À remplacer dès que les visuels manquants seront fournis.
// ==========================================================================

const NEW_ARRIVALS_CATALOG = {
  outwears: [
    {
      name: 'Shearling Aviator Coat',
      image: 'assets/images/best-winter-coat.jpg',
      price: '149,00$',
      original: '280,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['sand', 'black', 'gray'],
      activeColor: 'sand',
    },
    {
      name: 'Lime Tailored Blazer',
      image: 'assets/images/best-green-suit.jpg',
      price: '189,00$',
      original: '320,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'S',
      colors: ['plum', 'black', 'gray'],
      activeColor: 'plum',
    },
    {
      name: 'Checked Oversized Jacket',
      image: 'assets/images/nav-collection-topshop.jpg',
      price: '129,00$',
      original: '240,00$',
      sizes: ['XS', 'S', 'M'],
      activeSize: 'S',
      colors: ['sand', 'white', 'black'],
      activeColor: 'sand',
    },
    {
      name: 'Quilted Leather Jacket',
      image: 'assets/images/nav-collection-winter.jpg',
      price: '159,00$',
      original: '290,00$',
      sizes: ['M', 'L', 'XL'],
      activeSize: 'L',
      colors: ['black', 'gray'],
      activeColor: 'black',
    },
    {
      name: 'Classic Trench Coat',
      image: 'assets/images/nav-collection-topshop2.jpg',
      price: '139,00$',
      original: '260,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['sand', 'plum', 'black'],
      activeColor: 'sand',
    },
  ],

  dresses: [
    {
      name: 'Samantha Activewear',
      image: 'assets/images/product-samantha-activewear.jpg',
      price: '99,00$',
      original: '200,00$',
      sizes: ['M', 'S', 'L'],
      activeSize: 'S',
      colors: ['gray', 'white', 'plum', 'sand', 'black'],
      activeColor: 'sand',
    },
    {
      name: 'Noya Slim Dress',
      image: 'assets/images/product-noya-slim-dress.jpg',
      price: '79,00$',
      original: '109,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['sand', 'white', 'black'],
      activeColor: 'sand',
    },
    {
      name: 'Jelna Split Dress',
      image: 'assets/images/product-jelna-split-dress.jpg',
      price: '100,00$',
      original: '200,00$',
      sizes: ['XS', 'S', 'M'],
      activeSize: 'S',
      colors: ['white', 'plum', 'gray'],
      activeColor: 'white',
    },
    {
      name: 'Roselle Tube Dress',
      image: 'assets/images/product-roselle-tube-dress.jpg',
      price: '79,00$',
      original: '200,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['sand', 'gray', 'black'],
      activeColor: 'sand',
    },
    {
      name: 'Beaded Evening Gown',
      image: 'assets/images/best-beaded-gown.jpg',
      price: '210,00$',
      original: '390,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'S',
      colors: ['sand', 'white'],
      activeColor: 'sand',
    },
  ],

  // Aucune photo de jupe dans les assets livrés : la sélection réunit les
  // pièces courtes et fluides du catalogue, au plus près de la catégorie.
  skirt: [
    {
      name: 'Dumane Wrap Mini Dress',
      image: 'assets/images/cart-dumane.jpg',
      price: '85,00$',
      original: '150,00$',
      sizes: ['XS', 'S', 'M'],
      activeSize: 'S',
      colors: ['gray', 'black'],
      activeColor: 'gray',
    },
    {
      name: 'Green Tiered Mini Dress',
      image: 'assets/images/cat-dresses.jpg',
      price: '72,00$',
      original: '125,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'S',
      colors: ['white', 'sand'],
      activeColor: 'white',
    },
    {
      name: 'Fuchsia Silk Kaftan',
      image: 'assets/images/collection-lingerie.jpg',
      price: '59,00$',
      original: '99,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['plum', 'sand', 'white'],
      activeColor: 'plum',
    },
    {
      name: 'Floral Slip Midi Dress',
      image: 'assets/images/cart-noya.jpg',
      price: '69,00$',
      original: '120,00$',
      sizes: ['XS', 'S', 'M'],
      activeSize: 'S',
      colors: ['sand', 'black', 'white'],
      activeColor: 'sand',
    },
    {
      name: 'Printed Summer Dress',
      image: 'assets/images/cart-samantha.jpg',
      price: '75,00$',
      original: '130,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['sand', 'plum', 'gray'],
      activeColor: 'sand',
    },
  ],

  bottoms: [
    {
      name: 'Wide Leg Jeans',
      image: 'assets/images/best-wide-leg-jeans.jpg',
      price: '95,00$',
      original: '170,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['gray', 'black'],
      activeColor: 'gray',
    },
    {
      name: 'Light Wash Baggy Jeans',
      image: 'assets/images/col-skirt-b.jpg',
      price: '89,00$',
      original: '160,00$',
      sizes: ['XS', 'S', 'M'],
      activeSize: 'S',
      colors: ['gray', 'white', 'black'],
      activeColor: 'gray',
    },
    {
      name: 'Kristina Ripped Jeans',
      image: 'assets/images/article-kristina-jeans.jpg',
      price: '92,00$',
      original: '165,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'L',
      colors: ['gray', 'black', 'white'],
      activeColor: 'gray',
    },
    {
      name: 'Moana Skinny Jeans',
      image: 'assets/images/article-moana-jeans.jpg',
      price: '92,00$',
      original: '165,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['gray', 'sand'],
      activeColor: 'gray',
    },
    {
      name: 'Tailored Cargo Pants',
      image: 'assets/images/nav-collection-bottom.jpg',
      price: '110,00$',
      original: '195,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'S',
      colors: ['black', 'gray', 'sand'],
      activeColor: 'black',
    },
  ],

  // Aucune photo de chaussure isolée : `collection-sets.jpg` est le seul
  // visuel où les sneakers sont réellement visibles. Le reste de la sélection
  // présente les silhouettes casual du catalogue.
  sneakers: [
    {
      name: 'Canvas Deck Sneaker',
      image: 'assets/images/collection-sets.jpg',
      price: '128,00$',
      original: '220,00$',
      sizes: ['38', '39', '40'],
      activeSize: '39',
      colors: ['white', 'sand'],
      activeColor: 'white',
    },
    {
      name: 'Studio Training Look',
      image: 'assets/images/collection-activewear.jpg',
      price: '135,00$',
      original: '230,00$',
      sizes: ['37', '38', '39'],
      activeSize: '38',
      colors: ['black', 'white'],
      activeColor: 'black',
    },
    {
      name: 'Everyday Cotton Tee',
      image: 'assets/images/best-white-tshirt.jpg',
      price: '99,00$',
      original: '180,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['white', 'gray'],
      activeColor: 'white',
    },
    {
      name: 'Knit Casual Sweater',
      image: 'assets/images/best-instagram-crush.jpg',
      price: '145,00$',
      original: '250,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['gray', 'white', 'black'],
      activeColor: 'gray',
    },
    {
      name: 'City Weekend Outfit',
      image: 'assets/images/nav-collection-activewear.jpg',
      price: '120,00$',
      original: '210,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'S',
      colors: ['sand', 'gray'],
      activeColor: 'sand',
    },
  ],

  'gym suits': [
    {
      name: 'Performance Gym Suit',
      image: 'assets/images/cart-gym-suit.jpg',
      price: '115,00$',
      original: '200,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['black', 'gray', 'plum'],
      activeColor: 'black',
    },
    {
      name: 'Yoga Performance Set',
      image: 'assets/images/cat-activewear.jpg',
      price: '105,00$',
      original: '190,00$',
      sizes: ['XS', 'S', 'M'],
      activeSize: 'S',
      colors: ['black', 'plum'],
      activeColor: 'black',
    },
    {
      name: 'Seamless Training Set',
      image: 'assets/images/col-samantha-a.jpg',
      price: '98,00$',
      original: '175,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['plum', 'gray', 'black'],
      activeColor: 'plum',
    },
    {
      name: 'Studio Active Set',
      image: 'assets/images/col-samantha-b.jpg',
      price: '112,00$',
      original: '198,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'L',
      colors: ['gray', 'white'],
      activeColor: 'gray',
    },
    {
      name: 'Flex Training Suit',
      image: 'assets/images/col-samantha-c.jpg',
      price: '125,00$',
      original: '215,00$',
      sizes: ['S', 'M', 'L'],
      activeSize: 'M',
      colors: ['black', 'sand'],
      activeColor: 'black',
    },
  ],
};

// Libellés des pastilles de couleur, repris du markup d'origine.
const COLOR_LABELS = {
  gray: 'Gris',
  white: 'Blanc',
  plum: 'Prune',
  sand: 'Sable',
  black: 'Noir',
};
