import { LibaryStoreModel } from "./LibaryStore"

test("can be created", () => {
  const instance = LibaryStoreModel.create({})

  expect(instance).toBeTruthy()
})
