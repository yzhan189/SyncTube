class Room {
  constructor(id) {
    this.id = id;
    this.userList = [];
  }

  addUser(user) {
    this.userList.push(user);
  }
}