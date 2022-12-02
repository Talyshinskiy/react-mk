import { useEffect, useState, useCallback } from "react"

const SLUG = 'marvel'
const API_KEY = '9b67fc54'
const BASE_URL = `http://www.omdbapi.com/?s=${SLUG}&apikey=${API_KEY}`

function formatResponse(dataFromServer) {
    return dataFromServer.Search.map((film) => {
        return {
            ...film,
            liked: false,
        }
    });

}

function setToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function getFromLocalStorage(key,) {
    return JSON.parse(localStorage.getItem(key) || '{}')
}



export function useFilms() {
    const [films, setFilms] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((result) => {
                const formatData = formatResponse(result)
                setFilms(formatData)
            })
            .finally(() => setLoading(false))
    }, [])

    const hadleLike = useCallback((imdbID) => {
        setFilms((prev) => {
            return prev.map((film) => {
                if (film.imdbID === imdbID) {
                    return {
                        ...film,
                        liked: !film.liked,
                    }
                }
                return film
            })
        })

        const likedFromStorage = getFromLocalStorage('likedFilms')

        if (likedFromStorage[imdbID]) {
            likedFromStorage[imdbID] = false
        } else {
            likedFromStorage[imdbID] = true

        }

        setToLocalStorage('likedFilms', likedFromStorage)

    }, [])

    return {
        films,
        isLoading,
        hadleLike
    }
}

