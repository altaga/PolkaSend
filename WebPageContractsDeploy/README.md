# PolkaSend  Contract Deploy Tool

<img src="https://i.ibb.co/gVgpQ9X/logo-Polka.png">

El equipo de PolkaSend se preocupa mucho de generar herramientas utiles para los developers y poder desarrollar en cualquier EVM, asi que realizamos la siguiente herramienta para poder desplegar smart contracts sobre la blockchain de Acala EVM+ correctamente.

**IF YOU'RE A JUDGE YOU CAN TEST OUR APPLICATION HERE:**

WEBAPP: https://polka-send-contract-deploy-tool.vercel.app/
Source Code: https://github.com/altaga/PolkaSend/tree/main/WebPageContractsDeploy

# Introduction and Problem

Como bien sabes si eres un desarrollador sobre Acala EVM+ el despliegue de smart contracts sobre esta blockchain requiere una serie de parametros y configuraciones para poder funcionar correctamente.

# Prerequisites:

- Tener una cuenta de developer activada.
  - https://evmdocs.acala.network/tooling/development-account
- Leer la documentacion sobre el consumo de gas en las trasacciones de Acala EVM+
  - https://evmdocs.acala.network/network/gas-parameters
- Leer la documentacion basica de como usar el RemixIDE.
  - https://evmdocs.acala.network/tooling/remix-ide

# How it works:

- Abre nuestra pagina desde esta URL:
  - https://polka-send-contract-deploy-tool.vercel.app/

<img src="https://i.ibb.co/T1Bkzmz/1.png">

- Presiona el boton para conectarte con tu wallet de metamask. (ya previamente debiste configurar Mandala T7)

<img src="https://i.ibb.co/SxRgqjr/2.png">

- Acepta la conexion con la pagina.

<img src="https://i.ibb.co/VJB495X/3.png">

- Obtendremos algunos datos importantes para el correcto despliegue del contrato.
  - Deberas tener un saldo minimo para poder desplegar el contrato, la pagina te avisara si tienes el minimo de ACA para ello, ademas si no tienes el saldo minimo la pagina no te dejara intentar el despliegue (ya que este te costara aunque falle).

<img src="https://i.ibb.co/M6TW6XC/4.png">

- Si tienes el suficiente ACA para poder hacer el despliegue, tendremos 2 opciones pegar nuestro propio bytecode desde Remix IDE o desplegar uno de los contractos precompilados proporcionados por Acala.
  - Mas detalles de estos contratos aqui: https://github.com/AcalaNetwork/predeploy-contracts

<img src="https://i.ibb.co/whW6RBX/5.png">

- En este caso mostraremos el despliegue de un contrato creado en Remix IDE. Solo tenemos que copiar el Bytecode que nos entrega.

<img src="https://i.ibb.co/nmsjj0q/6.png">

- Lo pegaremos en la seccion Raw Remix Bytecode y presionaremos el boton de Upload Bytecode (si hiciste todo bien los recuardos de input se pondran en verde y se mostrara un letrero de Bytecode Ready).

<img src="https://i.ibb.co/bLtJhfZ/7.png">

- Presionaremos el boton de Upload Contract, el cual nos abrirla la metamask con la trasaccion que vamos a realizar pero ALTO, tenemos que modificar los parametros de gas para que la trasaccion se haga correctamente.

<img src="https://i.ibb.co/y0YQ3TT/8.png">

- Presionamremos en edit y nos abrirla la siguiente seccion, ahi presionaremos Edit suggested gas fee.

<img src="https://i.ibb.co/zP5zBDJ/9.png">

- En esta seccion pondremos los parametros que nos indica la web app y presionaremos save.

<img src="https://i.ibb.co/3vmTW4R/10.png">

- Ahora si podemos darle Confirm a nuestro contrato.

<img src="https://i.ibb.co/s6QMG7m/11.png">

- Si todo salio bien sonara un comico YAY, aparecera confetti y el Contract Address, anota la address del contrato ya que el explorer de Blockscout puede llegar a tardar.

<img src="https://i.ibb.co/5jQw2Kn/12.png">

- Ya con esa address podras revisar tu contrato en Remix, notaras que este funcionara perfactemente.

<img src="https://i.ibb.co/J2tpzLN/13.png">
<img src="https://i.ibb.co/4F1rTgc/14.png">
