import { nanoid } from 'nanoid'

/**
 * @description This function generates a nanoid of the specified length. It is used to create unique short URLs for the URL shortening service.
 */
export const generateNanoid = (length)=>{
    return nanoid(length)
}