export class ClienteResponseDto {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    fecha_registro: string;
    cliente_id: number;
    calle: string | null;
    ciudad: string | null;
    codigo_postal: string | null;
  }