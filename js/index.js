let carritoDeCompras = []
/* Contenedores */

const contenedorCarrito = document.getElementsByClassName('modal-body')[0];

/* Cosas del carrito */
const contadorCarrito = document.getElementById('contadorCarrito');
const totalCarrito = document.getElementById('totalCarrito');




/* funcion para mostrar la lista de cds disponibles */
function mostrarListaCds(arrayCds){
    const cdsContainer = document.querySelector(".main__disqueria__detalles__row"); 
    cdsContainer.innerHTML="";//limpio el html para que no quede nada
    /* ciclo para recorrer el array de cds disponibles */
    arrayCds.forEach(cd=>{
        let {nombre, imagen, interprete, estilo, precio, stock, id}=cd;//desestructurando el obj Cd
        let div = document.createElement('div');
        div.className = 'cd';
        div.classList.add('main__disqueria__detalles__col','col');
        div.innerHTML+=`<div class="card h-100" style="width: 20rem;">
                        <div class="card-header text-center">
                            ${nombre}
                        </div>
                        <img src="${imagen}" alt="${nombre}" class="card-img-top card__imagen">
                        <div class="card-body">
                            <h5 class="card-title text-center">${interprete}</h5>
                            <div class="card-text text-center">
                                <p>Estilo: <strong>${estilo}</strong></p>
                                <p>Precio: <strong>$${precio}</strong></p>
                                <p id="stock${id}">Stock: <strong>${stock}</strong></p>
                            </div>
                            
                        </div>
                        <div class="card-footer">
                            <button id="botonAgregar${id}" href="#" class="btn btn-primary" disabled>Comprar
                                <i class=" fa fa-shopping-cart" aria-hidden="true" e></i>
                            </button>
                            <input id="inputCantidad${id}" class="card__numero" type="number" value="1" min="1" max="${stock}" style="width:3rem">
                        </div>
                    </div>`;
        cdsContainer.appendChild(div);//agrego al contenedor

        //Verificar por acá si no hay stock deshabilitar el botón
        let botonAgregar = document.getElementById(`botonAgregar${id}`);
        
        botonAgregar.addEventListener('click',()=>{

            agregarAlCarrito(id);
        });
        stock!=0 && habilitarBoton(id);  
    });

}
/* fin funcion de mostrar lista de cds */


/* Funcion para habilitar botones **/
function habilitarBoton(id){
    document.getElementById(`botonAgregar${id}`).removeAttribute('disabled');//Ahora anda JODER!!!!
    
}

/*Funcion para deshabilitar botones */
function deshabilitarBoton(id){
    document.getElementById(`botonAgregar${id}`).setAttribute('disabled',true);
    
}

/*funcion para buscar repetido en carrito */
function buscarRepetido(id){
    return carritoDeCompras.find(elemento=>elemento.id==id);
}



/* funcion para agregar al carrito */
function agregarAlCarrito(idCd) {
    let cdRepetido=buscarRepetido(idCd);

    console.log(carritoDeCompras);
    
    if(cdRepetido){
        let {precio, stock, id}=cdRepetido;//desestructurando el obj Cd
        let inputCantidad=parseInt(document.getElementById(`inputCantidad${id}`).value);
        if (inputCantidad>0 && inputCantidad<=stock) {
            cdRepetido.cantidad+=inputCantidad;

            //document.getElementById(`cantidad${id}`).innerHTML = `<td id="cantidad${id}">${cdRepetido.cantidad}</td>` 
            document.getElementById(`input${id}`).value=cdRepetido.cantidad;
            document.getElementById(`subtotal${id}`).innerHTML = `<td id="subtotal${id}">${cdRepetido.cantidad*precio}</td>`;
            actualizarCarritoDeCompras();  

            
            actualizarStock(cdRepetido,true,inputCantidad);//actualiza el stock en el array
            Toastify({
                text: "CD agregado al carrito",
                duration: 1500,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: false,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();

            
        } else {
            
            Swal.fire({
                title: 'Error!',
                text: 'Cantidad de compra no válida o superior al stock. Favor de verificar la cantidad ingresada',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            
        }    
        document.getElementById(`inputCantidad${id}`).value=1;
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        
    }else{
            let cdComprar = cds.find(elemento => elemento.id ==idCd);
            let { stock, id}=cdComprar;//desestructurando el obj Cd
            let inputCantidad=parseInt(document.getElementById(`inputCantidad${id}`).value);
            
            if (inputCantidad>0 && inputCantidad<=stock) {
                cdComprar.cantidad=inputCantidad;
                carritoDeCompras.push(cdComprar);
                actualizarCarritoDeCompras();
                agregarHtmlCarrito(cdComprar);
                actualizarStock(cdComprar,true,inputCantidad);//actualiza el stock en el array

                Toastify({
                    text: "CD agregado al carrito",
                    duration: 1500,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: false,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();
                

            } else {
                Swal.fire({
                        title: 'Error!',
                        text: 'Cantidad de compra no válida o superior al stock. Favor de verificar la cantidad ingresada',
                        icon: 'error',
                        confirmButtonText: 'OK'
                })
            }    
            document.getElementById(`inputCantidad${id}`).value=1;
    } 


}

/* fin funcion para agregar al carrito */

/*funcion para actualizar el stock de un producto */
function actualizarStock(cd,resta, cantidad){
    
    resta?cd.stock-=cantidad:cd.stock+=cantidad;
    console.log(cd.id);
    console.log(cantidad);
    document.getElementById(`stock${cd.id}`).innerHTML=`<p id="stock${cd.id}">Stock: <strong>${cd.stock}</strong></p>`;
    cd.stock==0 ? deshabilitarBoton(cd.id):habilitarBoton(cd.id);
    
};
/* funcion para agregar al carrito desde el local storage */
function agregarAlCarritoDesdeLocal(idCd, cantidad) {
    
    let cdComprar = cds.find(elemento => elemento.id ==idCd);
    
    cdComprar.cantidad=cantidad;
    carritoDeCompras.push(cdComprar);
    actualizarCarritoDeCompras();
    agregarHtmlCarrito(cdComprar);

    // lo comenté para ver lo del localStorage
    //actualizarStock(cdComprar,true,cantidad);//actualiza el stock en el array

        
    //document.getElementById(`inputCantidad${cdComprar.id}`).value=cantidad;
    


}

/* funcion para agregar al html del carrito */
function agregarHtmlCarrito(cd){
    /*my new way */
    let valorAnterior=0;
    let {nombre, imagen, precio, id}=cd;//desestructurando el obj Cd
    let fila=document.createElement('tr');
    fila.id=`row${id}`;
    fila.innerHTML=`<td ><img src="${imagen}" alt="${nombre}" width="20%"/></td>
                    <td >${nombre}</td>
                    <td >${precio}</td>
                    <td>
                        <input id="input${id}" type="number" value="${cd.cantidad}" min="1" max="${cd.stock}" style="width:3rem" >
                    </td>
                    <td  id="subtotal${id}">${cd.cantidad*precio}</td>
                    <td ><button id="btnEliminar${id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button></td>`;
                    
    let filaMensaje=document.getElementById('celdaMensajeCarritoVacio')
    filaMensaje && quitarMensajeCarritoVacio(filaMensaje); //Quito el mensaje de carrito vacío
    detalleBody.appendChild(fila);

    let inputDelCarrito=document.getElementById(`input${id}`);
    inputDelCarrito.addEventListener('focus',()=>{
        valorAnterior=inputDelCarrito.value;
    });
    inputDelCarrito.addEventListener('change',()=>{
        cd.cantidad=parseInt(inputDelCarrito.value);//tomo el valor del input del carrito

        document.getElementById(`subtotal${id}`).innerHTML = `<td id="subtotal${id}">${cd.cantidad*precio}</td>`;//actualizo el sub
        valorAnterior<inputDelCarrito.value?actualizarStock(cd,true,1):actualizarStock(cd,false,1);
        
        actualizarCarritoDeCompras();

        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
    })
    
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
                    actualizarStock(cd,false,cd.cantidad);//Actualizo el stock
                    carritoDeCompras = carritoDeCompras.filter(item => item.id != id);//actualizo el array carrito
        
                    carritoDeCompras.length==0 && noHayProductos()
                    
                }
                actualizarCarritoDeCompras();//
                localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));

                Swal.fire(
                'Borrado!',
                'Producto quitado del carrito.',
                'success'
                )
            }
        );
        
    });
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
}
/* fin funcion agregar al html del carrito */

/* function para recuperar el carrito de compras */
function recuperarCarrito(){
    let leerLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    contadorCarrito.innerText="0";
        console.log(contadorCarrito);

    if(leerLocalStorage){
        leerLocalStorage.forEach(cd => {
        //agregarAlCarrito(cd.id)
        agregarAlCarritoDesdeLocal(cd.id, cd.cantidad);
        });
    }
}

/* funcion para actualizar carrito */
function actualizarCarritoDeCompras(){
    
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,cd)=> acc +cd.cantidad , 0);
    totalCarrito.innerText = carritoDeCompras.reduce((acc,cd)=> acc + (cd.precio * cd.cantidad), 0);
}
/* fin funcion para actualizar carrito */


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
    llenarCombos(array); //Lleno los combos
    mostrarListaCds(array)
    //return array;
}
/* Comienzo */
cargarArrayCds();
//llenarCombos(newCds); //Lleno los combos
//mostrarListaCds(newCds); //Muestro los Cds
recuperarCarrito(); //Recupero el carrito del localStorage






