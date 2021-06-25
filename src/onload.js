import { getFingerprint } from './fingerprint';
// import localStorage from './localStorage';

const prices = document.querySelectorAll('.product-price');
const URL = 'https://fast-beyond-21306.herokuapp.com/api/v1/users';

const post = async (url, data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Requested-With',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const { data } = await res.json();
        if (data.showPrice)
            prices.forEach(price => price.classList.toggle('show'));
    } catch (err) {
        console.log(err)
    }
};

const init = async () => {
    const fingerPrint = await getFingerprint();
    const data = { fingerPrint };
    post(URL, data);
    window.location.reload
}

const urlParams = new URLSearchParams(window.location.search);

for (let key of urlParams.keys()) {
    console.log(key, urlParams.get(key))
}

init();