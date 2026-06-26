import axios from 'axios'
import axiosInstance from '../utils/axiosInstance';

export const createShortUrl = async (url, slug) => {
    const payload = { url }
    if (slug) payload.slug = slug
    const { data } = await axiosInstance.post(`/api/create`, payload)
    return data
}