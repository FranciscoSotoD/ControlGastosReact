import React, { useState } from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!presupuesto || presupuesto < 1) {
        setMensaje('No es un presupuesto válido...')
        return;
    } 
    setMensaje('')
    setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form 
            onSubmit={handleSubmit}
            className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Presupuesto</label>
                <input
                    value={presupuesto}
                    onChange={ (e) => setPresupuesto(Number(e.target.value)) }
                    className='nuevo-presupuesto' 
                    type='number'
                    placeholder='Añade tu presupuesto'
                />
            </div>            
            <input 
                type='submit'
                value='Añadir'
            />
            { mensaje && 
            <Mensaje tipoMensaje="error">
                { mensaje }
            </Mensaje> }
        </form>
    </div>
  )
}

export default NuevoPresupuesto