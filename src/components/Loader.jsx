import './styles/loader.css'
const Loader = () => {
    return (
      <div className="loader-container" id="loader">
        <div className="loader-circle-img">
          <div className="loader-circle-1"></div>
          <div className="loader-circle-2"></div>
        </div>
        <p className="loader-text">Cargando Productos...</p>
      </div>
    );
  };
  
  export default Loader;
  