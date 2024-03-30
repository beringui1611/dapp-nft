'use client';
import {useState, useEffect } from "react";

import {login} from '@/services/Web3Service';

//home.tsx
export default function Home() {
  const [wallet, setWallet] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const wallet = localStorage.getItem("wallet");
        if (wallet) setWallet(wallet);
    }, [])

    function onQuantityChange(evt: any) {
        const quantity = parseInt(evt.target.value);
        if (quantity > 5)
            setQuantity(5);
        else
            setQuantity(quantity);
    }

    function btnLoginClick() {
        setMessage("Logging In...");
        login()
            .then(wallet => {
                setWallet(wallet);
                localStorage.setItem("wallet", wallet);
                setMessage("");
            })
            .catch(err => setMessage(err.message));
    }

    function btnLogoutClick() {
        setMessage("Logging Out...");
        setWallet("");
        localStorage.removeItem("wallet");
        setMessage("");
    }

    function btnMintClick() {
        setMessage("Minting...");
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div >
        <h1>Mint</h1>
        <p>
          {
           !wallet ?
              (
                <button id="btnLogin" onClick={btnLoginClick}>Login</button>
              )
              :
              (
                <> 
                <a href={`${process.env.OPENSEA_URL}/${wallet}`}>
                   {wallet}
                </a>
                 <button id="btnLogout" onClick={btnLogoutClick}>Logout</button>
                </>
              )
          }
        </p>

        {
          wallet
            ?
            (
              <>
                <p>
                  <label>
                    Quantity:
                  </label>
                </p>
                <p>
                  <button id="btnMint" onClick={btnMintClick}>Mint</button>
                </p>
              </>
            )
            :
            <></>
          }
          </div>
    </main >
  );
}
