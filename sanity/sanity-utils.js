import { createClient, groq } from 'next-sanity';
import clientConfig from "./config/client-config";

export async function getAnnouncements() {
    return createClient(clientConfig).fetch(
      groq`*[_type == "announcement"]`
    )
}

export async function getAnnouncement(slug) {
    return createClient(clientConfig).fetch(
      groq`*[_type == "announcement" && slug.current == $slug][0]`,
      { slug }
    )
}

export async function getPosts() {
    return createClient(clientConfig).fetch(
      groq`*[_type == "rankings" || _type == "article" || _type == "announcement"]`
    )
}

export async function getPost(slug) {
    return createClient(clientConfig).fetch(
      groq`*[(_type == "rankings" || _type== "article" || _type== "announcement") && slug.current == $slug][0]`,
      { slug }
    )
}