import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const BookModel = types
  .model("Book")
  .props({
    id: types.identifier,
    volumeInfo: types.frozen<BookItem['volumeInfo']>()
  })
  .actions(withSetPropAction)
  .views((book) => ({
    get bookCoverLink() {
      const { imageLinks: {smallThumbnail, thumbnail, small, medium, large } } = book.volumeInfo
      const coverLink =  thumbnail || smallThumbnail || small || medium || large;
      return {uri: coverLink};
    },
    get authorsString() {
      return book.volumeInfo.authors.join(", ")
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Book extends Instance<typeof BookModel> { }
export interface BookSnapshotOut extends SnapshotOut<typeof BookModel> { }
export interface BookSnapshotIn extends SnapshotIn<typeof BookModel> { }

export type BookItem = {
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printedPageCount?: number;
    dimensions?: {
      height: string;
    };
    printType: string;
    categories: string[];
    averageRating?: number;
    ratingsCount?: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small?: string;
      medium?: string;
      large?: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
};