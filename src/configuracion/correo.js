const nodemailer = require('nodemailer');
exports.recuperacionContrasena = async (data) =>{
    const configurar = {
        from: process.env.correo_app,
        to: data.correo,
        subject: "Recuperación de Contraseña",
        text: "Pin:" + data.pin,
    };

    const transportar = nodemailer.createTransport({
        host: process.env.correo_servicio,
        port: process.env.correo_port,
        secure: true,
        auth:{
            user: process.env.correo_app,
            pass: process.env.correo_contrasena
        }
    });

    await transportar.verify(async function(error, success){
        if(error){
            console.log(error);
            return false;
        }else{
            console.log("El correo ha sido enviado exitosamente")
        }
    });

    return await transportar.sendMail(configurar);

}