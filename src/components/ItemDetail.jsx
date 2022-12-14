import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemCount } from "./ItemCount";
import './styles/itemDetail.css';
import Button from 'react-bootstrap/Button';
import { CartContext } from "../context/cartContext";
import swal from "sweetalert";


/* poner un sweetalert cuando pone productos */

const ItemDetail = ({ item }) => {
  const { addItem, isInCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [currentStock, setCurrentStock] = useState(item.stock);
  const maxQuantity = currentStock;

  function handleCount(type) {
    if (type === "plus" && count < maxQuantity) setCount(count + 1);
    if (type === "minus" && count > 1) setCount(count - 1);
  }

  function handleAdd() {
    if (currentStock < count) swal("No hay suficiente stock de este producto");
    else {
      setCurrentStock(currentStock - count);
      addItem(item, count);
      swal ('SE AGREGO UN PRODUCTO')
  }
}

  function handleCheckout() {
    navigate("/cart");
  }

  return (
    <div className="conteiner ">
      {/* Item image */}
      <div className="flex justify-center w-1/2">
        <img className="ContenedorFoto max-h-[500px]" src={item.imageProd} alt={item.name} />
      </div>

      {/* Item description */}
      <div className="interno flex flex-col justify-center pl-10">
        <h2 className="text-3xl font-bold text-gray-800">{item.name}</h2>
        <p className="mt-4 text-xl">{item.description}</p>
        <span className="mt-4 text-xl">
          Price: <strong className="text-gray-800">${item.price}</strong>
        </span>
        {currentStock > 0 && (
          <p className="text-sm">In Stock: {currentStock}</p>
        )}

        <div className=" contador flex flex-col flex-1 items-center">
          {/* Count */}
          {currentStock > 0 ? (
            <ItemCount count={count} handleCount={handleCount} />
          ) : (
            <span className="text-red-500 mt-10">Sin stock</span>
          )}
          <div className="botonesInferiores w-full flex flex-col items-center">
            <Button
              onClick={handleAdd}
              className="boton1 w-4/5 bg-gray-200 px-4 py-2 mt-2 rounded disabled:opacity-40 botonInf"
              disabled={currentStock === 0}
            >
              Agregar al carrito

            </Button>
            <Button onClick={() => navigate("/")}
                    className="boton2 w-4/5 rounded-lg p-2 bg-gray-800 text-white"
                  >
                    Seguir comprando
                  </Button>
            <Button
              onClick={handleCheckout}
              className="boton3 w-4/5 bg-gray-800 text-white px-4 py-2 mt-2 rounded"
            >
              Finalizar Compra
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

