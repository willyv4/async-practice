/*
Make a request to the Numbers API (http://numbersapi.com/)
to get a fact about your favorite number.
(Make sure you get back JSON by including the json query key,
specific to this API. Details.
*/

async function getNum(endpoint) {
  try {
    const resp = await axios.get(endpoint);
    console.log(resp);
  } catch (e) {
    console.log(e);
  }
}

getNum("http://numbersapi.com/42?json");

/*
Figure out how to get data on multiple numbers in a single request.
Make that request and when you get the data back,
put all of the number facts on the page.
*/

async function getManyNums() {
  const callArr = [];
  try {
    for (let i = 20; i < 24; i++) {
      callArr.push(await axios.get(`http://numbersapi.com/${i}?json`));
    }
  } catch (e) {
    console.log(e);
  }

  callArr.forEach((call) => {
    const fax = call.data.text;
    $("#num-facts").append(
      `<li class="font-bold text-2xl p-6 w-96">${fax}</li>`
    );
  });
}

getManyNums();

/*
Use the API to get 4 facts on your favorite number.
Once you have them all, put them on the page.
It’s okay if some of the facts are repeats.
*/

async function getFourFacts() {
  const callArr = [];
  try {
    for (let i = 0; i < 4; i++) {
      callArr.push(await axios.get(`http://numbersapi.com/4?json`));
    }
  } catch (e) {
    console.log(e);
  }

  callArr.forEach((call) => {
    const fax = call.data.text;
    $("#fav-num-facts").append(
      `<li class="font-bold text-xl p-6 w-96">${fax}</li>`
    );
  });
}

getFourFacts();
