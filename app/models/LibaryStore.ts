import { BookModel, Book } from './Book';
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const LibaryStoreModel = types
  .model("LibaryStore")
  .props({
    books: types.array(BookModel),
    search: types.array(BookModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async findBook(queryParam: string) {
      const response = await api.searchBooks(queryParam)
      if (response.kind === "ok") {
        store.setProp("search", response.books)
      } else {
        console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      }
    },
    async fetchMyBooks() {
      const response = await api.getBooks()
      if (response.kind === "ok") {
        store.setProp("books", response.books)
      } else {
        console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      }
    },
    addToLibrary(book: Book) {
      store.books.push(book)
    },

    removeFromLibrary(book: Book) {
      store.books.remove(book)
    }
  }))
  .views((store) => ({
    get booksForList() {
      return store.books
    },
  }))

export interface LibaryStore extends Instance<typeof LibaryStoreModel> { }
export interface LibaryStoreSnapshotOut extends SnapshotOut<typeof LibaryStoreModel> { }
export interface LibaryStoreSnapshotIn extends SnapshotIn<typeof LibaryStoreModel> { }
export const createLibaryStoreDefaultModel = () => types.optional(LibaryStoreModel, {})
