// TODO: Ionic not compatible with vite and esbuild yet
// import '@ionic/core/css/ionic.bundle.css';

import './css/variables.css';

import '../node_modules/@deckdeckgo/deck-utils/css/deck.css';
import '../node_modules/@deckdeckgo/kit/css/kit.css';

import {
  initReload,
  initButtons,
  initFullscreen,
  initActions,
  postLoading,
  initRemote,
  postLoadingJumpTo,
  initDeckHistoryWatch
} from '@deckdeckgo/kit';

import manifest from './manifest.json';
const {name} = manifest;

window.ROOM_NAME = name;
window.EMBEDDED = false;
window.PENDING_REMOTE_REQUESTS = [];
window.REMOTE_STATE = 0;

// TODO: Ionic not compatible with vite and esbuild yet
// import {defineCustomElements as ionicElements} from '@ionic/core/loader';
// ionicElements();

// Init DeckDeckGo elements
import {defineCustomElements as deckDeckGoElements} from '@deckdeckgo/core/dist/custom-elements';

import {defineCustomElements as deckDeckGoSlideTitleElements} from '@deckdeckgo/slide-title/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlideContentElements} from '@deckdeckgo/slide-content/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlideAuthorElements} from '@deckdeckgo/slide-author/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlideChartElements} from '@deckdeckgo/slide-chart/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlideYoutubeElements} from '@deckdeckgo/slide-youtube/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlideSplitElements} from '@deckdeckgo/slide-split/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlideGifElements} from '@deckdeckgo/slide-gif/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlideQRCodeElements} from '@deckdeckgo/slide-qrcode/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlidePollElements} from '@deckdeckgo/slide-poll/dist/custom-elements';
import {defineCustomElements as deckDeckGoSlidePlaygroundElements} from '@deckdeckgo/slide-playground/dist/custom-elements';

import {defineCustomElements as deckDeckGoRemoteElements} from '@deckdeckgo/remote/dist/custom-elements';

import {defineCustomElements as deckDeckGoChartsElements} from '@deckdeckgo/charts/dist/custom-elements';
import {defineCustomElements as deckDeckGoQRCodeElements} from '@deckdeckgo/qrcode/dist/custom-elements';
import {defineCustomElements as deckDeckGoHighlightCodeElements} from '@deckdeckgo/highlight-code/dist/custom-elements';
import {defineCustomElements as deckDeckGoSocialElements} from '@deckdeckgo/social/dist/custom-elements';
import {defineCustomElements as deckDeckGoRevealElements} from '@deckdeckgo/reveal/dist/custom-elements';
import {defineCustomElements as deckDeckGoYoutubeElements} from '@deckdeckgo/youtube/dist/custom-elements';
import {defineCustomElements as deckDeckGoDemoElements} from '@deckdeckgo/demo/dist/custom-elements';
import {defineCustomElements as deckDeckGoLaserPointerElements} from '@deckdeckgo/laser-pointer/dist/custom-elements';

// Init web-social-share
import {defineCustomElements as webSocialShareElements} from 'web-social-share/dist/custom-elements';

(async () => {

  deckDeckGoElements();

  deckDeckGoChartsElements();
  deckDeckGoQRCodeElements();
  deckDeckGoHighlightCodeElements();
  deckDeckGoSocialElements();
  deckDeckGoRevealElements();
  deckDeckGoYoutubeElements();
  deckDeckGoDemoElements();
  deckDeckGoLaserPointerElements();

  deckDeckGoSlideTitleElements();
  deckDeckGoSlideContentElements();
  deckDeckGoSlideAuthorElements();
  deckDeckGoSlideChartElements();
  deckDeckGoSlideYoutubeElements();
  deckDeckGoSlideSplitElements();
  deckDeckGoSlideGifElements();
  deckDeckGoSlideQRCodeElements();
  deckDeckGoSlidePollElements();
  deckDeckGoSlidePlaygroundElements();

  await postLoading();
  await initActions();
  await initFullscreen();

  await postLoadingJumpTo();
  await initDeckHistoryWatch();

  webSocialShareElements();

  deckDeckGoRemoteElements();
  await initRemote();

  initReload();
  initButtons();
})();
