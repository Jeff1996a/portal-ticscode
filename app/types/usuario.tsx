import mongoose from "mongoose";

const {Schema} = mongoose;

const usuarioSchema = new Schema({
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
          message: (props: { value: any; }) => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required'],
        min: [10, "Must be at least 10 digits" ],
        max: [13, "Invalid phone number"]
    },
    cedula: {
        type: String,
        required: [true, "Enter document identity"],
        min: [10, "Must be at least 10 digits"],
        max: [13, "Invalid document identity"]
    },
    id_empresa:{
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    }
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);