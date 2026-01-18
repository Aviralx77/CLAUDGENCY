import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const PROMPT_VIEW_KEY = "prompt_views";
const SUBSCRIBED_KEY = "email_subscribed";
const VIEWS_BEFORE_MODAL = 3;

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

    if (newViews >= VIEWS_BEFORE_MODAL) {
      setShowModal(true);
    }
  };

  const subscribe = async (email: string) => {
    const { error } = await supabase
      .from("email_subscribers")
      .insert({ email: email.toLowerCase().trim() });

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
