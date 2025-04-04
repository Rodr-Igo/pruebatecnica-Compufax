export class OrdenResponseDto {
  id: number;
  cliente_id: number | null;
  nombre_cliente: string;
  apellido_cliente: string;
  producto: string;
  cantidad: number;
  fecha_pedido: Date | null;
  folio: string;
  }