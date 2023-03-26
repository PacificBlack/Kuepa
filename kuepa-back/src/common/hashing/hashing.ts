import * as bcrypt from 'bcrypt';

export class HashPassword {
  /**
   * Hashing password
   *
   * @remarks
   * Hashea la contraseña para que esta no pueda ser guardada como es originalmente
   * @param password - Contraseña ingresada por el usuario
   * @returns password - Contraseña haseada lista para almacenar
   */
  static async HashingPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  /**
   * Compare Password
   *
   * @remarks
   * Compara si la contraseña ingresada coincide con la alojada en la base de datos
   * @param password_input - Contraseña ingresada por el usuario
   * @param password - Contraseña alojada en la base de datos
   * @returns un valor de @type boolean que comprueba la validez de la contraseña
   */
  static async ComparePassword(
    password_input: string,
    password: string,
  ): Promise<boolean> {
    const passaport = await bcrypt.compare(password_input, password);
    return passaport;
  }
}
