import { createClient, groq } from 'next-sanity';
import clientConfig from "./config/client-config";

export async function getAnnouncements() {
    const revalidate = 30;

    return createClient(clientConfig).fetch(
      groq`*[_type == "announcement"]`,
      {next: {revalidate}}
    )
}

export async function getAnnouncement(slug) {
    const revalidate = 30;

    return createClient(clientConfig).fetch(
      groq`*[_type == "announcement" && slug.current == $slug][0]`,
      {slug},
      {next: {revalidate }}
    )
}

export async function getPosts() {
    const revalidate = 30;

    return createClient(clientConfig).fetch(
      groq`*[_type == "rankings" || _type == "article" || _type == "announcement"]`,
      {next: {revalidate }}
    )
}

export async function getPost(slug) {
    const revalidate = 30;
    
    return createClient(clientConfig).fetch(
      groq`*[(_type == "rankings" || _type== "article" || _type== "announcement") && slug.current == $slug][0]`,
      {slug},
      {next: {revalidate }}
    )
}