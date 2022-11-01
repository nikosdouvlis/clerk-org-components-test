import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ClerkProvider, SignInButton, UnstableOrganizationSwitcher, UserButton, SignedOut } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import Link from "next/link";
import { useState } from "react";

const themes = { default: undefined, dark, neobrutalism, shadesOfPurple };

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>("default");

  const onToggleDark = () => {
    if (window.document.body.classList.contains("dark-mode")) {
      setSelectedTheme("default");
      window.document.body.classList.remove("dark-mode");
    } else {
      setSelectedTheme("dark");
      window.document.body.classList.add("dark-mode");
    }
  };

  return (
    <ClerkProvider
      appearance={{
        baseTheme: themes[selectedTheme],
        variables: { colorPrimary: "#f85656" },
      }}
      // frontendApi={"clerk.touching.camel-78.dev.lclclerk.com"}
      // clerkJSUrl={"https://js.lclclerk.com/npm/clerk.browser.js"}
      {...pageProps}
    >
      <AppBar onChangeTheme={(e) => setSelectedTheme(e.target.value as any)} onToggleDark={onToggleDark} />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

const AppBar = (props: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid black",
        marginBottom: "2rem",
      }}
    >
      <UnstableOrganizationSwitcher />
      <UnstableOrganizationSwitcher showPersonalAccount={false} />
      <Link href={"/"}>
        <h2>Orgs Playground</h2>
      </Link>
      <button onClick={props.onToggleDark}>toggle dark mode</button>
      <UserButton />
      <SignedOut>
        <SignInButton redirectUrl={"/"} mode={"modal"} />
      </SignedOut>
    </div>
  );
};

export default MyApp;
