import axios from "axios"

export async function getPlant(idPlant: string): Promise<any> {
    return await axios.get('https://arosaje.nimzero.fr/api/plants/'+idPlant)
}