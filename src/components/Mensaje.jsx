import React from 'react'

const Mensaje = ({children, tipoMensaje}) => {
  return (
    <div className={`alerta ${tipoMensaje}`}>{children}</div>
  )
}

export default Mensaje