import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearState } from '../../stores/bears/bears.store';

export const BearPage = () => {



  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        <BlackBears />

        <PolarBears/>

        <PandaBears/>

        <ActualizarSiHayNuevos/>

      </div>

    </>
  );
};



export const BlackBears = () => {

  const blackBears = useBearState(state => state.blackBear)
  const increment = useBearState(state => state.incrementBlack)
  const deleteBears = useBearState(state => state.deleteBlackBears)

  return (
    <WhiteCard centered>
          <h2>Osos Negros</h2>

          <div className="flex flex-col md:flex-row">
            <button
              onClick={() => increment(+1)}
            > +1</button>
            
            <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
            <div className='row-auto'>
            <button
              onClick={() => increment(-1)}
            >-1</button>
            <button onClick={deleteBears}>Delete</button>
            </div>
          </div>

        </WhiteCard>
  )
}


export const PolarBears = () => {
  const PolarBears = useBearState(state => state.polarBear)
  const increment = useBearState(state => state.incrementPolar)
  const deleteBears = useBearState(state => state.deletePolarBears)

  return (
    <WhiteCard centered>
          <h2>Osos Polares</h2>

          <div className="flex flex-col md:flex-row">
            <button
              onClick={() => increment(+1)}
            > +1</button>
            
            <span className="text-3xl mx-2 lg:mx-10"> {PolarBears} </span>
            <div className='row-auto'>
            <button
              onClick={() => increment(-1)}
            >-1</button>
            <button onClick={deleteBears}>Delete</button>
            </div>
          </div>
    </WhiteCard>
  )
}


export const PandaBears = () => {

  const PandaBears = useBearState(state => state.pandaBear)
  const increment = useBearState(state => state.incrementPanda)
  const deleteBears = useBearState(state => state.deletePandaBears)

  return (
    <WhiteCard centered>
          <h2>Osos Panda</h2>

          <div className="flex flex-col md:flex-row">
            <button
              onClick={() => increment(+1)}
            > +1</button>
            
            <span className="text-3xl mx-2 lg:mx-10"> {PandaBears} </span>
            <div className='row-auto'>
            <button
              onClick={() => increment(-1)}
            >-1</button>
            <button onClick={deleteBears}>Delete</button>
            </div>
          </div>
    </WhiteCard>
  )
}

export const ActualizarSiHayNuevos = () => {
  const osos = useBearState(useShallow(state => state.osos))
  const refreshOsos = useBearState(state => state.actualizarSiHayNuevos)
  const addBear = useBearState(state => state.addBear);
  const clearBears = useBearState(state => state.clearBears);


  const oso = JSON.stringify(osos, null, 2)


  return (
      <WhiteCard>
          <h1>Osos:</h1>

          <pre>
        {oso}
      </pre>

          <button
              onClick={refreshOsos}
          >
              refresh
          </button>

          <button
              onClick={addBear}
          >
              addBear
          </button>
          <button
              onClick={clearBears}
          >
              Clear Bears
          </button>
      </WhiteCard>
  )
}