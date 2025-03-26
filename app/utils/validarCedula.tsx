export function validarCedula(cedula:string) : boolean {
    if (!/^\d{10}$/.test(cedula)) return false;
  
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) return false;
  
    const tercerDigito = parseInt(cedula[2], 10);
    if (tercerDigito < 0 || tercerDigito > 6) return false;
  
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let num = parseInt(cedula[i], 10);
      if (i % 2 === 0) num *= 2;
      if (num > 9) num -= 9;
      suma += num;
    }
  
    const verificador = (10 - (suma % 10)) % 10;
    return verificador === parseInt(cedula[9], 10);
  }