[{
    id: '/#dsflaksd',
    name: 'John',
    room: 'The Office Fans'
}]

// Methods
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


//ES6 Class syntax
// If a class is to be used with the new operator e.g, new Person... then the name of the class should 
// start with an upper case letter

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // return user that was removed
        //var user = this.users.filter((user) => user.id === id)[0];
        //OR
        var user = this.getUser(id); //User existing class method

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        //filter array method
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        //return ar array of strings
        // var users = this.users.filter((user) => {
        //     // if array value is the same as the argumemnt value return true, else false.
        //     return users.room === room;
        // })
        // ES6 short hand arrow function version 
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users };
// class Person {
//     // called by defualt with passed arguments in new -- optional
//     constructor(name, age) {
//             //this refers to instance, not class
//             this.name = name;
//             this.age = age;
//         } //no comma

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`
//     }


// }

// var me = new Person('John', 40);
// var description = me.getUserDescription();
// console.log(description);