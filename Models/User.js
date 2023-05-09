export default class User{
    constructor(id, name, email, password, phone) {
        const State = {
            InActive: 0,
            Active: 1
        };
        if (this.constructor === User){
            throw new Error("This class is abstract, you can't create object from it\n" +
                "Create an object from NormalUser or Librarian instead");
        } else {
            this.name = name;
            this.email = email;
            this.password = password;
            this.phone = phone;
            this.id = null;
            this.state = State.Active
        }
    }
    logout(){
        throw new Error("Not Implemented");
        //TODO: Implement Logout
    }
    static login(username, password){
        // TODO: Call user controller for login
        throw new Error("Not Implemented");
    }
}