
import bcrypt from "bcrypt";
import mongoose,  {Document, Schema, Model} from "mongoose";

// Definir la interfaz para el modelo de usuario
interface IUsuario extends Document {
  nombres:string;
  apellidos:string;
  fecha_nacimiento: Date;
  email: string;
  telefono: string;
  cedula: string;
  rol: string;
  estado: string;
  password: string;
  politica: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const usuarioSchema: Schema<IUsuario> = new Schema({
    nombres: {
        type: String,
        required: [true, "Name is required"]
    }, 
    apellidos: {
        type: String,
        required:[true, "Lastname is required"] 
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
          validator: function(value: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: "Invalid email address format",
        }
    },
    telefono: {
        type: String,
        validate: {
          validator: function(v: string) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: (props: { value: string; }) => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required'],
        unique: true,
        min: [10, "Must be at least 10 digits" ],
        max: [13, "Invalid phone number"]
    },
    cedula: {
        type: String,
        required: [true, "Enter document identity"],
        unique: true,
        min: [10, "Must be at least 10 digits"],
        max: [13, "Invalid document identity"]
    },
    password: {
      type: String,
      required:[true, "Password is required"] 
    },
    rol:{
      type: String
    },
    estado: {
      type: String,
    },
    politica: {
      type: Boolean,
    },
});
// Método para encriptar la contraseña antes de guardarla
usuarioSchema.pre<IUsuario>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const Usuario : Model<IUsuario> = mongoose.models.Usuario || mongoose.model<IUsuario>('Usuario', usuarioSchema);

export default Usuario;