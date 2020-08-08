// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

  //setting the guides

  const guidelist = document.querySelector('.guides');

  const loggedOut = document.querySelectorAll('.logged-out');

  const loggedIn = document.querySelectorAll('.logged-in');
  const adminitem = document.querySelectorAll('.admin');
//const accountDetails = document.querySelector('.account-details');
const accountDetails = document.querySelector('.account-details');
  
  const setUi = (user) => {
      if(user)
      {
        if(user.admin)
        {
            adminitem.forEach(item => item.style.display ='block');
        }
        db.collection('users').doc(user.uid).get().then( doc =>{
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            
            `;
            accountDetails.innerHTML = html;

          });
          loggedIn.forEach(item => item.style.display = 'block');
          loggedOut.forEach(item => item.style.display = 'none'); 
      }else
      {
        adminitem.forEach(item => item.style.display ='none');
        loggedIn.forEach(item => item.style.display = 'none');
        loggedOut.forEach(item => item.style.display = 'block'); 
      }

  }

  const setupguides = (data) => {

    if(data.length)
    {
      let html = ""
      data.forEach(doc => {
          const guide = doc.data();
          console.log(guide);
          const li = `
         <li>
         <div class="collapsible-header grey lighten-4">${guide.title}</div>
         <div class="collapsible-body white">${guide.Content}</div>
         </li> 
          `;
          html += li;
      });
      guidelist.innerHTML = html;
    }else
    {
        guidelist.innerHTML = "<h5> Login To View Guids</h5>";
    }
  }