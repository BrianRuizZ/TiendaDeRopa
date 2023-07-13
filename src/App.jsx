import React,{ useState,useRef, useEffect } from 'react'
import { BsInstagram, BsFacebook } from 'react-icons/bs'
import { productos } from './jsons/productos.json'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css'



function App() {

  const destinoRef = useRef(null)

  const [filters, setFilters] = useState({
    category: 'todo',
    precio: 0
  })

  const images = [
    {
      'url' : './productos/inicio-derecha.png',
      'title' : 'imagen 1'
    },
    {
      'url' : './productos/inicio.jpg',
      'title' : 'imagen 2'
    },
    {
      'url' : './productos/nike-c-a.png',
      'title' : 'imagen 2'
    }
  ]

  const filtrarProductos = (productos) => {
    return productos.filter(producto => {
      return (
        producto.precio >= filters.precio && 
        (
          filters.category == 'todo' || 
          producto.categoria == filters.category
        )
      )
    })
  }

  const ProductosFiltrados = filtrarProductos(productos)

  const toDestino = () => {
    destinoRef.current.scrollIntoView({behavior: 'smooth'})
  }

  const carouselSettings = {
    showThumbs: false,
    showStatus: false,
    showArrows: false
  };

  const handleChangeCategory = (event) => {
    toDestino()
    setFilters(prevFilters => ({
      ...prevFilters,
      category: event.target.value
    }));
  }
  
  const handleBusqueda = (event) => {
      let texto = event.target.value;
      texto = texto.toLowerCase();
      if (texto != '') {
      setFilters(prevFilters => ({
          ...prevFilters,
          category: texto
      }));
      }else{
        setFilters(prevFilters => ({
          ...prevFilters,
          category: 'todo'
      }));
      }   
   }

  return (
    <>
      <nav className='nav'>
        <ul className='ul-nav'>
          <li className='li-nav'>
            <input
            onChange={handleBusqueda}
            onClick={()=> toDestino()}
            onTouchStart={()=> toDestino()}
            className="busqueda-input" 
            type='text' 
            placeholder='¿Que estas buscando? 🔎'>
            </input>
          </li>
          <li className='li-nav titulo-h2'><h2>Excelencia</h2><span className='span-tituloh2'>Shop</span></li>
          <li className='li-nav'>
            <select onChange={handleChangeCategory} className='select-nav'>
              <option value='todo'>Todo</option>
              <option value='remeras'>Remeras</option>
              <option value='buzos'>Buzos</option>
              <option value='medias'>Medias</option>
              <option value='pantalones'>Pantalones</option>
              <option value='zapatillas'>Zapatillas</option>
            </select>
          </li>
        </ul>
      </nav>
      <div className='presentacion'>
        <Carousel {...carouselSettings}
         className='presentacion'>
          {images.map((image, index) => (
            <div className='imagen-presentacion' key={index}>
              <img src={image.url} alt={image.title} />
            </div>
          ))}
        </Carousel>
      </div>
      <h3 ref={destinoRef} className='texto-categoria'><a id="categorias-a" className='texto-categoria-a' href='#categorias-a'>Descubre una nueva forma de experimentar la excelencia: nuestros productos están aquí para cautivarte y superar tus expectativas.</a></h3>
      <div 
        className='flecha-cont'
        onClick={toDestino}>
          <div className='flecha'></div>
      </div>
      <div id='destino' className='categorias'>
        {ProductosFiltrados.map(producto => (
          <ul className='ul-categoria' key={producto.id}>
            <li><h2 className='producto-nombre'>{producto.nombre}</h2></li>
            <li><img className='categoria-img' src={producto.imagen}></img></li>
            <li><p className='precio-categoria'>${producto.precio}</p></li>
          </ul>
      ))}
      </div>
      <footer className='footer'>
        <p className='footer-p'>
          Seguinos en nuestras redes. 
        </p>
          <a className='icon-footer'
            href='#'>
            <BsInstagram/></a>
          <a className='icon-footer'
            href='#'>
            <BsFacebook/></a>
        </footer>
    </>
  )
}

export default App
