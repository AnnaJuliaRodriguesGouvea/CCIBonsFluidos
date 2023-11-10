export function formataData(data){
    const dataObjeto = new Date(data);

    const ano = dataObjeto.getFullYear();
    const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, "0");
    const dia = (dataObjeto.getDate()).toString().padStart(2, "0");

    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada
}