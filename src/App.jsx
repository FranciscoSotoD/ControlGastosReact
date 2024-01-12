import { Children, useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  
  const [gastos, setGastos] = useState( localStorage.getItem('gastos') ? JSON.parse( localStorage.getItem('gastos')) : [] );
  
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0 ) {
        setModal(true)
        setTimeout(() => {
          //console.log('animando modal')
          setAnimarModal(true)
        }, 500)
    }
  }, [ gastoEditar ])

  // Agregar presupuesto al LocalStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto] )

  useEffect(() => {
    const presupuestoLs = localStorage.getItem('presupuesto');
    if(presupuestoLs > 0) {
      setIsValidPresupuesto(true)
    }    
  }, [])

  // Agregar gastos al LocalStorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]) 

  // 
  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( g => g.categoriaGasto === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro] )

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      //console.log('animando modal')
      setAnimarModal(true)
    }, 500)
  }

  const agregarNuevoGasto = (gasto) => {
    if( gasto.id ) {
      // Actualizar gasto
      const gastosActualizado = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState );
      setGastos(gastosActualizado);
    } else {
      // Agregar nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      //console.log(gasto);
      setGastos([...gastos, gasto]);
    }
    setGastoEditar({})
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const eliminarGasto = idGasto => {
    //console.log('gasto a eliminar; ' + idGasto);
    const gastosActuales = gastos.filter( idGastoState => idGastoState.id !== idGasto );
    setGastos(gastosActuales);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      { isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />                    
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt='Icono nuevo gasto'
              onClick={ handleNuevoGasto }
            />
          </div>        
        </>
      ) }

      { modal && (
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          agregarNuevoGasto={agregarNuevoGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      ) }

    </div>
  )
}

export default App
