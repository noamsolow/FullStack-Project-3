// users-db.js



const USERS_KEY    = 'contacts_app__users';
const USERS_ID_KEY = 'contacts_app__users_next_id';



// Private 
function _loadUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function _saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function _nextUserId() {
    const current = parseInt(localStorage.getItem(USERS_ID_KEY) || '1', 10);
    localStorage.setItem(USERS_ID_KEY, String(current + 1));
    return current;
}

// Public 
window.UsersDB = {


    findUser: function(username) {
        const users = _loadUsers();
        return users.find(u => u.username === username) || null;
    },


    userExists: function(username) {
        return UsersDB.findUser(username) !== null;
    },


    addUser: function({ username, passwordHash, fullName, email }) {
        if (UsersDB.userExists(username)) {
            throw new Error('Username already exists: ' + username);
        }
        const users = _loadUsers();
        const newUser = {
            id:           _nextUserId(),
            username:     username,
            passwordHash: passwordHash,
            fullName:     fullName,
            email:        email
        };
        users.push(newUser);
        _saveUsers(users);
        return newUser;
    },


    validateCredentials: function(username, passwordHash) {
        const user = UsersDB.findUser(username);
        if (!user) return null;
        if (user.passwordHash !== passwordHash) return null;
        return user;
    }
};
