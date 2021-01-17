import * as SecureStore from 'expo-secure-store';

const serverUrl = SecureStore.getItemAsync("server-url")


export async function checkServerStatus() {
    let health = await fetch(serverUrl + "/livez", {
        method: "GET"
    })
    return (health)
}

