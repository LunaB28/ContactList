export const initialStore = () => ({
  contacts: []
});

export async function storeAsyncDispatch(dispatch, action) {
  switch (action.type) {
    case 'fetch_contacts': {
      const res = await fetch("https://playground.4geeks.com/contact/agendas/luna/contacts");
      const data = await res.json();
      dispatch({ type: "set_contacts", payload: data.contacts });
      break;
    }
    case 'add_contact': {
      const res = await fetch("https://playground.4geeks.com/contact/agendas/luna/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...action.payload,
          agenda_slug: "luna"
        })
      });
      if (res.ok) {
        await storeAsyncDispatch(dispatch, { type: "fetch_contacts" });
      }
      break;
    }
    case 'update_contact': {
      const { id, ...rest } = action.payload;
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/luna/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest)
      });
      if (res.ok) {
        await storeAsyncDispatch(dispatch, { type: "fetch_contacts" });
      }
      break;
    }
    case 'delete_contact': {
      const id = action.payload.id;
      const res = await fetch(`https://playground.4geeks.com/contact/agendas/luna/contacts/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        await storeAsyncDispatch(dispatch, { type: "fetch_contacts" });
      }
      break;
    }
    default:
      throw Error('Unknown async action.');
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return { ...store, contacts: action.payload };
    default:
      return store;
  }
}
