// Stripe constants
// Attention: It is not recommended to use Stripe secret keys.
// Instead, it is better to use Restricted keys.
// Create a new Restricted key in the Stripe dashboard, with read-only permissions for balance, customers, and charges.
const RESTRICTED_KEY = 'rk_test_51PX4JfRtTpNlld34V7ebXTCqDDYBkaDrLAxFMop27Ma3y9FPNDSv6K3jig5Bi2QNFSKMhT9GxQ9GGBdBRr0TNrYY00xQ8lUwe8';

// Design constants
const TITLE_FONT_SIZE = 12;
const LARGE_VALUE_FONT_SIZE = 24;
const VALUE_FONT_SIZE = 14;

const w = await makeWidget();
w.presentSmall();

async function makeWidget() {
    const widget = new ListWidget();

    addBackgroundGradient(widget);

    addStripeLabel(widget);

    widget.addSpacer(20);

    await addBalanceBlock(widget);

    widget.addSpacer(20);

    const stack = widget.addStack();
    stack.layoutHorizontally();
    stack.spacing = 20;

    await addClientsBlock(stack);

    await addRefundsBlock(stack);

    return widget;
}

function addBackgroundGradient(widget) {
    const gradient = new LinearGradient();
    gradient.colors = [new Color("#635bff"), new Color("#1c1c1e")];
    gradient.locations = [-1, 1];
    widget.backgroundGradient = gradient;
}

function addStripeLabel(widget) {
    const stripeLabel = widget.addText("stripe");
    stripeLabel.font = new Font("AvenirNext-Bold", 14);
}

async function addBalanceBlock(widget) {
    const balanceTitle = widget.addText("BALANCE");
    balanceTitle.font = Font.mediumSystemFont(TITLE_FONT_SIZE);
    balanceTitle.textColor = new Color("#ADBDCC");

    const balanceStack = widget.addStack();
    const result = await getBalance();
    const balanceText = balanceStack.addText(result.currency + " " + result.amount.toString());
    balanceText.font = Font.boldSystemFont(LARGE_VALUE_FONT_SIZE);
}

async function addClientsBlock(stack) {
    const clientsStack = stack.addStack();
    clientsStack.layoutVertically();

    const clientsTitle = clientsStack.addText("CLIENTS");
    clientsTitle.font = Font.mediumSystemFont(TITLE_FONT_SIZE);
    clientsTitle.textColor = new Color("#ADBDCC");

    const clientsValue = clientsStack.addText((await getCustomers()).toString());
    clientsValue.font = Font.boldSystemFont(VALUE_FONT_SIZE);
}

async function addRefundsBlock(stack) {
    const refundsStack = stack.addStack();
    refundsStack.layoutVertically();

    const refundsTitle = refundsStack.addText("REFUNDS");
    refundsTitle.font = Font.mediumSystemFont(TITLE_FONT_SIZE);
    refundsTitle.textColor = new Color("#ADBDCC");

    const refundsValue = refundsStack.addText((await getRefunds()).toString());
    refundsValue.font = Font.boldSystemFont(VALUE_FONT_SIZE);
}

async function getBalance() {
    const mapCurrency = {
        usd: "$",
        eur: "€",
        gbp: "£",
        jpy: "¥",
        aud: "A$",
        cad: "C$",
        chf: "CHF",
        cny: "CN¥",
        sek: "kr",
        nzd: "NZ$",
        rub: "₽",
        hkd: "HK$",
        nok: "kr",
        krw: "₩",
        try: "₺",
        inr: "₹",
        brl: "R$",
        mxn: "MX$",
        sgd: "S$",
        idr: "Rp",
        twd: "NT$",
        thb: "฿",
        php: "₱",
    };

    const url = 'https://api.stripe.com/v1/balance';
    const request = new Request(url);
    request.headers = {'Authorization': 'Bearer ' + RESTRICTED_KEY};

    const json = await request.loadJSON();

    if (json.error?.message) {
        throw new Error(json.error.message);
    }

    const amount = (json.pending?.[0]?.amount ?? 0) / 100;
    const currency = json.pending?.[0]?.currency ?? "usd";
    return {
        amount: amount,
        currency: mapCurrency[currency]
    };
}

async function getCustomers() {
    const url = 'https://api.stripe.com/v1/customers';
    const request = new Request(url);
    request.headers = {'Authorization': 'Bearer ' + RESTRICTED_KEY};

    const json = await request.loadJSON();

    if (json.error?.message) {
        throw new Error(json.error.message);
    }

    return json.data?.length ?? 0;
}

async function getRefunds() {
    const url = 'https://api.stripe.com/v1/refunds';
    const request = new Request(url);
    request.headers = {'Authorization': 'Bearer ' + RESTRICTED_KEY};

    const json = await request.loadJSON();

    if (json.error?.message) {
        throw new Error(json.error.message);
    }

    return json.data?.length ?? 0;
}