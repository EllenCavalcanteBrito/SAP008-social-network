/* eslint-disable consistent-return */
import {
  // eslint-disable-next-line max-len
  getDisplayName, getUserUid, firestore, createCollection, signOut,
} from '../../lib/authentication.js';
// import { signOut } from '../../lib/authentication.js';

export default () => {
  const container = document.createElement('div');
  const userName = getDisplayName();
  const template = ` <div class="container">
    <div class="logo">
        <a href="#page"> <img id="logo" src="./img/logo.png" alt="logo Vanellen"></a>
        <span id="idUser"> Olá, ${userName}</span>
        <span class="VanellenMore">Vanellen <span
                style="color:rgb(254, 123, 18 ); font-size:1.5rem; font-weight: bold;">+</span>
    </div>
  
   <div class="navbar">
    <header id="header">
       <a href=""> <img id="logout"  src="./img/logout.png" alt="Ícone de logout"></a>
       
    <nav id="nav">
       <ul id="menu">
       <li><a href="#profile" id="profile"> Perfil</a></li>
       <li><a href="#aboutUs" id="post"> Sobre</a></li>
       <li><a href="#page"><span class="active"> HOME</span></a></li>
       </ul>
    </nav>
   </header>
  </div>
  
    <div class="content">
        <p> <a href="#movies"> <span
            style="color:rgb(254, 123, 18 ); font-size:1.5rem; font-weight: bold;">#</span>
        Melhores filmes Vanellen</a></p>
        
        <p> <a id="text" href="#series"> <span
        style="color:rgb(254, 123, 18); font-size:1.5rem; font-weight: bold;">#</span>
    Melhores series Vanellen</a></p>
    </div>
  </div>
  
  <div class="posts">
    </div>
  </div>
  
  <div class="wrapper"> </div>
  
  <div class="containerPosts">
  <div class="text_share">
  <p><b>Compartilhe aqui o que você achou daquele filme ou série que você <b>curtiu muito assistir</b>.🥰<br/> Ou que foi uma
      <b>total perda de tempo</b>...😞🤦‍♂️</b></p>
  </div>
  
  <h2 id="fill-form"> Preencha o formulário abaixo! Estamos ansiosos pela sua opinião. 🤩</h2>
  <form action="" id="myForm">
      <div id="postx">
          <input type="text" class="formInput" id="name" name="name" placeholder="Digite seu nome" />
          <input type="text" class="formInput" name="movie" id="movieName" placeholder="Digite o nome do filme ou série." />
          <textarea class="formInput" name="text" id="message" placeholder="Conte-nos o que achou!"></textarea> 
         
          <div class="formposts">
          <label class="picture" tabIndex="0">
          <input type="file" accept="image/*" class="picture_input"/>
          <span class="picture-image"></span>
          </label>
      </div>
      <button class="buttons "type="submit" id="buttonSend"> Enviar</button>
  </form>
  </div>
  <footer>
    <div class="foot">
        <img src="./img/lab.png" alt="logo Laboratória">
        <div class="developers">
            <p> Developed by:</p> 
            <p>Ellen Cavalcante <spa>&</span> Vanessa Bueck</p>
        </div>
    </div>
  </footer>
  `;
  container.innerHTML = template;

  const doLogout = container.querySelector('#logout');
  const formAction = container.querySelector('#myForm');
  const boxPost = container.querySelector('.posts');

  const db = firebase.firestore();
  const docRef = db.collection('posts').doc().id;
  const likeFirebase = (id) => firestore().doc(id).update({
    like: firebase.firestore.FieldValue.increment(1),
  })
    .then(() => true)
    .catch((error) => error);

  let likedsometime = false;
  //   const deslikedsometime = false;
  const userLoggedLikeThisPost = firebase.firestore().collection('posts')
    .doc(docRef).collection('posts');

  //   const userLoggedDeslikedThisPost = firebase.firestore().collection('posts')
  //     .doc(docRef).collection('posts');

  const userOnline = firebase.auth().currentUser.uid;

  const userLiked = {
    wholikes: firebase.auth().currentUser.uid,
  };

  //   const userDesliked = {
  //     whodesliked: firebase.auth().currentUser.uid,
  //   };

  doLogout.addEventListener('click', (e) => {
    const main = document.querySelector('#root');
    e.preventDefault();
    signOut().then(() => {
      main.innerHTML = ' ';
      window.location.hash = '#login';
    });
  });

  function dateConvert() {
    const date = new Date().toLocaleString();
    return date;
  }

  function postTemplate() {
    firebase.firestore().collection('posts').get()
      .then((snapshot) => {
        const postContainer = snapshot.docs.reduce((acc, doc) => {
          const {
            name, text, movie, createdAt, like, deslike,
          } = doc.data();
          // eslint-disable-next-line no-param-reassign
          acc += ` <div id="poster-${doc.id}" class="posts">
                 <div class="img-movie">
                 <img id="testImg" src="./img/loadingimg.png" alt="logo Laboratória">
                 </div>
         
                 <div class="info-movies">
                     <div class="name-movies">
                     <textarea id="name-${doc.id}" style="resize:none" disabled>${movie}</textarea>
                     </div>
                     <div class="about-movies">
                     <textarea id="about-${doc.id}" style="resize:none" disabled>${text}</textarea>
                     </div>
                    
                     <div class="stars">
                     <span id="heart" data-liked=${doc.id} data-user=${doc.data().user_id}>❤️</span>
                     <span class="getLike">${like}</span>

                     <span id="breakHeart" data-desliked=${doc.id} data-user=${doc.data().user_id}>💔</span>
                     <span class="getDeslike">${deslike}</span>

                         <p class="username">Enviado por: ${name}</p> <p class="username"> Data de Criação: ${dateConvert(createdAt)}</p>
                     <div class="buttons-posts" id="editButton-${doc.id}"> 
                         <button data-remove=${doc.id} data-user=${doc.data().user_id} class="buttons" id="btn-delete"> Apagar</button>
                         <button data-edit=${doc.id} data-user=${doc.data().user_id} class="buttons" id="btn-edit"> Editar</button>
                     </div>
                     <div class="buttons-posts" id="updateButton-${doc.id}" style="display:none"> 
                         <button data-update=${doc.id} data-user=${doc.data().user_id} class="buttons" id="btn-edit">Salvar</button>
                     </div>
                     </div>
                 </div>
               
             </div>
             `;
          return acc;
        }, '');

        container.querySelector('.posts').innerHTML += postContainer;
      });
  }
  postTemplate();

  const userId = getUserUid();

  formAction.addEventListener('submit', (event) => {
    event.preventDefault();
    const postCollection = {
      name: event.target.name.value,
      user_id: userId,
      movie: event.target.movie.value,
      createdAt: new Date(),
      text: event.target.text.value,
      like: [],
      deslike: [],
    };
    createCollection(postCollection)
      .then(() => {
        container.querySelector('#message').value = ' ';
        container.querySelector('#name').value = ' ';
        container.querySelector('#movieName').value = ' ';
        const postsCollection = db.collection('posts');
        container.querySelector('.posts').innerHTML = 'Carregando...';
        postsCollection.get().then(() => {
          container.querySelector('.posts').innerHTML = ' ';
          postTemplate();
        });
      });

    postTemplate();
  });

  boxPost.addEventListener('click', (e) => {
    const removeButtonId = e.target.dataset.remove;
    const userCurrent = e.target.dataset.user;

    if (removeButtonId) {
      if (userId !== userCurrent) {
        alert('Não é possível deletar post de outros usuários');
        return false;
      }
      // eslint-disable-next-line no-alert
      const resultado = window.confirm('Você deseja apagar essa postagem?');
      if (resultado === true) {
        firebase.firestore().collection('posts').doc(removeButtonId).delete()
          .then(() => {
            const posts = document.querySelector(`#poster-${removeButtonId}`);
            posts.remove();
          });
      }
    }
  });

  // eslint-disable-next-line consistent-return
  boxPost.addEventListener('click', (e) => {
    const editButton = e.target.dataset.edit;
    const userCurrent = e.target.dataset.user;

    if (editButton) {
      if (userId !== userCurrent) {
        alert('Não é possivel editar post de outros usuarios');
        return false;
      }

      boxPost.querySelector(`#updateButton-${editButton}`).removeAttribute('style');
      boxPost.querySelector(`#editButton-${editButton}`).style.display = 'none';
      boxPost.querySelector(`#name-${editButton}`).removeAttribute('disabled');
      boxPost.querySelector(`#about-${editButton}`).removeAttribute('disabled');
    }
  });

  // eslint-disable-next-line consistent-return
  boxPost.addEventListener('click', (e) => {
    const updateButton = e.target.dataset.update;
    const userCurrent = e.target.dataset.user;

    if (updateButton) {
      if (userId !== userCurrent) {
        return false;
      }

      const updateMovie = boxPost.querySelector(`#name-${updateButton}`).value;
      const updateText = boxPost.querySelector(`#about-${updateButton}`).value;

      firebase.firestore().collection('posts').doc(updateButton).update({ movie: updateMovie, text: updateText })
        .then(() => {
          boxPost.querySelector(`#updateButton-${updateButton}`).style.display = 'none';
          boxPost.querySelector(`#editButton-${updateButton}`).removeAttribute('style');
          boxPost.querySelector(`#name-${updateButton}`).setAttribute('disabled', '');
          boxPost.querySelector(`#about-${updateButton}`).setAttribute('disabled', '');
        })
        .catch(() => {
          alert('Algo deu errado. Por favor, tente novamente.');
        });
    }
  });

  boxPost.addEventListener('click', (e) => {
    const buttonLike = e.target.dataset.liked;
    const increment = firebase.firestore.FieldValue.increment(1);

    userLoggedLikeThisPost.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (likedsometime === false) {
          if (doc.data().wholikes === userOnline) {
            likedsometime = true;
            alert('Você já curtiu esse post!');
            boxPost.querySelector(`#poster-${buttonLike}`).getElementsByClassName('getLike')[0].innerHTML = 'Já curtiu!';
          }
        }
      });
    });

    if (likedsometime === false) {
      likeFirebase(docRef)
        .then(() => {
          firestore().doc(docRef).collection('posts')
            .add(userLiked)
            .then(() => {
              const teste = boxPost.querySelector(`#poster-${buttonLike}`).getElementsByClassName('getLike')[0].textContent;
              boxPost.querySelector(`#poster-${buttonLike}`).getElementsByClassName('getLike')[0].innerHTML = `Curtiu! <b> ${Number(teste) + 1} </b} `;
              db.collection('posts').doc(buttonLike)
                .update({ like: increment });
            });
        })

        .catch(() => {
          alert('Ops! Algo deu errado. Tente novamente!');
        });
    }
  });

  //   boxPost.addEventListener('click', (e) => {
  //     const buttonDeslike = e.target.dataset.desliked;
  //     const increment = firebase.firestore.FieldValue.increment(1);

  //     userLoggedDeslikedThisPost.get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         if (deslikedsometime === false) {
  //           if (doc.data().whodesliked === userOnline) {
  //             deslikedsometime = true;
  //             alert('Você já DESCURTIU esse post!');
  // eslint-disable-next-line max-len
  //             boxPost.querySelector(`#poster-${buttonDeslike}`).getElementsByClassName('getDeslike')[0].innerHTML = 'Já <b>descurtiu</b>!';
  //         }
  //     }
  //   });
  // });

  //     if (deslikedsometime === false) {
  //       likeFirebase(docRef)
  //         .then(() => {
  //           firestore().doc(docRef).collection('posts')
  //             .add(userDesliked)
  //             .then(() => {
  // eslint-disable-next-line max-len
  //               const teste = boxPost.querySelector(`#poster-${buttonDeslike}`).getElementsByClassName('getDeslike')[0].textContent;
  // eslint-disable-next-line max-len
  //               boxPost.querySelector(`#poster-${buttonDeslike}`).getElementsByClassName('getDeslike')[0].innerHTML = `Não curtiu!😢 <b> ${Number(teste) + 1} </b} `;
  //               db.collection('posts').doc(buttonDeslike)
  //                 .update({ deslike: increment });
  //             });
  //         });
  //     }
  //   })

  return container;
};
