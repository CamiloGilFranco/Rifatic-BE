const verifyUserEmail = (data) => {
  const email = {
    from: "RIFATIC No reply <tacanaire@gmail.com>",
    to: data.email,
    subject: "Código de verificación",
    html: `
  <div style="font-family: sans-serif; text-align: center;">
    <img src="https://raw.githubusercontent.com/CamiloGilFranco/Rifatic_FE/main/src/assets/logo.png" alt="log"
      style="width: 150px; margin: 0 auto;">
    <h1 style="margin-top: 30px;"> ¡Hola ${data.name}, bienvenido a RIFATIC!</h1>
    <p style="font-size: 18px; margin-top: 30px;">Para terminar el proceso de registro debes regresar al sitio y escribir el siguiente código. ¡Es hora de celebrar!.</p>
    <h2>Código de Verificación</h2>
    <h2> ${data.secureCode}</h2>
    <p style="font-size: 18px; margin-top: 30px;">Recuerda que solo tienes 5 minutos desde la generación del código para que este expire, asi que date prisa y termina tu proceso de registro</p>
  </div>
  `,
  };
  return email;
};

module.exports.verifyUserEmail = verifyUserEmail;
