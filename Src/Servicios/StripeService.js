import api from "./Conexion";
// Inicia el checkout con Stripe
export const iniciarCheckout = async (cart) => {
  try {
    const res = await api.post("/stripe/checkout", { cart });
    return res.data;  // Aquí recibes { url: "https://checkout.stripe.com/..." }
  } catch (error) {
    console.error("Error en iniciarCheckout:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error en la conexión con Stripe" };
  }
};
