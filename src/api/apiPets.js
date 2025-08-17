//4 API END POINTS - 4 FUNC
//1. FETCH
//2. PLAY
//3. REST
//4. FEED

export async function fetchPetAPI() {
  const getURL = "http://localhost:8080/pets";
  try {
    const response = await fetch(getURL);
    if (!response.ok) throw new Error("http error: " + response.status);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function changeNameAPI(newName) {
  const URL = "http://localhost:8080/pets/changeName";
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });
    if (!response.ok) throw new Error("http error" + response.status);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function dodep(amount) {
  console.log("INSIDE DODEP apiPets, sending amount: " + amount);
  const URL = "http://localhost:8080/pets/dodep";
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    });
    if (!response.ok) throw new Error("http error" + response.status);
    // console.log(await response.json());
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function playAPI() {
  const playURL = "http://localhost:8080/pets/play";
  try {
    const response = await fetch(playURL, {
      method: "POST",
    });
    if (!response.ok) throw new Error("http error: " + response.status);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function feedAPI() {
  const feedURL = "http://localhost:8080/pets/feed";
  try {
    const response = await fetch(feedURL, {
      method: "POST",
    });
    if (!response.ok) throw new Error("http error" + response.status);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function restAPI() {
  const restURL = "http://localhost:8080/pets/rest";
  try {
    const response = await fetch(restURL, {
      method: "POST",
    });
    if (!response.ok) throw new Error("http error" + response.status);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
