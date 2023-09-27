export class ManagerRepository {
  private password =
    'f58c4e4f2b4dda598f11454219e2786fea8bb42e5261618c3027d3115e0bbca2';

  update(passward) {
    this.password = passward;
  }
  getThat(): string {
    return this.password;
  }
}
