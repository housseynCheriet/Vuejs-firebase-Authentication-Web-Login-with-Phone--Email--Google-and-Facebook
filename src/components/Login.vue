<template>
<div>

   <div class="login-page">
      <transition name="fade">
         <div v-if="!registerActive" class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>
      
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-blue ftco-navbar-light" id="ftco-navbar" style="
    width: 100%;
    position: absolute;
    top: 0px;
    background: darkcyan;
">
<div class="container">
<a class="navbar-brand" href="/">Home</a>
<div id="ftco-nav">
<ul class="navbar-nav ml-auto">
<li class="nav-item cta"><a class="nav-link"><span @click="logout" v-if="auth" style="cursor: pointer;">Logout</span></a></li>
</ul>
</div>
</div>
</nav>

      <div class="container" v-if="!auth">
         <div class="row">
            <div class="col-lg-5 col-md-6 col-sm-8 mx-auto">
               <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                  <h1>Sign In</h1>
                  <form class="form-group" id="myFormLog">
                     <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required>
                     <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required>
                     <button class="btn btn-primary" @click="doLogin">Login</button>
                     <p class="ifaccount"><span>Don't have an account?</span> <a @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                     </p>
                     <p><a>Forgot your password?</a></p>
                  </form>
                 
               </div>

               <div v-else class="card register" v-bind:class="{ error: emptyFields }">
                  <h1>Sign Up</h1>

                  <form class="form-group" id="myFormReg">
                     <div v-if="emailPhone">
                     <span class="orPhoneEmail" @click="emailPhone = !emailPhone">Or Phone number</span>
                     <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                     
                     <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                     <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>
                     </div>
                     <div v-else>
                     <span class="orPhoneEmail" @click="emailPhone = !emailPhone,this.solved=false;">Or Email</span>
                     <input v-model="phoneReg" type="text" class="form-control" placeholder="Phone number" required>
                     <div id="recaptcha-container"></div>
                     <span class="orPhoneEmail submitCode" @click="loginphone">Submit code</span>
                     <input v-model="confirmCode" type="text" class="form-control" placeholder="Confirmation code" required>
                     
                     </div>
                    <button v-if="emailPhone" class="btn btn-primary" @click="doRegister">Create account</button>
                      <button v-else class="btn btn-primary" @click="verifyotp">Create account..</button>  
                      <!-- <button class="btn btn-primary" @click="emailPhone?doRegister:verifyotp">Create account</button>-->
                       <p class="ifaccount"><span>Already have an account? </span> <a @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                     </p>
                  </form>
                   <div class="text-center social-btn">
            <button class="btn btn-primary btn-block" @click="loginWithFacebook"><i class="fa fa-facebook"></i> Sign in with <b>Facebook</b></button>
         <button class="btn btn-danger btn-block" @click="loginWithGoogle"><i class="fa fa-google"></i> Sign in with <b>Google</b></button>
        </div>
               </div>
            </div>
         </div>

      </div>
       <div v-else class="centeredContent">
        <h1>Home page dashboard</h1>
    </div>
   <!--</div>-->
   </div>

</div>
</template>



<script>
  import {firebase} from '../firestore'



var firebaseAuth=firebase.auth(firebase.apps[0]);

   export default {
      name: "Login",
   
   data: function() {

     
return {
      registerActive: false,
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      phoneReg: "",
      passwordReg: "",
      confirmReg: "",
      username: "",
      emptyFields: false,
      emailPhone:true,
      solved:false,
      confirmCode: 0,

      auth:firebaseAuth.currentUser,

   };
},
   
   methods:
   {
      loginWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
       provider.addScope('email');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
         // console.log("homeFace",provider);
          this.$router.go("/");
        })
        .catch(err => {
          // TODO:
           alert("Erruer: "+err.message);
        });
        //console.log(provider);
    }, 
      loginWithGoogle() {
       
      const provider = new firebase.auth.GoogleAuthProvider();
       provider.addScope('email');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
         //console.log("homeGoogle",provider);
          this.$router.go("/");
        })
        .catch(err => {
          // TODO:
          alert("Erruer: "+err.message);
        });
         //console.log(provider);
    },

      logout(e){
         e.preventDefault();
         ////console.log('logout');
            firebaseAuth.signOut().then(() => {
        this.$router.go("/login");
            });
         },

      doLogin(e){
         e.preventDefault();
         //console.log('Logging in...');
if (this.emailLogin === "" || this.passwordLogin === "") {
            this.emptyFields = true;
         } else {
                     
this.$store.dispatch('signUserIn', {email: this.emailLogin, password: this.passwordLogin})

         }
      },
         doRegister(e){
         e.preventDefault();
         this.$store.dispatch('signUserUp', {email: this.emailReg, password: this.passwordReg, username: this.username})
  
                 }
, 
   loginphone(e){
         e.preventDefault();
      if(this.phoneReg.trim()=="")
         return;
    //console.log("click: ",window.recaptchaVerifier);
    if(!this.solved)
    {this.solved=true;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(/*response*/) {
            // reCAPTCHA this.solved, allow signInWithPhoneNumber.
            //console.log("reCAPTCHA this.solved");
            this.solved=true;
        },
        'expired-callback': function() {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            //console.log("Solve reCAPTCHA again");
            this.solved=false;
        }
        });
}
        
        firebase.auth().signInWithPhoneNumber(this.phoneReg,window.recaptchaVerifier).then(function(response){
          alert("The verification code will be sent to your phone number via text message.")
            //console.log(response);
            window.confirmationResult=response;
        }).catch(function(/*error*/){
            //console.log(error);
        })
   },
   verifyotp(e){
         e.preventDefault();
         if(window.confirmationResult)
       window.confirmationResult.confirm(this.confirmCode).then(function(response){
           //console.log(response);
            var userobj=response.user;
            var token=userobj.xa;
          //  var provider="phone";
           // var email=this.phoneReg;
           this.$router.go("/");
            if(token!=null && token!=undefined && token!=""){
              //console.log('+++++')
          //  sendDatatoServerPhp(email,provider,token,email);
            }
       })
       .catch(function(/*error*/){
         this.solved=false;
           //console.log(error);
       })
   }
     
   }
};


</script>



<style  lang="scss" scoped>
   p {
   line-height: 1rem;
}

.card {
   padding: 20px;
   background: #008b8b87 !important;
}

.form-group {
   input {
      margin-bottom: 20px;
   }
}

.login-page {
   align-items: center;
   display: flex;
   height: 100vh;
}
   .wallpaper-login {
      background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
         no-repeat center center;
      background-size: cover;
      height: 100%;
      position: absolute;
      width: 100%;
   }
   
   .fade-enter-active,
   .fade-leave-active {
  transition: opacity .5s;
}
   .fade-enter,
   .fade-leave-to {
      opacity: 0;
   }
   
   .wallpaper-register {
      background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
         no-repeat center center;
      background-size: cover;
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: -1;
   }

   h1 {
      margin-bottom: 1.5rem;
   }


.error {
   animation-name: errorShake;
   animation-duration: 0.3s;
}

@keyframes errorShake {
   0% {
      transform: translateX(-25px);
   }
   25% {
      transform: translateX(25px);
   }
   50% {
      transform: translateX(-25px);
   }
   75% {
      transform: translateX(25px);
   }
   100% {
      transform: translateX(0);
   }
}
a {
    color: #29fb03;
 }
 p.ifaccount a {
    background: cornflowerblue;
    padding: 5px 20px;
    margin: 4px;
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    display: inline-block;
   }
p.ifaccount {
    font-size: 1.1rem;
    margin: 10px;
}
p.ifaccount * {
  white-space: pre;
 
}
 span.orPhoneEmail{
   color: blanchedalmond;
    font-weight: 700;
    background: cadetblue;
    padding: 3px;
    border-radius: 10px;
    position: relative;
    display: inline-block;
    float: right;
    cursor: pointer;
 }
 span.orPhoneEmail.submitCode {
    float: none;
    top: -17px;
    left: 25%;
    background: blueviolet;
}
 .centeredContent{
       position: absolute;
   position: absolute;
    width: 50%;
    height: 50%;
    z-index: 15;
    margin: 10% 0 0 25%;
    background: #4dc1ed4d;
    color: aliceblue;
    font-size: 2.3rem;
    word-break: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
}
.centeredContent h1 {
    color: black;
        font-weight: bold;
}
</style>