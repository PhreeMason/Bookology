import { BookModel } from "./Book"

const data = [
  {
    "id": "MbW3_eSDGl4C",
    "volumeInfo": {
      "title": "Interview with the Vampire",
      "authors": [
        "Anne Rice"
      ],
      "publisher": "Ballantine Books",
      "publishedDate": "2010-11-17",
      "description": "The spellbinding classic that started it all, from the #1 New York Times bestselling author—the inspiration for the hit television series “A magnificent, compulsively readable thriller . . . Rice begins where Bram Stoker and the Hollywood versions leave off and penetrates directly to the true fascination of the myth—the education of the vampire.”—Chicago Tribune Here are the confessions of a vampire. Hypnotic, shocking, and chillingly sensual, this is a novel of mesmerizing beauty and astonishing force—a story of danger and flight, of love and loss, of suspense and resolution, and of the extraordinary power of the senses. It is a novel only Anne Rice could write.",
      "industryIdentifiers": [
        {
          "type": "ISBN_13",
          "identifier": "9780307575852"
        },
        {
          "type": "ISBN_10",
          "identifier": "0307575853"
        }
      ],
      "readingModes": {
        "text": true,
        "image": true
      },
      "pageCount": 369,
      "printType": "BOOK",
      "categories": [
        "Fiction"
      ],
      "averageRating": 4,
      "ratingsCount": 50,
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": true,
      "contentVersion": "4.14.13.0.preview.3",
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": "http://books.google.com/books/content?id=MbW3_eSDGl4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        "thumbnail": "http://books.google.com/books/content?id=MbW3_eSDGl4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      },
      "language": "en",
      "previewLink": "http://books.google.com/books?id=MbW3_eSDGl4C&printsec=frontcover&dq=interview+with+vampire&hl=&cd=1&source=gbs_api",
      "infoLink": "https://play.google.com/store/books/details?id=MbW3_eSDGl4C&source=gbs_api",
      "canonicalVolumeLink": "https://play.google.com/store/books/details?id=MbW3_eSDGl4C"
    },
  },
  {
    "id": "OjgSBgAAQBAJ",
    "volumeInfo": {
      "title": "Interview With The Vampire",
      "subtitle": "Number 1 in series",
      "authors": [
        "Anne Rice",
        "Bram Stoker"
      ],
      "publisher": "Hachette UK",
      "publishedDate": "2015-01-29",
      "description": "From #1 New York Times bestselling author Anne Rice, this sensuously written spellbinding classic remains 'the most successful vampire story since Bram Stoker's Dracula' (The Times) In a darkened room a young man sits telling the macabre and eerie story of his life - the story of a vampire, gifted with eternal life, cursed with an exquisite craving for human blood. Anne Rice's compulsively readable novel is arguably the most celebrated work of vampire fiction since Bram Stoker's Dracula was published in 1897. When Interview with the Vampire was originally published the Washington Post said it was: called Interview with the Vampire a 'thrilling, strikingly original work of the imagination . . . sometimes horrible, sometimes beautiful, always unforgettable'. Now, more than forty years since its release, Anne Rice's masterpiece is more beloved than ever.",
      "industryIdentifiers": [
        {
          "type": "ISBN_13",
          "identifier": "9780751561623"
        },
        {
          "type": "ISBN_10",
          "identifier": "0751561622"
        }
      ],
      "readingModes": {
        "text": true,
        "image": false
      },
      "pageCount": 320,
      "printType": "BOOK",
      "categories": [
        "Fiction"
      ],
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": true,
      "contentVersion": "0.2.2.0.preview.2",
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": "http://books.google.com/books/content?id=OjgSBgAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
        "thumbnail": "http://books.google.com/books/content?id=OjgSBgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      },
      "language": "en",
      "previewLink": "http://books.google.com/books?id=OjgSBgAAQBAJ&dq=interview+with+vampire&hl=&cd=2&source=gbs_api",
      "infoLink": "http://books.google.com/books?id=OjgSBgAAQBAJ&dq=interview+with+vampire&hl=&source=gbs_api",
      "canonicalVolumeLink": "https://books.google.com/books/about/Interview_With_The_Vampire.html?hl=&id=OjgSBgAAQBAJ"
    },
  },
]

const books = data.map((book) => BookModel.create(book));

test("authors string format", () => {
  const instance = books[0]
  expect(instance.authorsString).toBe("Anne Rice")

  const instance1 = books[1]
  expect(instance1.authorsString).toBe("Anne Rice, Bram Stoker")
})

test("book cover link format", () => {
  const instance = books[0]
  expect(instance.bookCoverLink.uri).toBe("http://books.google.com/books/content?id=MbW3_eSDGl4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api")
})
