/* funcion para llenar los combos */
function llenarCombos(arrayCds){
/* Combos */
    const comboEstilos=document.getElementById('estiloBusqueda');
    const comboInterpretes=document.getElementById('interpreteBusqueda')
    /* Lleno combo de estilos */
    
    let arrayEstilos=obtenerEstilos(arrayCds);
    let opciones=`<option value="" disabled selected>Seleccione Estilo</option>
                        <option value="Todos">Todos</option>`;
    arrayEstilos.sort();
    arrayEstilos.forEach(estilo=>{
        opciones+= `<option value="${estilo}">${estilo}</option>`;
    })
    
    comboEstilos.innerHTML = opciones;

    
    comboEstilos.addEventListener('change',()=>{
        comboInterpretes.value= "";//vuelve al combo al elemento por defecto
        comboEstilos.value=='Todos'?mostrarListaCds(cds):
            mostrarListaCds(cds.filter(elemento=>elemento.estilo==comboEstilos.value));

    })
 /* ************************************ */

  /* Lleno combo de interpretes */
    opciones=`<option value="" disabled selected>Seleccione Intérprete</option>
            <option value="Todos">Todos</option>`;
    //let comboInterpretes=document.getElementById('interpreteBusqueda');
    let arrayInterpretes=obtenerInterpretes(arrayCds);

    
    arrayInterpretes.sort();//Ordeno el array antes de cargar los elementos al combo
    arrayInterpretes.forEach(interprete => {
        opciones+=`<option value="${interprete}">${interprete}</option>`;
    });
    comboInterpretes.innerHTML = opciones;

    comboInterpretes.addEventListener('change',()=>{
        comboEstilos.value= "";//vuelve al combo al elemento por defecto
        comboInterpretes.value=='Todos'? mostrarListaCds(cds):
            mostrarListaCds(cds.filter(elemento=>elemento.interprete==comboInterpretes.value));
        
        
    })
/* ************************************ */
/* Llenado del combo de orde de listado */
    let comboOrden=document.getElementById('ordenListado');
    opciones=`<option value="" disabled selected>Seleccione Orden</option>`;
    ordenListado.forEach(orden => {
        opciones+= `<option value="${orden}">${orden}</option>`;
    });
    comboOrden.innerHTML=opciones;
}
