/* funcion para llenar los combos */
/* funcion para obtener los distintos intérpretes */
function obtenerInterpretes(arrayCds){
    //Busco los nombres de los intérpretes únicamente
    console.log(arrayCds);
    let allInterpretes=[];
    allInterpretes=arrayCds.reduce((allInterpretes, claseCd)=>{
        allInterpretes.push(claseCd.interprete);
        return Array.from(new Set(allInterpretes));
    },[]);
    /* console.log(allInterpretes);
    let arrayPreFiltrado=[];
    arrayCds.forEach(element => {
        arrayPreFiltrado.push(element.interprete);
    });
    let arrayFiltrado=[];
    for (let index = 0; index < arrayPreFiltrado.length; index++) {
        const element = arrayPreFiltrado[index];
        if (arrayFiltrado.indexOf(element)==-1) {
            arrayFiltrado.push(element);    
        }
    
    } */
    return allInterpretes;
}

/* funcion para obtener los distintos intérpretes */
function obtenerEstilos(arrayCds){
  //Busco los nombres de los estilos únicamente
    let allEstilos=[];
    allEstilos=arrayCds.reduce((allEstilos,claseCd)=>{
        allEstilos.push(claseCd.estilo);
        return Array.from(new Set(allEstilos));
    },[]);
    /* let arrayPreFiltrado=[];
    arrayCds.forEach(element => {
        arrayPreFiltrado.push(element.estilo);
    });
    
    let arrayFiltrado=[];
    for (let index = 0; index < arrayPreFiltrado.length; index++) {
        const element = arrayPreFiltrado[index];
        if (arrayFiltrado.indexOf(element)==-1) {
            arrayFiltrado.push(element);    
        }
    
    } */
    return allEstilos;
}
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
        comboOrden.value="";//vuelve el combo del orden al elemento por defecto
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
    comboOrden.addEventListener('change',()=>{
        
        let selected = parseInt(comboOrden.selectedIndex);
        switch (selected) {
            case 0:
                break;
            case 1:
                if(comboInterpretes.value=='Todos'){
                    
                    mostrarListaCds(cds.sort(SortArrayAZ));
                }else{
                    mostrarListaCds(cds.filter(elemento=>elemento.interprete==comboInterpretes.value).sort(SortArrayAZ));
                }
                    
                break;
            case 2:
                if(comboInterpretes.value=='Todos'){
                    
                    mostrarListaCds(cds.sort(SortArrayZA));
                }else{
                    mostrarListaCds(cds.filter(elemento=>elemento.interprete==comboInterpretes.value).sort(SortArrayZA));
                }
            default:
                break;
        }
    })
}
/* Funciones para el ordenamiento de los elementos del array */
function SortArrayAZ(x,y){
    if (x.nombre<y.nombre){return -1;}
    if(x.nombre>y.nombre){return 1;}
    return 0;
}
function SortArrayZA(x, y){
    if (x.nombre > y.nombre) {return -1;}
    if (x.nombre < y.nombre) {return 1;}
    return 0;
}
