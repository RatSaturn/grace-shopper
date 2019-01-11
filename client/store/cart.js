import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const defaultCart = [
  {
    id: 1,
    title: 'Customer Satisfaction Evaluation',
    subtitle: 'Methods for Measuring and Implementing Service Quality',
    authors: ['Evangelos Grigoroudis', 'Yannis Siskos'],
    genre: 'Business',
    languange: 'en',
    publisher: 'Springer Science & Business Media',
    publishedDate: '2009-11-07',
    description:
      'This important new work provides a comprehensive discussion of the customer satisfaction evaluation problem. It presents an overview of the existing methodologies as well as the development and implementation of an original multicriteria method dubbed MUSA.',
    pageCount: 308,
    price: 20900,
    currencyCode: 'USD',
    imageUrl:
      'http://books.google.com/books/content?id=WsFigUeZO1YC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    inventory: 10,
    createdAt: '2019-01-11T03:12:26.488Z',
    updatedAt: '2019-01-11T03:12:26.488Z',
    booksForOrder: {
      quantity: 1,
      price: 20900,
      createdAt: '2019-01-11T03:12:26.821Z',
      updatedAt: '2019-01-11T03:12:26.821Z',
      orderId: 1,
      bookId: 1
    }
  },
  {
    id: 2,
    title: 'Portfoliomanagement',
    subtitle: 'Theorie und Anwendungsbeispiele',
    authors: ['Enzo Mondello'],
    genre: 'Business',
    languange: 'de',
    publisher: 'Springer-Verlag',
    publishedDate: '2015-10-19',
    description:
      'Das Lehrbuch deckt sowohl die Kapitalmarktmodelle als auch deren Anwendungen im Portfoliomanagement ab. Es zeigt u.a. die Berechnung der Rendite und des Risikos von einzelnen Anlagen und Portfolios, die Konstruktion der Effizienzkurve anhand des Markowitz-Modells und des Marktmodells, die Bestimmung des optimalen Portfolios mit der Effizienzkurve und den investorenspezifischen Indifferenzkurven sowie die Performancemessung von Portfolios. Das Buch beinhaltet zahlreiche Aufgaben (im Text sowie auch am Ende der jeweiligen Kapitel). Besonders von Interesse ist es somit für Dozierende und Studierende der Wirtschaftswissenschaften mit dem Schwerpunkt Finanzwissenschaften, aber auch für Fach- und Führungskräfte, die für ihren Aufgabenbereich grundlegende Kenntnisse für ein erfolgreiches Portfoliomanagement benötigen oder eine Weiterbildung wie beispielsweise zum CFA® und CIIA® anstreben.',
    pageCount: 384,
    price: 3999,
    currencyCode: 'USD',
    imageUrl:
      'http://books.google.com/books/content?id=GdvHCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    inventory: 7,
    createdAt: '2019-01-11T03:12:26.488Z',
    updatedAt: '2019-01-11T03:12:26.488Z',
    booksForOrder: {
      quantity: 1,
      price: 3999,
      createdAt: '2019-01-11T03:12:26.821Z',
      updatedAt: '2019-01-11T03:12:26.821Z',
      orderId: 1,
      bookId: 2
    }
  },
  {
    id: 3,
    title: 'Influencer Marketing',
    subtitle:
      'Für Unternehmen und Influencer: Strategien, Plattformen, Instrumente, rechtlicher Rahmen. Mit vielen Beispielen',
    authors: ['Marlis Jahnke'],
    genre: 'Business',
    languange: 'de',
    publisher: 'Springer-Verlag',
    publishedDate: '2018-05-13',
    description:
      'Dieses Buch erläutert fundiert und pragmatisch alle entscheidenden Erfolgsfaktoren des Influencer Marketings – sowohl für Unternehmen als auch für Influencer.Marketingprofis erfahren, wie sie Influencer Marketing bestmöglich in ihre Kommunikationsstrategie integrieren, wie sie die passenden Influencer finden und nach welchen konkreten Regeln die Zusammenarbeit optimal funktioniert: von der Vertragsgestaltung über das Briefing bis hin zum Monitoring. Zudem werden viele nützliche Plattformen, Netzwerke und Instrumente vorgestellt.Influencer erhalten wertvolle Anregungen, wie sie ihre Karriere weiter professionalisieren können und lernen aus Erfahrungsberichten und Empfehlungen von erfolgreichen Akteuren im Markt.Als wichtiges und erfolgskritisches Thema werden auch die wettbewerbsrechtlichen Grundlagen des Influencer Marketing verständlich und handlungsorientiert dargestellt. Ein unverzichtbares Grundlagenwerk, das zeigt, wie sich das mitunter fragile Zusammenspiel beider Seiten effizient, langfristig und vor allem für alle Seiten gewinnbringend gestalten lässt. Auszug aus dem Inhalt Wie sieht das Marketing im Influencer-Zeitalter aus? Markenstrategischer Fit im Influencer Marketing Wettbewerbsrechtliche Grundlagen von Influencer Marketing Plattformen, Instrumente und Netzwerke im Influencer Marketing Professionalisierung für Influencer über Netzwerke Erfahrungsberichte von Influencern 14 strukturiert aufgearbeitete Fallbeispiele, u.a. aus den Branchen Drogerie, Food, Technik und Medien Die Herausgeberin Marlis Jahnke begleitet die Szene seit vielen Jahren und hat mit HashtagLove eine der ersten und erfolgreichsten Influencer-Marketing-Plattformen in Deutschland gelauncht. Beitragsautoren im Werk sind Professor Regina Brix, Dr. Annette Bruce, Thomas Fuchs, Dr. Caroline Hahn, Fabian Held, Hendrik Martens, Moritz Meyer, André Krüger, Melanie Lammers, Franziska von Lewinski, Monika Sekara und Simon Unge.',
    pageCount: 276,
    price: 3999,
    currencyCode: 'USD',
    imageUrl:
      'http://books.google.com/books/content?id=yLRTDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    inventory: 9,
    createdAt: '2019-01-11T03:12:26.489Z',
    updatedAt: '2019-01-11T03:12:26.489Z',
    booksForOrder: {
      quantity: 1,
      price: 3999,
      createdAt: '2019-01-11T03:12:26.821Z',
      updatedAt: '2019-01-11T03:12:26.821Z',
      orderId: 1,
      bookId: 3
    }
  }
]

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})

/**
 * THUNK CREATORS
 */
// export const getCartFromServer = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/orders/cart')
//     dispatch(getCart(res.data || defaultCart))
//   } catch (err) {
//     console.err(err)
//   }
// }

export const updateCartOnServer = bookInfo => async dispatch => {
  const bookToUpdate = defaultCart.filter(book => book.id === bookInfo.id)[0]
  bookToUpdate.booksForOrder.quantity = bookInfo.quantity

  const newCart = defaultCart.map(book => {
    if (book.id === bookInfo.id) {
      return bookToUpdate
    } else {
      return book
    }
  })
  await dispatch(updateCart(newCart))
}

// export const updateCartOnServer = bookUpdate => async dispatch => {
//   try {
//     const res = await axios.post('/api/orders/cart/update', bookUpdate)
//     dispatch(updateCart(res.data))
//     return 'done'
//   } catch (err) {
//     console.log(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}
