import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    timeout: 15000
})

const cache = new Map()

export const ApiRyC_Axios = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [info, setInfo] = useState({})
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const abortControllerRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)

            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
            abortControllerRef.current = new AbortController()

            const cacheKey = `${query || 'all'}-${page}`
            
            if (cache.has(cacheKey)) {
                const cached = cache.get(cacheKey)
                setData(cached.results)
                setInfo(cached.info)
                setLoading(false)
                return
            }

            try {
                const response = await api.get('/character', { 
                    params: { page, name: query || undefined },
                    signal: abortControllerRef.current.signal
                })
                
                const results = response.data.results || []
                const infoData = response.data.info || {}
                
                if (cache.size > 20) {
                    const firstKey = cache.keys().next().value
                    cache.delete(firstKey)
                }
                cache.set(cacheKey, { results: results, info: infoData })
                
                setData(results)
                setInfo(infoData)
            } catch (err) {
                if (axios.isCancel(err)) return
                setError('Error al cargar los personajes')
            } finally {
                setLoading(false)
            }
        }

        const debounce = setTimeout(fetchData, 300)
        return () => {
            clearTimeout(debounce)
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [page, query])

    const handleSearch = (e) => {
        const value = e.target.value
        setQuery(value)
        setPage(1)
    }

    const clearCache = () => {
        cache.clear()
        setPage(1)
        setQuery('')
    }

    return (
        <div className="container py-4">
            <h1 className="text-center mb-4">API Rick & Morty</h1>
            
            <div className="mb-4 d-flex gap-2">
                <input 
                    className='form-control' 
                    placeholder='Buscar personaje...' 
                    value={query}
                    onChange={handleSearch}
                />
                <button 
                    className='btn btn-outline-secondary' 
                    onClick={clearCache}
                    title="Limpiar caché"
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>

            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 text-muted">Cargando personajes...</p>
                </div>
            )}

            {error && !loading && (
                <div className="alert alert-danger" role="alert">
                    Error: {error}. <button className="btn btn-sm btn-outline-danger" onClick={() => setPage(p => p)}>Reintentar</button>
                </div>
            )}

            {!loading && !error && data.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">No se encontraron personajes</p>
                </div>
            )}

            <div className="row g-4">
                {data.map(char => (
                    <div key={char.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <img 
                                src={char.image} 
                                className="card-img-top" 
                                alt={char.name}
                                loading="lazy"
                                style={{ height: '250px', objectFit: 'cover' }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{char.name}</h5>
                                <p className="card-text">
                                    <span className={`badge ${char.status === 'Alive' ? 'bg-success' : 'bg-danger'}`}>
                                        {char.status}
                                    </span>
                                    {' '}
                                    <span className="text-muted">{char.gender}</span>
                                </p>
                                <p className="card-text small text-muted">
                                    {char.species}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {data.length > 0 && !loading && (
                <div className="d-flex justify-content-center align-items-center gap-3 py-4">
                    <button 
                        className='btn btn-outline-secondary' 
                        onClick={() => setPage(p => Math.max(1, p - 1))} 
                        disabled={!info.prev}
                    >
                        ← Anterior
                    </button>
                    <span className="badge bg-dark fs-6">Página {page} de {info.pages || '?'}</span>
                    <button 
                        className='btn btn-outline-secondary' 
                        onClick={() => setPage(p => p + 1)} 
                        disabled={!info.next}
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    )
}