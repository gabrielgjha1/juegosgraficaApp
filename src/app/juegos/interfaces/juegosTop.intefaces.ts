export interface juegostop {
  id:           number;
  nombre:       string;
  direccion:    string;
  descripcion:  string;
  img:          string;
  precio:       number;
  categoria_id: number;
  created_at:   Date;
  updated_at:   Date;
  voto_count:   number;
  categoria:    Categoria;
}

export interface Categoria {
  id:         number;
  nombre:     string;
  created_at: Date;
  updated_at: Date;
}
