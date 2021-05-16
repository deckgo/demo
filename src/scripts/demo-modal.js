presentModal = async () => {
  // create component to open
  const element = document.createElement('div');
  element.innerHTML = `
  <ion-header>
    <ion-toolbar color="tertiary">
      <ion-buttons slot="start">
          <ion-button id="close">
              <ion-icon name="close"></ion-icon>
          </ion-button>
      </ion-buttons>
      <ion-title>DeckDeckGo</ion-title>
    </ion-toolbar>
  </ion-header>
<ion-content class="ion-padding">
<div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h3 class="ion-text-center">...or this modal 😉</h3>
        
    <div class="ion-text-center ion-padding-top">
            <ion-button id="dismiss" shape="round" size="large" color="tertiary">Dismiss</ion-button>
        </div>
    </div>
  </ion-content>
  `;

  const modal = document.createElement('ion-modal');
  modal.component = element;

  document.body.appendChild(modal);

  // present the modal
  await modal.present();

  // listen for close event
  const buttonDismiss = document.querySelector('ion-modal ion-button#dismiss');
  buttonDismiss.addEventListener('click', async () => {
    await document.querySelector('ion-modal').dismiss();
  });

  const buttonClose = document.querySelector('ion-modal ion-button#close');
  buttonClose.addEventListener('click', async () => {
    await document.querySelector('ion-modal').dismiss();
  });
};
