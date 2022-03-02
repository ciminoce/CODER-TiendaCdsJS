// obtengo el modal
const modalCarrito = document.getElementById("miCarrito");

//obtengo el botón para cerrarlo
const btnCerrarCarrito = document.getElementById("botonCerrarCarrito");

// Obtengo el botón que abre el modal
const botonCarrito=document.getElementById('miBotonCerrarModal');
//Obtengo la tabla de detalles del carrito
const detalleCarrito=document.getElementById('modal-table');
const detalleBody=document.getElementById('detallesTbody')
const footerCarrito=document.getElementsByClassName('modal-footer')[0];
/* // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]; */

// When the user clicks the button, open the modal 
botonCarrito.addEventListener('click',()=> {
    modalCarrito.style.display = "block";
    carritoDeCompras.length==0? noHayProductos(): hayProductos() //cuando no hay productos
    
    
});

btnCerrarCarrito.addEventListener('click',()=>{
    modalCarrito.style.display="none";
});

// Cuando el usuario hace clic fuera del model, se cierra también
window.onclick = function(event) {
if (event.target == modalCarrito) {
    modalCarrito.style.display = "none";
}
}
function noHayProductos(){
    detalleBody.innerHTML="";//limpio para que no me repita el mensaje
    let fila=document.createElement('tr');
    fila.id="celdaMensajeCarritoVacio";
    fila.innerHTML=`<td class="text-center" colspan="6"><p class="text-danger fs-3 fw-bold">Carrito vacío</p></td>`
    detalleBody.appendChild(fila);
    esconderFooter();
}
function hayProductos(){
    /* let footerCarrito=document.getElementsByClassName('modal-footer')[0]; */
    footerCarrito.style.display= "block";
}
function quitarMensajeCarritoVacio(child){
    detalleBody.removeChild(child);
};
function esconderFooter(){
    footerCarrito.style.display="none";
}