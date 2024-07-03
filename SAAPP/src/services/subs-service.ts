import { ISubscriptionRequest } from "../components/models/subscriptions";

const BASE_URL = "https://backend-subs-control.onrender.com/api/suscripcion";



export async function getSubsById(id: string) {
    const response = await fetch(BASE_URL + "?alumno=" + id);
    const data = await response.json();
    return data;
}

export async function saveSubscription(body: ISubscriptionRequest, isNew: boolean) {
    if (isNew) {
      return postSubscription(body);
    } else {
      return putSubscription(body);
    }
  }
  
  export async function postSubscription(body: ISubscriptionRequest) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  }
  
  export async function putSubscription(body: ISubscriptionRequest) {
    const response = await fetch(BASE_URL+"/"+body.id, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  }
