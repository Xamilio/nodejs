class User {
    #login;
    #email;
    #age;

    constructor(login, email, age) {
        this.#login = login, 
        this.#email = email, 
        this.#age = age
    }

    set(value) {
        if(value <= 0  && value > 150)
        this.#age = value;
    }

    getInfo() {
        console.log('login: ' + this.#login);
        console.log('email: ' + this.#email);
        console.log('age: ' + this.#age);
    }

    changeEmail(email) {
        this.#email = email;
    }

    changeAge() {
        this.#age = 1;
    }
    set age(value) {
        if(value <= 0 || value > 150)
            console.log("Invalid age value");
        this.#age = value;
        
    }
    set email(value) {
        this.#email = value;
    }
    set login(value) {
        this.#login = value;
    }
}
export {User};