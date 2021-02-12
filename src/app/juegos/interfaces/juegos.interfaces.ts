export interface JuegosInterfaces {
  nombre:       string;
  direccion:    string;
  descripcion:  string;
  precio:       number;
  categoria_id: number;
  img?:          File;
  id?:           number;
  created_at?:   Date;
  updated_at?:   Date;
}
