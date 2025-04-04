export class OrdenResponseDto {
    id: number;
    cliente_id: number | null;
    producto: string;
    cantidad: number;
    fecha_pedido: Date | null;
    folio: string;
  }