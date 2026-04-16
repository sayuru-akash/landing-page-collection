"use client";

import type { FormEvent } from "react";

import { ArrowRightIcon } from "@/components/buffer-icons";

const SIGNUP_ACTION =
  "https://login.buffer.com/signup?product=buffer&plan=free&cycle=year&cta=bufferSite-homepage-hero-signup-1";

function submitPrefilledSignup(email: string) {
  const form = document.createElement("form");
  const actionInput = document.createElement("input");
  const emailInput = document.createElement("input");

  form.method = "POST";
  form.action = SIGNUP_ACTION;

  actionInput.type = "hidden";
  actionInput.name = "action";
  actionInput.value = "prefill";

  emailInput.type = "hidden";
  emailInput.name = "email";
  emailInput.value = email;

  form.append(actionInput, emailInput);
  document.body.appendChild(form);
  form.submit();
}

export function BufferHeroForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    submitPrefilledSignup(typeof email === "string" ? email : "");
  };

  return (
    <form className="EmailForm_form__fPZiB HeroSection_form__EtA6S" onSubmit={handleSubmit}>
      <label htmlFor="email" className="visually-hidden">
        Enter your email
      </label>
      <div className="EmailForm_formInputContainer__Kjebf">
        <input
          className="EmailForm_formInput__4tMV2"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email..."
        />
        <button
          className="ButtonBrand_button__yaK_R EmailForm_formButton___Oto3"
          data-size="large"
          data-translate-on-hover="false"
          type="submit"
        >
          <span className="ButtonBrand_buttonContent__5EuHe">
            Get started for free
            <ArrowRightIcon className="ButtonBrand_icon__mayHb" />
          </span>
        </button>
      </div>
      <p className="EmailForm_formSupportingText__uNdSg">
        By entering your email, you agree to receive emails from Buffer.
      </p>
    </form>
  );
}
