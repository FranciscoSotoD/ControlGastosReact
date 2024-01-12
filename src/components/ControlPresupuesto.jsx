import { useState, useEffect, Children } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidadGasto + total ,0);
        //console.log(totalGastado)
        setGastado(totalGastado);
        
        const totalDisponible = presupuesto - totalGastado;
        //console.log(totalDisponible)

        // Calcular porcentaje gastado
        const nuevoPorcentaje = (( ( presupuesto - totalDisponible ) / presupuesto ) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

        setDisponible(totalDisponible)
    }, [gastos] )

  const formatearPresupuesto = (presupuestoFormatear) => {
    return presupuestoFormatear.toLocaleString('en-US', {
        style: "currency",
        currency: "USD"
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

    if(resultado) {
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={porcentaje} 
                text={`${porcentaje}% Gastado`}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5'
                })}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button 
                className='reset-app'
                type='button'
                onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearPresupuesto(presupuesto)}
            </p>
            <p className={`${disponible < 1 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearPresupuesto(gastado)}
            </p>
        </div>

    </div>
  )
}

export default ControlPresupuesto