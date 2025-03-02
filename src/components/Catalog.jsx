import { carCatalogApi } from '../lib/api.js'
import { useEffect } from 'react'
import Header from './Header.jsx'

export default function Catalog() {

    // useEffect(() => {
    //     async function fetchCatalog() {
    //         const response = await carCatalogApi.get('/catalogoCarros')
    //         console.log(response.data)
    //     }

    //     fetchCatalog()
    // }, [])

    return (
        <>
            <Header />
            <div>oi</div>
        </>
    )
}