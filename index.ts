import { ThingsBoard } from "./src/modules/ThingsBoard";

const thingsBoard = new ThingsBoard("localhost", 8080, "tenant@thingsboard.org", "tenant");

(async () => {
  await thingsBoard.auth()

  const data = await thingsBoard.createUser({
    email: "vinfsasdduz@iwtseb.fdjss",
    firstName: "Luke",
    lastName: "Diaz",
    authority: "TENANT_ADMIN",
    password: "123456"
  })

  console.log(data);

})()