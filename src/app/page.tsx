"use client";

import CurrenciesConverter from "@/components/currenciesConverter";
import {useRouter} from "next/navigation";
import LayoutApp from "@/components/layoutApp";
import {useState} from "react";
import BottomBarRates from "@/components/bottomBarRates";
import Button from "@/components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from './page.module.css';

export default function Home() {
    const [isMovable, setIsMovable] = useState(false);
  const router = useRouter();

  // Function to handle the button click and redirect
  const handleRedirect = () => {
    router.push('/edit'); // Redirects to the homepage
  };

  return (
    <LayoutApp title={'Converter'} afterWrap={<BottomBarRates />}>
        <CurrenciesConverter isMovable={isMovable}/>

        <div className={styles.lineButtons}>
            <Button onClick={() => setIsMovable(! isMovable)} icon={<FontAwesomeIcon icon={faPenToSquare} />}></Button>
            <Button onClick={handleRedirect} icon={<FontAwesomeIcon icon={faPlus} />}></Button>
        </div>
    </LayoutApp>
  );
}
