export class User {
  constructor(
    private id: number,
    private name: string,
    private email: string,
    private password: string,
    private signupVerifyToken: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.signupVerifyToken = signupVerifyToken;
  }
}
