// @ts-nocheck
import { MetadataStorage } from './MetadataStorage'

export const METADATA_STORAGE_GLOBAL_KEY = 'FaeMetadataStorage'

/**
 * Get metadata storage.
 * Metadata storage stores metadata in a global variable.
 */
export function getMetadataStorage(): MetadataStorage {
  return (
    global[METADATA_STORAGE_GLOBAL_KEY] ||
    (global[METADATA_STORAGE_GLOBAL_KEY] = new MetadataStorage())
  )
}
