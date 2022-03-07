let carritoDeCompras = []
/* Contenedores */

/* const contenedorCarrito = document.getElementsByClassName('modal-body')[0];

/* Cosas del carrito */
/* const contadorCarrito = document.getElementById('contadorCarrito'); */ 
let totalCarrito = 0;

const detalleCarrito=document.getElementById('detallesTbody');







/*funcion para actualizar el stock de un producto */

/* funcion para agregar al carrito desde el local storage */
function agregarAlCarritoDesdeLocal(idCd, cantidad) {
    
    let cdComprar = cds.find(elemento => elemento.id ==idCd);
    console.log(cdComprar);
    cdComprar.cantidad=cantidad;
    carritoDeCompras.push(cdComprar);
    totalCarrito=totalizarCarrito();
    //agregarHtmlCarrito(cdComprar);
    //actualizarStock(cdComprar,true,cantidad);//actualiza el stock en el array

        
    //document.getElementById(`inputCantidad${id}`).value=cantidad;
    


}

/* funcion para agregar al html del carrito */
function mostrarCarrito(){
    carritoDeCompras.forEach(item=>{
        let valorAnterior=0;

        console.log(item);

        let {nombre, imagen, precio, stock, id}=item;//desestructurando el obj Cd
        let fila=document.createElement('tr');
        fila.id=`row${id}`;
        fila.innerHTML=`<td><img src="${imagen}" alt="${nombre}" width="40%"/></td>
                        <td>${nombre}</td>
                        <td>${precio}</td>
                        <td>
                            <input id="input${id}" type="number" value="${item.cantidad}" min="1" max="${stock}" style="width:3rem" >
                        </td>
                        <td id="subtotal${id}">${item.cantidad*precio}</td>
                        <td ><button id="btnEliminar${id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button></td>`;
                        
        /* let filaMensaje=document.getElementById('celdaMensajeCarritoVacio')
        filaMensaje && quitarMensajeCarritoVacio(filaMensaje); //Quito el mensaje de carrito vacío */
        detalleCarrito.appendChild(fila);
        let inputDelCarrito=document.getElementById(`input${id}`);
        inputDelCarrito.addEventListener('focus',()=>{
            valorAnterior=inputDelCarrito.value;
        });
        inputDelCarrito.addEventListener('change',()=>{
            item.cantidad=parseInt(inputDelCarrito.value);//tomo el valor del input del carrito

            document.getElementById(`subtotal${id}`).innerHTML = `<td id="subtotal${id}">${item.cantidad*precio}</td>`;//actualizo el sub
            //valorAnterior<inputDelCarrito.value?actualizarStock(item,true,1):actualizarStock(item,false,1);
            totalCarrito=totalizarCarrito();
            document.getElementById(`totalFinal`).innerHTML=`<td id="totalFinal"><strong>${totalCarrito}</strong> </td> <td></td>`;

            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
        }) 
    
        /*Agrego escucha del evento click al boton */
        let botonEliminar = document.getElementById(`btnEliminar${id}`);//obtengo el boton
        
        /* Agrego escucha del evento click al boton */
        botonEliminar.addEventListener('click',()=>{
            Swal.fire({
                title: 'Está seguro?',
                text: "No podrá deshacer el cambio!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText:'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borralo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    
                        let contenedor=document.getElementById('detallesTbody');//ubico al contenedor padre
                        let row=document.getElementById(`row${id}`);//al hijo
                        contenedor.removeChild(row); //quito el hijo
                        //actualizarStock(item,false,item.cantidad);//Actualizo el stock
                        carritoDeCompras = carritoDeCompras.filter(item => item.id != id);//actualizo el array carrito
                        console.log(carritoDeCompras);//ver el carrito
                        totalCarrito=totalizarCarrito();
                        document.getElementById(`totalFinal`).innerHTML=`<td id="totalFinal"><strong>${totalCarrito}</strong> </td> <td></td>`;
                        carritoDeCompras.length==0 && noHayProductos()
                        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));    
                    }
                    
                    

                    Swal.fire(
                    'Borrado!',
                    'Producto quitado del carrito.',
                    'success'
                    );
                }
            );
            
        });

    });

    let fila=document.createElement('tr');
        fila.id=`rowTotal`;
        fila.innerHTML=`<td></td>
                        <td></td>
                        <td></td>
                        <td><strong><span>Total: $</span></strong></td>
                        <td id="totalFinal"><strong>${totalCarrito}</strong> </td> <td></td>`;
        detalleCarrito.appendChild(fila);

    
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}
/* fin funcion agregar al html del carrito */

/* function para recuperar el carrito de compras */
function recuperarCarrito(){
    let leerLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    /* contadorCarrito.innerText="0";
        console.log(contadorCarrito); */

    if(leerLocalStorage){
        leerLocalStorage.forEach(cd => {
        //agregarAlCarrito(cd.id)
        agregarAlCarritoDesdeLocal(cd.id, cd.cantidad);
        });
    }
}

/* funcion que retorna el total del carrito */
function totalizarCarrito(){
    
    //contadorCarrito.innerText = carritoDeCompras.reduce((acc,cd)=> acc +cd.cantidad , 0);
    return carritoDeCompras.reduce((acc,cd)=> acc + (cd.precio * cd.cantidad), 0);
}
/* fin funcion para actualizar carrito */

/* funcion para obtener los distintos intérpretes */

async function cargarArrayCds() {
    const URL = "/js/datos.json";
    let array = [];
        /*   await fetch(URL).then(respuesta=>respuesta.json())
        .then(cds=>{
            cds.forEach(elemento=>array.push(elemento));
        });
      return array; */
    let respuesta = await fetch(URL);
    let datos = await respuesta.json();
    
    datos.forEach((elemento) => array.push(elemento));
    //llamo a las funciones dentro de la función que me trae los datos
    recuperarCarrito();    
    //return array;
    mostrarCarrito();
}

function noHayProductos(){
    detalleCarrito.innerHTML="";//limpio para que no me repita el mensaje
    let fila=document.createElement('tr');
    fila.id="celdaMensajeCarritoVacio";
    fila.innerHTML=`<td class="text-center" colspan="6"><p class="text-danger fs-3 fw-bold">Carrito vacío</p></td>`
    detalleCarrito.appendChild(fila);
    
    manejarBotonFinalizar(false);
}
function manejarBotonFinalizar(valorLogico){
    valorLogico?document.getElementById(`btnFinalizar`).removeAttribute('disabled'):
    document.getElementById('btnFinalizar').setAttribute('disabled',true);
}

/* Comienzo */
cargarArrayCds();

//llenarCombos(newCds); //Lleno los combos
//mostrarListaCds(newCds); //Muestro los Cds
 //Recupero el carrito del localStorage


