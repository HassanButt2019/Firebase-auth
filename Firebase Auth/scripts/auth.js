///ad admin cloud function

const adminForm = document.querySelector('.admin-actions');

adminForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email:adminEmail}).then(result =>{
        console.log(result);
    });
});




//create new guide


const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e) =>
{
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value,
        Content:createForm['content'].value,
    }).then(()=>{

        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err =>{
        console.log(err.message);
    });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //auth signup
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm['signup-bio'].value,
        });    
        
    }).then(()=> {
        const modal = document.querySelector('#modal.signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//logout users

const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});







//login user

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;


    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });

});


//Auth tracking

//const accountDetails = document.querySelector('.account-details');

auth.onAuthStateChanged(user => {
   
    if (user) {
        //data base word
    //     const html = `
    //   <div>Logged in as ${user.email}</div>
    // `;
    // accountDetails.innerHTML = html;
    user.getIdTokenResult().then(IdTokenResult => {
        user.admin = IdTokenResult.claims.admin;
        setUi(user);
    });
        db.collection('guides').onSnapshot(snapshot => {
            setupguides(snapshot.docs);
            setUi(user);
        }).catch(err =>{
            console.log(err.message);
        });
    } else {
        setUi();
       // html = `<h4> No Account Is logged in Right Now</h4>`;
       setupguides([]);
    }
});





