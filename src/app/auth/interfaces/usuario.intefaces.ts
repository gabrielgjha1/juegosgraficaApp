export interface Usuario {

  email:             string;
  password?:          string;
  password2?:          string;
  name?:              string;
  role?:              string;
  id?:                number;
  created_at?:        Date;
  updated_at?:        Date;
}
