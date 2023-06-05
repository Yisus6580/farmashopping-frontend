export interface OrderModel {
  PrincipalID: string;
  NumDocumento: number;
  NumReferencia: number;
  Descripcion: string;
  Fecha: string;
  Tag: string;
  Modalidad: string;
  Etapa: string;
  LugarCliente: string;
  ZonaCliente: string;
  NombreCompletoCliente: string;
  DireccionCliente: string;
  NombreCompletoResponsable: string;
  NombreCompletoDistribuidor: string;
  TotalCredito: number;
  NumDeposito: number;
  NombreDeposito: string;
  Detalle: any[];
}
