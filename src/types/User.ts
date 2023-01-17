export type CreateUser = {
  email: string,
  authority: "SYS_ADMIN" | "TENANT_ADMIN" | "CUSTOMER_USER",
  firstName: string,
  lastName: string,
  password: string,
  additionalInfo?: string,
  sendActivationMail?: boolean
}