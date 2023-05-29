import { Listing } from '../types/listings'

export async function getData(): Promise<Listing | any> {
  try {
    const response = import('../../json/db.json')
    return response
  } catch (err) {
    return err
  }
}