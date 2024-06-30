<div align="center">

# Stripe iOS Widget
![Image alt](https://github.com/qoonmax/stripe-ios-widget/blob/main/img/banner.jpg)
  <p>
    <a
      href="https://github.com/MrMartineau/gatsby-theme-code-notes/blob/master/LICENSE"
    >
      <img
        src="https://img.shields.io/badge/license-MIT-blue.svg"
        alt="scriptable widgets is released under the MIT license."
      />
    </a>
  </p>
</div>

A widget that allows you to monitor the balance and other metrics of your Stripe account on iPhone and iPad.

## How to install

- Install [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) app 

- Create new script in Scriptable app and paste code from [smallWidger.js](/src/smallWidget.js)

- Edit RESTRICTED_KEY to insert your key.

Attention: It is not recommended to use Stripe secret keys.

Instead, it is better to use Restricted keys.
Create a new Restricted key in the Stripe dashboard, with read-only permissions for balance, customers, and charges.

- Add a new widget to your home screen