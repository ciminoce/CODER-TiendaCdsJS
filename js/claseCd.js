/* Clase CD */
class CD {
    constructor(id, nombre, interprete, estilo, precio, stock, imagen) {
        this.id = id;
        this.nombre=nombre;
        this.interprete=interprete;
        this.estilo=estilo;
        this.precio=precio;
        this.stock=stock;
        this.imagen=imagen;
    }
    PrecioConIvaIncluido() {
        return 1.21 * precio;
    }
    PrecioConDescuento(descuento) {
        return this.PrecioConIvaIncluido()*(1-descuento);
    }
}

/* funcion para crear un producto */
function crearCd(id, nombre, interprete, estilo, precio, stock, imagen){
    let cd=new CD(id, nombre, interprete, estilo, precio, stock, imagen);
    return cd;
}
/* funcion para agregar un cd al array */
function agregarProductoAlArray(cd) {
    cds.push(cd);
}