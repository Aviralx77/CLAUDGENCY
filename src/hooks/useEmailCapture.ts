import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const sendToWebhook = async (email: string) => {
  try {
    const response = await supabase.functions.invoke("send-to-webhook", {
      body: { email },
    });
    if (response.error) {
      console.error("Webhook error:", response.error);
    }
  } catch (error) {
    console.error("Failed to send to webhook:", error);
  }
};

const PROMPT_VIEW_KEY = "prompt_views";
const SUBSCRIBED_KEY = "email_subscribed";
const MODAL_INTERVAL = 5;

export function useEmailCapture() {
  const [showModal, setShowModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem(SUBSCRIBED_KEY) === "true";
    setIsSubscribed(subscribed);
  }, []);

  const trackPromptView = () => {
    if (isSubscribed) return;

    const views = parseInt(localStorage.getItem(PROMPT_VIEW_KEY) || "0", 10);
    const newViews = views + 1;
    localStorage.setItem(PROMPT_VIEW_KEY, newViews.toString());

    // Show modal every 5 prompts (5, 10, 15, 20, etc.)
    if (newViews % MODAL_INTERVAL === 0) {
      setShowModal(true);
    }
  };

  const subscribe = async (email: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    
    const { error } = await supabase
      .from("email_subscribers")
      .insert({ email: normalizedEmail });

    if (error) {
      if (error.code === "23505") {
        // Already subscribed
        localStorage.setItem(SUBSCRIBED_KEY, "true");
        setIsSubscribed(true);
        setShowModal(false);
        return { success: true, message: "You're already subscribed!" };
      }
      throw error;
    }

    // Send to Make.com webhook (fire and forget)
    sendToWebhook(normalizedEmail);

    localStorage.setItem(SUBSCRIBED_KEY, "true");
    setIsSubscribed(true);
    setShowModal(false);
    return { success: true, message: "Successfully subscribed!" };
  };

  const dismissModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    isSubscribed,
    trackPromptView,
    subscribe,
    dismissModal,
  };
}
