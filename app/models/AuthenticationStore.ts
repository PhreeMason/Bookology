import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Session } from "@supabase/supabase-js"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    session: types.maybeNull(types.frozen<Session>()),
    authEmail: "",
    authError: ""
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.session
    },
    get user() {
      return store.session?.user
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions((store) => ({
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    logout() {
      store.session = null
      store.authEmail = ""
    },
    setSession(session: Session | null) {
      console.log({ session })
      store.session = session;
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
