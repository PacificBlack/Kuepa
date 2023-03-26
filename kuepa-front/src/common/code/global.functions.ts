export class FuncionesGlobales {
  comprobarUrl(url: string, texto: string) {
    return url.split('/').find((param) => texto === param) ? true : false;
  }
  diferenciaArreglos(array1: any[], array2: any[]) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.id === object2.id;
      });
    });
  }
}
