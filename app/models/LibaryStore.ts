import { BookModel, Book, BookItem } from './Book';
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "../services/api"
import { supabase } from 'app/utils/supabase';
import { QueryData } from '@supabase/supabase-js'

const userBooks = supabase
  .from('user_books')
  .select(`
    *,
    books (
      title,
      authors,
      description,
      page_count,
      publisher,
      google_books_id
    )
  `)
type UserLibraryBooks = QueryData<typeof userBooks>;

/**
 * Model description here for TypeScript hints.
 */
export const LibaryStoreModel = types
  .model("LibaryStore")
  .props({
    activeBook: types.maybeNull(types.frozen<BookItem>()),
    myBooks: types.frozen<UserLibraryBooks>(),
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
    async fetchMyBooks(ok = false) {
      // get books that belong to user using user_books join table
      console.log({ok})
      if (ok) {
        const { data, error } = await supabase
          .from('user_books')
          .insert([
            {
              book_id: 1,
              current_page: 5,
              user_id: "d0f97cc6-a33c-44b0-b461-e0af9e72cca6",
            },
          ])
          .select()

        console.log('insert complete', data, error)
      }

      let { data: user_books, error } = await supabase
      .from('user_books')
      .select(`
        *,
        books (
          title,
          authors,
          description,
          page_count,
          publisher,
          google_books_id
        )
      `)

      const m =  await supabase
      .from('user_books')
      .select('*')
      console.log({m})
      console.log(user_books)
      if (error) {
        console.error(`Error fetching episodes: ${JSON.stringify(error)}`)
      } else {
        user_books && store.setProp("myBooks", user_books)
      }
      console.log('fetchMyBooks')
    },
    async getBookDetails(id: string) {
      const response = await api.getBookDetail(id)
      if (response.kind === "ok") {
        store.activeBook = response.book
      }
    },
    async addToLibrary(book: Book) {
      const { volumeInfo, id } = book
      const {
        authors,
        description,
        pageCount,
        publisher,
        title,
      } = volumeInfo

      // find or create the book using the isbn
      // then create a user_books record for the user

      const { error } = await supabase.from('books').insert({
        authors,
        description,
        isbn: id,
        page_count: pageCount,
        publisher,
        title,
      });

      if (error) {
        console.error(`Error inserting book: ${JSON.stringify(error)}`)
        return
      }
      // const { error } = await supabase.from('books').insert({
      //   authors,
      //   description,
      //   isbn: id,
      //   page_count: pageCount,
      //   publisher,
      //   title,
      // })
      store.books.push(book)
    },

    removeFromLibrary(book: Book) {
      store.books.remove(book)
    }
  }))
  .views((store) => ({
    get booksForList() {
      return store.myBooks
    },
    get searchForList() {
      return store.search
    },
    get currentBook() {
      return store.activeBook
    }
  }))

export interface LibaryStore extends Instance<typeof LibaryStoreModel> { }
export interface LibaryStoreSnapshotOut extends SnapshotOut<typeof LibaryStoreModel> { }
export interface LibaryStoreSnapshotIn extends SnapshotIn<typeof LibaryStoreModel> { }
export const createLibaryStoreDefaultModel = () => types.optional(LibaryStoreModel, {
    activeBook: null,
    myBooks: [],
    books: [],
    search: [],
})
