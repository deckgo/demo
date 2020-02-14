class MenuList extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {

        const menuListActions = await buildMenuListActions();

        this.innerHTML = '<ion-content><ion-list no-margin>' + menuListActions + '</ion-list></ion-content>';
    }
}

buildMenuListActions = () => {
    return new Promise(async (resolve) => {
        let result = '';

        result += '<ion-item ion-item button detail="false" onclick="displayRemoteControl()" color="primary" style="--border-style: none;"><ion-icon name="phone-portrait" ariaLabel="Remote control" slot="end"></ion-icon><ion-label>Remote control</ion-label></ion-item>';
        result += '<ion-item ion-item button detail="false" onclick="openLink(\'https://docs.deckdeckgo.com\')" color="primary" style="--border-style: none;"><ion-icon name="rocket" slot="end"></ion-icon><ion-label>Documentation</ion-label></ion-item>';
        result += '<ion-item ion-item button detail="false" onclick="openLink(\'https://twitter.com/deckdeckgo\')" color="primary" style="--border-style: none;"><ion-icon name="logo-twitter" slot="end"></ion-icon><ion-label>Twitter</ion-label></ion-item>';
        result += '<ion-item ion-item button detail="false" onclick="openLink(\'https://github.com/deckgo/deckdeckgo\')" color="primary" style="--border-style: none;"><ion-icon name="logo-github" slot="end"></ion-icon><ion-label>Github</ion-label></ion-item>';
        result += '<ion-item ion-item button detail="false" onclick="openShare()" color="primary" style="--border-style: none;"><ion-icon name="share" slot="end"></ion-icon><ion-label>Share</ion-label></ion-item>';

        resolve(result);
    });
};

openLink = async (link) => {
    window.open(link, '_blank');
    await document.querySelector('ion-popover').dismiss();
};

customElements.define('menu-list', MenuList);

openMenu = async (ev) => {
    ev.preventDefault();

    const popover = document.createElement('ion-popover');
    popover.component = 'menu-list';
    popover.translucent = true;
    popover.event = ev;

    document.body.appendChild(popover);

    await popover.present();
};

openShare = async () => {
    if (navigator && navigator.share) {
        await shareMobile();
    } else {
        await shareDesktop();
    }

    await document.querySelector('ion-popover').dismiss();
};

function shareMobile() {
    return new Promise(async (resolve) => {
        const shareUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

        await navigator.share({
            title: document.title,
            url: shareUrl,
        });

        resolve();
    });
}

function shareDesktop() {
    return new Promise(async (resolve) => {
        const webSocialShare = document.querySelector('web-social-share');

        if (!webSocialShare || !window) {
            return;
        }

        const shareUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;

        const share = {
            displayNames: true,
            config: [{
                twitter: {
                    socialShareUrl: shareUrl,
                    socialSharePopupWidth: 300,
                    socialSharePopupHeight: 400
                }
            },{
                reddit: {
                    socialShareUrl: shareUrl,
                    socialSharePopupWidth: 300,
                    socialSharePopupHeight: 500
                }
            },{
                linkedin: {
                    socialShareUrl: shareUrl
                }
            },{
                email: {
                    socialShareBody: shareUrl
                }
            }, {
                whatsapp: {
                    socialShareUrl: shareUrl
                }
            }]
        };

        webSocialShare.share = share;

        webSocialShare.show = true;

        resolve();
    });
}
