import { Children, useState, useEffect } from 'react'
import Mensaje from './Mensaje';

import CerrarModal from '../img/cerrar.svg'

const Modal = ({
  setModal, 
  animarModal, 
  setAnimarModal, 
  agregarNuevoGasto, 
  gastoEditar, 
  setGastoEditar}) => {

  const [nombreGasto, setNombreGasto] = useState('');
  const [cantidadGasto, setCantidadGasto] = useState(0);
  const [categoriaGasto, setCategoriaGasto] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setNombreGasto(gastoEditar.nombreGasto);
      setCantidadGasto(gastoEditar.cantidadGasto);
      setCategoriaGasto(gastoEditar.categoriaGasto);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if( [nombreGasto, cantidadGasto, categoriaGasto].includes('') ) {
      setMensaje('Todos los gastos son obligatorios...');
      setTimeout(() => {
        setMensaje('')
      }, 3000);      
      return;
    }
    //console.log('Enviando...');
    agregarNuevoGasto({nombreGasto, cantidadGasto, categoriaGasto, id, fecha});
    setNombreGasto('');
    setCantidadGasto(0);
    setCategoriaGasto('');
    
  }

  const handleCerrarModal = () => {
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 500)
  }
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerrarModal}
                alt="Cerrar modal"
                onClick={handleCerrarModal}                
            />
        </div>

        <form 
          onSubmit={handleSubmit}
          className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
          action=""
        >
          <legend>{ gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

          { mensaje && <Mensaje tipoMensaje="error">
            <p>{mensaje}</p>
          </Mensaje> }

          <div className='campo'>
            <label htmlFor="nombre">Nombre del Gasto</label>
            <input 
              id='nombre'
              type='text'
              placeholder='Añade el nombre del gasto'
              value={nombreGasto}
              onChange={ (e) => setNombreGasto(e.target.value) }
            />            
          </div>

          <div className='campo'>
            <label htmlFor="cantidad">Cantidad</label>
            <input 
              id='cantidad'
              type='number'
              placeholder='Añade la cantidad del gasto: ej. 200'
              value={cantidadGasto}
              onChange={ (e) => {setCantidadGasto(Number(e.target.value)) } }
            />            
          </div>

          <div className='campo'>
            <label htmlFor="categoria">Categoría</label>
            <select name="categoria" id="categoria"
              value={categoriaGasto}
              onChange={ (e) => { setCategoriaGasto(e.target.value) } }
            >
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Extras</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
          </div>

          <input 
            type='submit'
            value={ gastoEditar.id ? 'Actualizar Gasto' : 'Añadir Gasto' }
          />

        </form>
    </div>
  )
}

export default Modal